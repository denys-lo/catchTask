const axios = require('axios');
const fs = require("fs");

getJiraToken = () => {
  const data = {
    grant_type: 'authorization_code',
    client_id: '',
    client_secret: '',
    code: '',
    redirect_uri: ''
  };

  axios.post('https://auth.atlassian.com/oauth/token', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
    fs.writeFile("token.json", JSON.stringify(response.data), function (error) {
      if (error) throw error;
    });
  })
  .catch(error => {
    console.error(error);
  });
}

getJiraToken();