import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCouponsTable1677149813989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE coupons (
        id SERIAL PRIMARY KEY,
        value VARCHAR(255) NOT NULL,
        discount integer NOT NULL
      )
    `);

    await queryRunner.query(
      `INSERT INTO coupons (value, discount) VALUES ('GIFT10', 10), ('7OQC2W3K', 25), ('EFRCRSK9', 50), ('PL5FU4RG', 75), ('XSTWLC4I', 100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE coupons');
  }
}
