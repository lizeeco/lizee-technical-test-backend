import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { seedData } from '../fixtures/seed-data';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'user',
  password: 'password',
  database: 'lizee',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations', '*.*')],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  logging: ['query', 'error', 'warn'],
};

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  static dataSource: DataSource;
  static testDataSource: DataSource;

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    if (process.env.NODE_ENV === 'test') {
      return {
        ...dataSourceOptions,
        port: 5430,
        database: 'lizee_test',
      } as DataSourceOptions;
    }

    return dataSourceOptions;
  }

  static getInstance() {
    if (process.env.NODE_ENV === 'test') {
      if (!this.testDataSource) {
        this.testDataSource = new DataSource({
          ...dataSourceOptions,
          port: 5430,
          database: 'lizee_test',
        } as DataSourceOptions);
      }

      return this.testDataSource;
    }

    if (!this.dataSource) {
      this.dataSource = new DataSource(dataSourceOptions);
    }

    return this.dataSource;
  }

  static async cleanDatabase(): Promise<void> {
    try {
      const entities = dataSource.entityMetadatas;
      const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(', ');

      await dataSource.query(`TRUNCATE TABLE ${tableNames} CASCADE`);
    } catch (e) {
      throw new Error(`Error cleaning database: ${e.message}`);
    }
  }

  static async seedDatabase(): Promise<void> {
    await seedData();
  }
}

export const dataSource = TypeOrmConfigService.getInstance();
