import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694586483787 implements MigrationInterface {
    name = 'Default1694586483787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_employee" DROP CONSTRAINT "FK_a35ffafb8ffc498ffbbc7c55101"`);
        await queryRunner.query(`CREATE TABLE "t_holidayType" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_24dbc3b18b9c3f0e2f340f498bb" UNIQUE ("id"), CONSTRAINT "PK_24dbc3b18b9c3f0e2f340f498bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isActive" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a91f546d9cdd542302607e23ce" UNIQUE ("id"), CONSTRAINT "PK_1a91f546d9cdd542302607e23ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isActive" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ac634d7cdf7c5c9596a0e333182" UNIQUE ("id"), CONSTRAINT "PK_ac634d7cdf7c5c9596a0e333182" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_post_employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "UQ_607aac4bdbd0440de0250eccacf" UNIQUE ("id"), CONSTRAINT "UQ_379f40ed0f17df36dd81bea30b1" UNIQUE ("employeeId"), CONSTRAINT "UQ_ab39297af74744ffe4cc62ff418" UNIQUE ("postId"), CONSTRAINT "PK_ba6caad50d24712d61b207cbce6" PRIMARY KEY ("id", "employeeId", "postId"))`);
        await queryRunner.query(`CREATE TABLE "t_employee_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "UQ_1dc23803018a072d028e43bf2ae" UNIQUE ("id"), CONSTRAINT "UQ_0cfb9482c92b50678002025f139" UNIQUE ("employeeId"), CONSTRAINT "UQ_360c85e600e9f878958878591ed" UNIQUE ("roleId"), CONSTRAINT "PK_87f2cf72f7cb868ad61dbea9bfe" PRIMARY KEY ("id", "employeeId", "roleId"))`);
        await queryRunner.query(`CREATE TABLE "t_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "UQ_4cf61fa02195fb29906867557c8" UNIQUE ("id"), CONSTRAINT "PK_4cf61fa02195fb29906867557c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."t_holidayRequest_type_enum"`);
        await queryRunner.query(`ALTER TABLE "t_employee" DROP CONSTRAINT "REL_a35ffafb8ffc498ffbbc7c5510"`);
        await queryRunner.query(`ALTER TABLE "t_employee" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD CONSTRAINT "UQ_4e633983ee911e57b12532753e6" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP CONSTRAINT "FK_6262e3a694943b743700c66d895"`);
        await queryRunner.query(`ALTER TABLE "t_employee" ADD CONSTRAINT "UQ_7ea82f5a237e8725577504ec503" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "t_role" ADD CONSTRAINT "UQ_d66fb0e16524da1f543ae9ef4c4" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "t_role" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD CONSTRAINT "FK_6262e3a694943b743700c66d895" FOREIGN KEY ("employeeId") REFERENCES "t_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_post_employee" ADD CONSTRAINT "FK_379f40ed0f17df36dd81bea30b1" FOREIGN KEY ("employeeId") REFERENCES "t_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_post_employee" ADD CONSTRAINT "FK_ab39297af74744ffe4cc62ff418" FOREIGN KEY ("postId") REFERENCES "t_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_employee_role" ADD CONSTRAINT "FK_0cfb9482c92b50678002025f139" FOREIGN KEY ("employeeId") REFERENCES "t_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_employee_role" ADD CONSTRAINT "FK_360c85e600e9f878958878591ed" FOREIGN KEY ("roleId") REFERENCES "t_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_employee_role" DROP CONSTRAINT "FK_360c85e600e9f878958878591ed"`);
        await queryRunner.query(`ALTER TABLE "t_employee_role" DROP CONSTRAINT "FK_0cfb9482c92b50678002025f139"`);
        await queryRunner.query(`ALTER TABLE "t_post_employee" DROP CONSTRAINT "FK_ab39297af74744ffe4cc62ff418"`);
        await queryRunner.query(`ALTER TABLE "t_post_employee" DROP CONSTRAINT "FK_379f40ed0f17df36dd81bea30b1"`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP CONSTRAINT "FK_6262e3a694943b743700c66d895"`);
        await queryRunner.query(`ALTER TABLE "t_role" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "t_role" DROP CONSTRAINT "UQ_d66fb0e16524da1f543ae9ef4c4"`);
        await queryRunner.query(`ALTER TABLE "t_employee" DROP CONSTRAINT "UQ_7ea82f5a237e8725577504ec503"`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD CONSTRAINT "FK_6262e3a694943b743700c66d895" FOREIGN KEY ("employeeId") REFERENCES "t_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" DROP CONSTRAINT "UQ_4e633983ee911e57b12532753e6"`);
        await queryRunner.query(`ALTER TABLE "t_employee" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "t_employee" ADD CONSTRAINT "REL_a35ffafb8ffc498ffbbc7c5510" UNIQUE ("roleId")`);
        await queryRunner.query(`CREATE TYPE "public"."t_holidayRequest_type_enum" AS ENUM('ANNUAL', 'MATERNITY', 'ADVENTURE', 'CYCLING', 'FAMILY', 'CITY_BREAKS')`);
        await queryRunner.query(`ALTER TABLE "t_holidayRequest" ADD "type" "public"."t_holidayRequest_type_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "t_settings"`);
        await queryRunner.query(`DROP TABLE "t_employee_role"`);
        await queryRunner.query(`DROP TABLE "t_post_employee"`);
        await queryRunner.query(`DROP TABLE "t_post"`);
        await queryRunner.query(`DROP TABLE "t_service"`);
        await queryRunner.query(`DROP TABLE "t_holidayType"`);
        await queryRunner.query(`ALTER TABLE "t_employee" ADD CONSTRAINT "FK_a35ffafb8ffc498ffbbc7c55101" FOREIGN KEY ("roleId") REFERENCES "t_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
