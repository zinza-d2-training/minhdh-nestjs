import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class VaccineRegistration1673340712198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaccine_registrations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'numbBHYT',
            type: 'int'
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'job',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'work_unit',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'date_injection',
            type: 'date'
          },
          {
            name: 'sessions_injection',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'user_id',
            type: 'int'
          },
          {
            name: 'vaccine_id',
            type: 'int'
          },
          {
            name: 'group_id',
            type: 'int'
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
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['vaccine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaccines',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vaccine_registrations');
  }
}
