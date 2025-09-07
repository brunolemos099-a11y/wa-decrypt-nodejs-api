
module.exports = {
  apps: [
    {
      name: "wa-decrypt-api",
      script: "index.js",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}
