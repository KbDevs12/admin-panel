module.exports = {
  apps: [
    {
      name: "admin-panel",
      cwd: "/var/www/admin-panel",
      script: "npm",
      args: "run start -- -p 3000",
      env: {
        NODE_ENV: "production",
        port: 3000,
      },
    },
  ],
};
