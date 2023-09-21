import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1695215739237 implements MigrationInterface {
    name = 'sync1695215739237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
              "genre_id" SERIAL NOT NULL,
              "genre" text NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "UQ_a5ec972b174b9994abb0600de71" UNIQUE ("genre"),
              CONSTRAINT "PK_af0c9d11cb69b909fd91dd33009" PRIMARY KEY ("genre_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
              "book_id" SERIAL NOT NULL,
              "year_of_publication" TIMESTAMP NOT NULL,
              "title" text NOT NULL,
              "file_name" text,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "PK_b66091a3d2edddc14f6b91fc606" PRIMARY KEY ("book_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "author" (
              "author_id" SERIAL NOT NULL,
              "date_of_birthday" TIMESTAMP,
              "first_name" text,
              "last_name" text,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "PK_c36fb987d8132c9bdb15916e619" PRIMARY KEY ("author_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_role" (
              "user_role_id" SERIAL NOT NULL,
              "role" text NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "UQ_30ddd91a212a9d03669bc1dee74" UNIQUE ("role"),
              CONSTRAINT "PK_77580f3bab637e39a7fdd01a94c" PRIMARY KEY ("user_role_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
              "user_id" SERIAL NOT NULL,
              "last_activity" TIMESTAMP NOT NULL DEFAULT now(),
              "email" text NOT NULL,
              "first_name" text,
              "last_name" text,
              "password" text NOT NULL,
              "user_role_id" integer,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
              CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book__genre" (
                "book_id" integer NOT NULL,
                "genre_id" integer NOT NULL,
                CONSTRAINT "PK_f0f317688fcfb9895369096ce85" PRIMARY KEY ("book_id", "genre_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ad0b2ac2314144c00c6fa12562" ON "book__genre" ("book_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7780167f178de7a370f0a92fe6" ON "book__genre" ("genre_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "book__author" (
                "book_id" integer NOT NULL,
                "author_id" integer NOT NULL,
                CONSTRAINT "PK_ad754023b123c32bfd141ceae34" PRIMARY KEY ("book_id", "author_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_241f5950685600e361c93f2948" ON "book__author" ("book_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_82804fdbd2e12a2543b9912a11" ON "book__author" ("author_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_078f27c5e6a46cb1ab1b9fd463b" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("user_role_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book__genre"
            ADD CONSTRAINT "FK_ad0b2ac2314144c00c6fa12562c" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book__genre"
            ADD CONSTRAINT "FK_7780167f178de7a370f0a92fe63" FOREIGN KEY ("genre_id") REFERENCES "genre"("genre_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book__author"
            ADD CONSTRAINT "FK_241f5950685600e361c93f2948d" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book__author"
            ADD CONSTRAINT "FK_82804fdbd2e12a2543b9912a113" FOREIGN KEY ("author_id") REFERENCES "author"("author_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book__author" DROP CONSTRAINT "FK_82804fdbd2e12a2543b9912a113"
        `);
        await queryRunner.query(`
            ALTER TABLE "book__author" DROP CONSTRAINT "FK_241f5950685600e361c93f2948d"
        `);
        await queryRunner.query(`
            ALTER TABLE "book__genre" DROP CONSTRAINT "FK_7780167f178de7a370f0a92fe63"
        `);
        await queryRunner.query(`
            ALTER TABLE "book__genre" DROP CONSTRAINT "FK_ad0b2ac2314144c00c6fa12562c"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_078f27c5e6a46cb1ab1b9fd463b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_82804fdbd2e12a2543b9912a11"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_241f5950685600e361c93f2948"
        `);
        await queryRunner.query(`
            DROP TABLE "book__author"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7780167f178de7a370f0a92fe6"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ad0b2ac2314144c00c6fa12562"
        `);
        await queryRunner.query(`
            DROP TABLE "book__genre"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user_role"
        `);
        await queryRunner.query(`
            DROP TABLE "author"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
