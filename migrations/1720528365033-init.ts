import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1720528365033 implements MigrationInterface {
  name = 'Init1720528365033';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" UNIQUE ("code"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT '"2024-07-09T12:32:46.572Z"', "userId" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_to_orders" ("order_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_b6749f656166d106103a4f35cbf" PRIMARY KEY ("order_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ebeeff70b5670a0ab112a06d4d" ON "products_to_orders" ("order_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_028c66806ea56aaffe0356f8f1" ON "products_to_orders" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "date" SET DEFAULT '"2024-07-09T12:32:46.573Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_to_orders" ADD CONSTRAINT "FK_ebeeff70b5670a0ab112a06d4dc" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_to_orders" ADD CONSTRAINT "FK_028c66806ea56aaffe0356f8f1c" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_to_orders" DROP CONSTRAINT "FK_028c66806ea56aaffe0356f8f1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_to_orders" DROP CONSTRAINT "FK_ebeeff70b5670a0ab112a06d4dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "date" SET DEFAULT '"2024-07-09T12:32:46.572Z"'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_028c66806ea56aaffe0356f8f1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ebeeff70b5670a0ab112a06d4d"`,
    );
    await queryRunner.query(`DROP TABLE "products_to_orders"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
