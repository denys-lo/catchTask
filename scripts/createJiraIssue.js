const axios = require('axios');
const fs = require("fs");
const path = require('path');

exports.createJiraIssue = (chatName, text) => {
  const tokenPath = path.join(__dirname, '../scripts/token.json');
  const accessToken = JSON.parse(fs.readFileSync(tokenPath, "utf8")).access_token;

  const bodyRequest = {
    "fields": {
      "project": {
        "key": "TEST" // Ключ вашего проекта JIRA
      },
      "summary": "Запрос мерчанта " + chatName, // Название задачи
      "description": text, // Описание задачи
      "issuetype": {
        "name": "Task" // Тип задачи, например "Task" или "Bug"
      }
    }
  };

  const config = {
    method: 'POST',
    maxBodyLenght: Infinity,
    url: 'https://api.atlassian.com/ex/jira/7bcd7853-ced5-48a6-bd67-9c857612139e/rest/api/2/issue',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    data: bodyRequest
  };

  return new Promise ((resolve, reject) => {
    axios(config)
      .then(response => {
        console.log(response.data);
        resolve({
          message: 'Task created.',
          result: true
        });
      })
      .catch(error => {
        console.log(error.response.data);
        reject({
          message: 'Task failed.',
          result: false
        });
      });
  });
}