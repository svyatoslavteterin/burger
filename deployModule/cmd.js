const cmd = require('node-cmd');

class CMD {
  async run(commands) {
    const data = await new Promise((resolve, reject) => {
      cmd.get(commands, (err, data, stderr) => {
        console.log('stderr', stderr);
        console.log('data', data);
        console.log('err', err);
        if (err) reject(err);
        resolve(data);
      });
    });
    return data;
  }
}

module.exports = new CMD();
