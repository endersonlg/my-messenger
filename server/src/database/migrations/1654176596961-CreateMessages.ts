import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMessages1654176596961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'user_sender',
            type: 'uuid',
          },
          {
            name: 'user_receiver',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        // foreignKeys: [
        //   {
        //     name: 'FKuserSenderMessages',
        //     referencedTableName: 'users',
        //     referencedColumnNames: ['id'],
        //     columnNames: ['user_sender'],
        //     onDelete: 'SET NULL',
        //     onUpdate: 'SET NULL',
        //   },
        //   {
        //     name: 'FKuserReceiverMessages',
        //     referencedTableName: 'users',
        //     referencedColumnNames: ['id'],
        //     columnNames: ['user_receiver'],
        //     onDelete: 'SET NULL',
        //     onUpdate: 'SET NULL',
        //   },
        // ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('messages');
  }
}
