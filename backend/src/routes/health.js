async function healthRoutes(app) {
  app.get('/health', async () => ({
    status: 'ok',
  }));
}

module.exports = {
  healthRoutes,
};
