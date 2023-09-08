import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694192967139 implements MigrationInterface {
    name = 'Default1694192967139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."t_role_type_enum" AS ENUM('ADMIN', 'EMPLOYEE', 'HUMAN_RESOURCE')`);
        await queryRunner.query(`CREATE TABLE "t_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."t_role_type_enum" NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_d66fb0e16524da1f543ae9ef4c4" UNIQUE ("id"), CONSTRAINT "PK_d66fb0e16524da1f543ae9ef4c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."t_holidayRequest_type_enum" AS ENUM('ANNUAL', 'MATERNITY', 'ADVENTURE', 'CYCLING', 'FAMILY', 'CITY_BREAKS')`);
        await queryRunner.query(`CREATE TABLE "t_holidayRequest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startingDate" date NOT NULL, "endingDate" date NOT NULL, "returningDate" date NOT NULL, "description" character varying NOT NULL, "type" "public"."t_holidayRequest_type_enum" NOT NULL, "employeeId" uuid, CONSTRAINT "UQ_4e633983ee911e57b12532753e6" UNIQUE ("id"), CONSTRAINT "PK_4e633983ee911e57b12532753e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastName" character varying NOT NULL, "password" text NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "roleId" uuid, CONSTRAINT "UQ_7ea82f5a237e8725577504ec503" UNIQUE ("id"), CONSTRAINT "UQ_e3fc2513419bf00e9a1c8144c24" UNIQUE ("lastName"), CONSTRAINT "UQ_5e89722f25c148e932e6fe16921" UNIQUE ("password"), CONSTRAINT "UQ_241f8a1aedd5a34f49133dbf840" UNIQUE ("email"), CONSTRAINT "REL_a35ffafb8ffc498ffbbc7c5510" UNIQUE ("roleId"), CONSTRAINT "PK_7ea82f5a237e8725577504ec503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD CONSTRAINT "FK_6262e3a694943b743700c66d895" FOREIGN KEY ("employeeId") REFERENCES "t_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_employee" ADD CONSTRAINT "FK_a35ffafb8ffc498ffbbc7c55101" FOREIGN KEY ("roleId") REFERENCES "t_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_employee" DROP CONSTRAINT "FK_a35ffafb8ffc498ffbbc7c55101"`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP CONSTRAINT "FK_6262e3a694943b743700c66d895"`);
        await queryRunner.query(`DROP TABLE "t_employee"`);
        await queryRunner.query(`DROP TABLE "t_holidayRequest"`);
        await queryRunner.query(`DROP TYPE "public"."t_holidayRequest_type_enum"`);
        await queryRunner.query(`DROP TABLE "t_role"`);
        await queryRunner.query(`DROP TYPE "public"."t_role_type_enum"`);
    }

}
