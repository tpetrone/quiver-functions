const EnvironmentService = require('../services/environment.service');

module.exports = class Environment {
  constructor(settings = {}) {
    this.public = settings.public || 'public';
    this.shared = settings.shared || 'shared';
    this.config = settings.config;
    this.headers = settings.headers || {};
  }

  getFunction() {
    return (req, res) => {
      const config = this.config;
      const environmentService = new EnvironmentService({ config, public: this.public, shared: this.shared });
      const publicEnvironment = environmentService.getPublicEnvironment(req.host);

      for (let header in this.headers) {
        res.set(header, this.headers[header]);
      }
      res.status(200).send(`window.firebaseEnv = ${JSON.stringify(publicEnvironment)}`);
    };
  }
};
