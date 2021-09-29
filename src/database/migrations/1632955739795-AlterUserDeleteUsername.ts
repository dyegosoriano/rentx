import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserDeleteUsername1632955739795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'user_name')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'user_name',
        type: 'varchar'
      })
    )
  }
}
