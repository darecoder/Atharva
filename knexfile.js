// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'pg',
  //   connection: {
  //     host : '127.0.0.1',
  //     user : 'urvashi',
  //     password : 'urvashi07',
  //     database : 'testdb',
  //     charset: 'utf8'
  //   },
  //   migrations: {
  //     directory: __dirname + '/knex/migrations',
  //   },
  //   seeds: {
  //     directory: __dirname + '/knex/seeds'
  //   }
  // },

  development: {
    client: 'pg',
    connection:{
      host : 'ec2-54-236-146-234.compute-1.amazonaws.com',
      user : 'yubxdgkznnrwzn',
      password : '98951f49d3b33ac060e68d07250a2912bdab324b3433334d84611d4f4a75dc99',
      database : 'dek2s90r05g2m7',
      charset: 'utf8',
      ssl:{
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    },

  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:__dirname+'/knex/migrations'
    },
    seeds:{
      directory:__dirname+'/knex/seeds'
    }
  }

};
