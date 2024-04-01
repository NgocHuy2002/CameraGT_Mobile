const ip = require('ip');

module.exports = ({ config }) => {
  const existingExtra = config.extra ?? {};

  const extraConfig = {
    LOCAL_IP: ip.address('public'),
  };

  return {
    ...config,
    extra: { ...existingExtra, ...extraConfig },
  };
};
