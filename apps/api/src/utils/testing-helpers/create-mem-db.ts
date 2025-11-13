import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  db.addModels(models);

  await db.sync();

  return db;
}
