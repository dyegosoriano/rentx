import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameUserColumn1634063808577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'driver_licence', 'driver_license')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'driver_license', 'driver_licence')
  }
}
