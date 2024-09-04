export const env = {
  appBaseUrl: process.env.BASE_URL,
  appPort: +process.env.PORT || 3000,
  dbHost: process.env.DATABASE_HOST,
  dbName: process.env.DATABASE_NAME,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbPort: +process.env.DATABASE_PORT || 3306,
  dbUser: process.env.DATABASE_USER
}
