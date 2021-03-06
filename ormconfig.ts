export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/**/*.migration.ts'],
  subscribers: ['src/**/*.subscriber.ts'],
  seeds: ['src/**/*.seed.ts'],
  factories: ['src/**/*.factory.ts'],
  cli: {
    entitiesDir: 'src/**',
    migrationsDir: 'src/**',
    subscribersDir: 'src/**',
  },
};
