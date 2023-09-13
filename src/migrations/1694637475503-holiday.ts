import { MigrationInterface, QueryRunner } from "typeorm";

export class Holiday1694637475503 implements MigrationInterface {
  name = "Holiday1694637475503";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TABLE \"t_holidayType\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"type\" character varying NOT NULL, \"description\" character varying, CONSTRAINT \"UQ_24dbc3b18b9c3f0e2f340f498bb\" UNIQUE (\"id\"), CONSTRAINT \"PK_24dbc3b18b9c3f0e2f340f498bb\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"t_holidayRequest\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"startingDate\" date NOT NULL, \"endingDate\" date NOT NULL, \"returningDate\" date NOT NULL, \"description\" character varying NOT NULL, \"employeeId\" uuid, \"holidayTypeId\" uuid, CONSTRAINT \"UQ_4e633983ee911e57b12532753e6\" UNIQUE (\"id\"), CONSTRAINT \"REL_2f8ced6a0ebfde3f5ea1927a32\" UNIQUE (\"holidayTypeId\"), CONSTRAINT \"PK_4e633983ee911e57b12532753e6\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"t_service\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"description\" character varying, \"isActive\" boolean NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_1a91f546d9cdd542302607e23ce\" UNIQUE (\"id\"), CONSTRAINT \"PK_1a91f546d9cdd542302607e23ce\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"t_post\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"description\" character varying, \"isActive\" boolean NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"serviceId\" uuid, CONSTRAINT \"UQ_ac634d7cdf7c5c9596a0e333182\" UNIQUE (\"id\"), CONSTRAINT \"REL_c0c611ba4a807491f7b15cdbd2\" UNIQUE (\"serviceId\"), CONSTRAINT \"PK_ac634d7cdf7c5c9596a0e333182\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"t_post_employee\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"employeeId\" uuid NOT NULL, \"postId\" uuid NOT NULL, CONSTRAINT \"UQ_607aac4bdbd0440de0250eccacf\" UNIQUE (\"id\"), CONSTRAINT \"UQ_379f40ed0f17df36dd81bea30b1\" UNIQUE (\"employeeId\"), CONSTRAINT \"UQ_ab39297af74744ffe4cc62ff418\" UNIQUE (\"postId\"), CONSTRAINT \"PK_ba6caad50d24712d61b207cbce6\" PRIMARY KEY (\"id\", \"employeeId\", \"postId\"))");
    await queryRunner.query("CREATE TABLE \"t_setting\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"defaultEmailNotification\" character NOT NULL, \"customEmailNotification\" character, CONSTRAINT \"UQ_4abb3689176c9217f0e8245ef38\" UNIQUE (\"id\"), CONSTRAINT \"UQ_92ab2969b243799e0db9e38d753\" UNIQUE (\"defaultEmailNotification\"), CONSTRAINT \"UQ_7e0331eb4a1ad4e6ff129258126\" UNIQUE (\"customEmailNotification\"), CONSTRAINT \"PK_4abb3689176c9217f0e8245ef38\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"t_employee\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"firstname\" character varying NOT NULL, \"lastName\" character varying NOT NULL, \"password\" text NOT NULL, \"email\" character varying NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"settingId\" uuid, CONSTRAINT \"UQ_7ea82f5a237e8725577504ec503\" UNIQUE (\"id\"), CONSTRAINT \"UQ_e3fc2513419bf00e9a1c8144c24\" UNIQUE (\"lastName\"), CONSTRAINT \"UQ_5e89722f25c148e932e6fe16921\" UNIQUE (\"password\"), CONSTRAINT \"UQ_241f8a1aedd5a34f49133dbf840\" UNIQUE (\"email\"), CONSTRAINT \"REL_b8adb66895986cb113c4b4d48e\" UNIQUE (\"settingId\"), CONSTRAINT \"PK_7ea82f5a237e8725577504ec503\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TYPE \"public\".\"t_role_type_enum\" AS ENUM('ADMIN', 'EMPLOYEE', 'HUMAN_RESOURCE')");
    await queryRunner.query("CREATE TABLE \"t_role\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"type\" \"public\".\"t_role_type_enum\" NOT NULL, \"description\" character varying, CONSTRAINT \"UQ_d66fb0e16524da1f543ae9ef4c4\" UNIQUE (\"id\"), CONSTRAINT \"PK_d66fb0e16524da1f543ae9ef4c4\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"t_employee_role\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"employeeId\" uuid NOT NULL, \"roleId\" uuid NOT NULL, CONSTRAINT \"UQ_1dc23803018a072d028e43bf2ae\" UNIQUE (\"id\"), CONSTRAINT \"UQ_0cfb9482c92b50678002025f139\" UNIQUE (\"employeeId\"), CONSTRAINT \"UQ_360c85e600e9f878958878591ed\" UNIQUE (\"roleId\"), CONSTRAINT \"PK_87f2cf72f7cb868ad61dbea9bfe\" PRIMARY KEY (\"id\", \"employeeId\", \"roleId\"))");
    await queryRunner.query("ALTER TABLE \"t_holidayRequest\" ADD CONSTRAINT \"FK_6262e3a694943b743700c66d895\" FOREIGN KEY (\"employeeId\") REFERENCES \"t_employee\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_holidayRequest\" ADD CONSTRAINT \"FK_2f8ced6a0ebfde3f5ea1927a325\" FOREIGN KEY (\"holidayTypeId\") REFERENCES \"t_holidayType\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_post\" ADD CONSTRAINT \"FK_c0c611ba4a807491f7b15cdbd27\" FOREIGN KEY (\"serviceId\") REFERENCES \"t_service\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_post_employee\" ADD CONSTRAINT \"FK_379f40ed0f17df36dd81bea30b1\" FOREIGN KEY (\"employeeId\") REFERENCES \"t_employee\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_post_employee\" ADD CONSTRAINT \"FK_ab39297af74744ffe4cc62ff418\" FOREIGN KEY (\"postId\") REFERENCES \"t_post\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_employee\" ADD CONSTRAINT \"FK_b8adb66895986cb113c4b4d48e4\" FOREIGN KEY (\"settingId\") REFERENCES \"t_setting\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_employee_role\" ADD CONSTRAINT \"FK_0cfb9482c92b50678002025f139\" FOREIGN KEY (\"employeeId\") REFERENCES \"t_employee\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"t_employee_role\" ADD CONSTRAINT \"FK_360c85e600e9f878958878591ed\" FOREIGN KEY (\"roleId\") REFERENCES \"t_role\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"t_employee_role\" DROP CONSTRAINT \"FK_360c85e600e9f878958878591ed\"");
    await queryRunner.query("ALTER TABLE \"t_employee_role\" DROP CONSTRAINT \"FK_0cfb9482c92b50678002025f139\"");
    await queryRunner.query("ALTER TABLE \"t_employee\" DROP CONSTRAINT \"FK_b8adb66895986cb113c4b4d48e4\"");
    await queryRunner.query("ALTER TABLE \"t_post_employee\" DROP CONSTRAINT \"FK_ab39297af74744ffe4cc62ff418\"");
    await queryRunner.query("ALTER TABLE \"t_post_employee\" DROP CONSTRAINT \"FK_379f40ed0f17df36dd81bea30b1\"");
    await queryRunner.query("ALTER TABLE \"t_post\" DROP CONSTRAINT \"FK_c0c611ba4a807491f7b15cdbd27\"");
    await queryRunner.query("ALTER TABLE \"t_holidayRequest\" DROP CONSTRAINT \"FK_2f8ced6a0ebfde3f5ea1927a325\"");
    await queryRunner.query("ALTER TABLE \"t_holidayRequest\" DROP CONSTRAINT \"FK_6262e3a694943b743700c66d895\"");
    await queryRunner.query("DROP TABLE \"t_employee_role\"");
    await queryRunner.query("DROP TABLE \"t_role\"");
    await queryRunner.query("DROP TYPE \"public\".\"t_role_type_enum\"");
    await queryRunner.query("DROP TABLE \"t_employee\"");
    await queryRunner.query("DROP TABLE \"t_setting\"");
    await queryRunner.query("DROP TABLE \"t_post_employee\"");
    await queryRunner.query("DROP TABLE \"t_post\"");
    await queryRunner.query("DROP TABLE \"t_service\"");
    await queryRunner.query("DROP TABLE \"t_holidayRequest\"");
    await queryRunner.query("DROP TABLE \"t_holidayType\"");
  }

}
