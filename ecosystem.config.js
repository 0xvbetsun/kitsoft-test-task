module.exports = {
  apps: [
    {
      name: 'API',
      script: './bin/www',

      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      output: '/dev/null',
      error: '/dev/null',
      env: {
        NODE_ENV: 'development',
        NODE_PATH: 'src/modules/'
      },
      env_test: {
        NODE_ENV: 'test',
        NODE_PATH: 'src/modules/'
      },
      env_staging: {
        NODE_ENV: 'staging',
        NODE_PATH: 'src/modules/'
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_PATH: 'src/modules/'
      }
    }
  ]
};
