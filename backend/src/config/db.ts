export const dbConfig = {
  host: process.env.PG_DATABASE_URL,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // Porta padrão do PostgreSQL
};
