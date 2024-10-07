const axios = require('axios');
const fs = require("fs");
const path = require('path');

exports.getJiraRefreshToken = () => {
  const tokenPath = path.join(__dirname, '../scripts/token.json');
  const refreshToken = JSON.parse(fs.readFileSync(tokenPath, "utf8")).refresh_token;

  const bodyRequest = {
    grant_type: 'refresh_token',
    client_id: '',
    client_secret: '',
    refresh_token: refreshToken
  };

  const config = {
    method: 'POST',
    maxBodyLenght: Infinity,
    url: 'https://auth.atlassian.com/oauth/token',
    headers: {
      'Content-Type': 'application/json'
    },
    data: bodyRequest
  };

  return new Promise ((resolve, reject) => {
    axios(config)
      .then(response => {
        let isThereError = false;
        fs.writeFileSync(tokenPath, JSON.stringify(response.data), error => {
          if (error) {
            isThereError = true;
            console.log(error)
          }
        });

        if (isThereError) {
          reject({
            message: 'Token failed.',
            result: false
          });
        } else {
          resolve({
            message: 'Token updated.',
            result: true
          });
        }
      })
      .catch(error => {
        console.log(error.response.data);
        reject({
            message: 'Token failed.',
            result: false
          });
      });
  });
}