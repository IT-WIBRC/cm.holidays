import { MigrationInterface, QueryRunner } from "typeorm";

export class Holiday1694849516843 implements MigrationInterface {
    name = 'Holiday1694849516843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "t_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isActive" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a91f546d9cdd542302607e23ce" UNIQUE ("id"), CONSTRAINT "UQ_9d1856af1f87dd677fb98ebd4c9" UNIQUE ("name"), CONSTRAINT "PK_1a91f546d9cdd542302607e23ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_holidayType" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_24dbc3b18b9c3f0e2f340f498bb" UNIQUE ("id"), CONSTRAINT "PK_24dbc3b18b9c3f0e2f340f498bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_holidayRequest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startingDate" date NOT NULL, "endingDate" date NOT NULL, "returningDate" date NOT NULL, "description" character varying NOT NULL, "employeeId" uuid, "holidayTypeId" uuid, CONSTRAINT "UQ_4e633983ee911e57b12532753e6" UNIQUE ("id"), CONSTRAINT "REL_2f8ced6a0ebfde3f5ea1927a32" UNIQUE ("holidayTypeId"), CONSTRAINT "PK_4e633983ee911e57b12532753e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_setting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "defaultEmailNotification" character varying NOT NULL, "customEmailNotification" character varying, CONSTRAINT "UQ_4abb3689176c9217f0e8245ef38" UNIQUE ("id"), CONSTRAINT "UQ_92ab2969b243799e0db9e38d753" UNIQUE ("defaultEmailNotification"), CONSTRAINT "UQ_7e0331eb4a1ad4e6ff129258126" UNIQUE ("customEmailNotification"), CONSTRAINT "PK_4abb3689176c9217f0e8245ef38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."t_role_type_enum" AS ENUM('ADMIN', 'EMPLOYEE', 'HUMAN_RESOURCE')`);
        await queryRunner.query(`CREATE TABLE "t_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."t_role_type_enum" NOT NULL, "description" character varying, CONSTRAINT "UQ_d66fb0e16524da1f543ae9ef4c4" UNIQUE ("id"), CONSTRAINT "UQ_5c1d5d342066957c2ce6f90e0ed" UNIQUE ("type"), CONSTRAINT "PK_d66fb0e16524da1f543ae9ef4c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastName" character varying NOT NULL, "password" text NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "settingId" uuid, CONSTRAINT "UQ_7ea82f5a237e8725577504ec503" UNIQUE ("id"), CONSTRAINT "UQ_e3fc2513419bf00e9a1c8144c24" UNIQUE ("lastName"), CONSTRAINT "UQ_5e89722f25c148e932e6fe16921" UNIQUE ("password"), CONSTRAINT "UQ_241f8a1aedd5a34f49133dbf840" UNIQUE ("email"), CONSTRAINT "REL_b8adb66895986cb113c4b4d48e" UNIQUE ("settingId"), CONSTRAINT "PK_7ea82f5a237e8725577504ec503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isActive" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "serviceId" uuid, CONSTRAINT "UQ_ac634d7cdf7c5c9596a0e333182" UNIQUE ("id"), CONSTRAINT "REL_c0c611ba4a807491f7b15cdbd2" UNIQUE ("serviceId"), CONSTRAINT "PK_ac634d7cdf7c5c9596a0e333182" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_role_employees_t_employee" ("tRoleId" uuid NOT NULL, "tEmployeeId" uuid NOT NULL, CONSTRAINT "PK_b225bbba4472acdef163ea9b677" PRIMARY KEY ("tRoleId", "tEmployeeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_561ea96d3632e98a082cf56100" ON "t_role_employees_t_employee" ("tRoleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e7c4eb40f6369249095fd0aa4" ON "t_role_employees_t_employee" ("tEmployeeId") `);
        await queryRunner.query(`CREATE TABLE "t_post_employee_t_employee" ("tPostId" uuid NOT NULL, "tEmployeeId" uuid NOT NULL, CONSTRAINT "PK_a635e59e21eaa90516decda81a5" PRIMARY KEY ("tPostId", "tEmployeeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3029e2480447e0e8c1443fe71b" ON "t_post_employee_t_employee" ("tPostId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcbb9b6ad53c729f42bec9866c" ON "t_post_employee_t_employee" ("tEmployeeId") `);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD CONSTRAINT "FK_6262e3a694943b743700c66d895" FOREIGN KEY ("employeeId") REFERENCES "t_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD CONSTRAINT "FK_2f8ced6a0ebfde3f5ea1927a325" FOREIGN KEY ("holidayTypeId") REFERENCES "t_holidayType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_employee" ADD CONSTRAINT "FK_b8adb66895986cb113c4b4d48e4" FOREIGN KEY ("settingId") REFERENCES "t_setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_post" ADD CONSTRAINT "FK_c0c611ba4a807491f7b15cdbd27" FOREIGN KEY ("serviceId") REFERENCES "t_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_role_employees_t_employee" ADD CONSTRAINT "FK_561ea96d3632e98a082cf561009" FOREIGN KEY ("tRoleId") REFERENCES "t_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "t_role_employees_t_employee" ADD CONSTRAINT "FK_5e7c4eb40f6369249095fd0aa43" FOREIGN KEY ("tEmployeeId") REFERENCES "t_employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "t_post_employee_t_employee" ADD CONSTRAINT "FK_3029e2480447e0e8c1443fe71be" FOREIGN KEY ("tPostId") REFERENCES "t_post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "t_post_employee_t_employee" ADD CONSTRAINT "FK_dcbb9b6ad53c729f42bec9866cc" FOREIGN KEY ("tEmployeeId") REFERENCES "t_employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_post_employee_t_employee" DROP CONSTRAINT "FK_dcbb9b6ad53c729f42bec9866cc"`);
        await queryRunner.query(`ALTER TABLE "t_post_employee_t_employee" DROP CONSTRAINT "FK_3029e2480447e0e8c1443fe71be"`);
        await queryRunner.query(`ALTER TABLE "t_role_employees_t_employee" DROP CONSTRAINT "FK_5e7c4eb40f6369249095fd0aa43"`);
        await queryRunner.query(`ALTER TABLE "t_role_employees_t_employee" DROP CONSTRAINT "FK_561ea96d3632e98a082cf561009"`);
        await queryRunner.query(`ALTER TABLE "t_post" DROP CONSTRAINT "FK_c0c611ba4a807491f7b15cdbd27"`);
        await queryRunner.query(`ALTER TABLE "t_employee" DROP CONSTRAINT "FK_b8adb66895986cb113c4b4d48e4"`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP CONSTRAINT "FK_2f8ced6a0ebfde3f5ea1927a325"`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP CONSTRAINT "FK_6262e3a694943b743700c66d895"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcbb9b6ad53c729f42bec9866c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3029e2480447e0e8c1443fe71b"`);
        await queryRunner.query(`DROP TABLE "t_post_employee_t_employee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e7c4eb40f6369249095fd0aa4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_561ea96d3632e98a082cf56100"`);
        await queryRunner.query(`DROP TABLE "t_role_employees_t_employee"`);
        await queryRunner.query(`DROP TABLE "t_post"`);
        await queryRunner.query(`DROP TABLE "t_employee"`);
        await queryRunner.query(`DROP TABLE "t_role"`);
        await queryRunner.query(`DROP TYPE "public"."t_role_type_enum"`);
        await queryRunner.query(`DROP TABLE "t_setting"`);
        await queryRunner.query(`DROP TABLE "t_holidayRequest"`);
        await queryRunner.query(`DROP TABLE "t_holidayType"`);
        await queryRunner.query(`DROP TABLE "t_service"`);
    }

}
