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
            name: 'cmnd',
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
            name: 'wardId',
            type: 'int'
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
      'user',
      new TableForeignKey({
        columnNames: ['wardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ward',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
