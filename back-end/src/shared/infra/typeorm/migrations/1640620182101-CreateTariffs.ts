import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1640620182101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tariffs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'origin',
            type: 'numeric',
          },
          {
            name: 'destiny',
            type: 'numeric',
          },
          {
            name: 'coast_per_minute',
            type: 'numeric',
          },
          {
            name: 'activated',
            type: 'boolean',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tariffs');
  }
}
