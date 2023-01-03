import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class User1671691725186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'email',
            isUnique: true,
            type: 'varchar',
            length: '255'
          },
          {
            name: 'identity_card_number',
            isUnique: true,
            type: 'varchar',
            length: '12'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'birthday',
            type: 'date'
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'ward_id',
            type: 'int'
          },
          {
            name: 'reset_token',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'isAdmin',
            type: 'tinyint',
            default: 0
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP'
          }
        ]
      }),
      true
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['ward_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wards',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
