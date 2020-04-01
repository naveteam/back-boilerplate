module.exports = {
  apps: [
    {
      name: 'API',
      script: 'build/index.js',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      }
    }
  ],

  deploy: {
    development: {
      key: process.env.PM2_EC2_PEM,
      user: process.env.PM2_EC2_USER,
      host: process.env.PM2_EC2_HOST,
      ref: 'origin/develop',
      repo: '',
      path: '',
      'post-deploy':
        'npx yarn && npx yarn build && npx yarn db:migrate-build && npx pm2 reload ecosystem.config.js --env development'
    }
  }
}
