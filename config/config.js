require('dotenv').config()
module.exports=

{
  "development": {
    "username": "postgres",
    "password": process.env.PASSWORD || null,
    "database": "AniAni",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {"ssl": { "require": true, "rejectUnauthorized": false }}

  }
}
