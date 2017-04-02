const profile = require('./profile.js');

const users = process.argv.slice(2);
  users.forEach(username => {
    profile.get(username);
  });
//could also just be users.forEach(getProfile);
