const { Telegraf } = require('telegraf');
const axios = require('axios');
const { getJiraRefreshToken } = require('./scripts/getJiraRefreshToken');
const { createJiraIssue } = require('./scripts/createJiraIssue');

const bot = new Telegraf('');

// Команда /start
bot.start((ctx) => {
    ctx.reply('Hello, if you have a question for our operations team, please describe it in as much detail as possible and add the value «askSupport» at the end.');
});

bot.on('text', (ctx) => {
    const text = ctx.message.text;
    if (text.toLowerCase().includes('asksupport')) {

        getJiraRefreshToken()
            .then(isTokenReceived => {
                if(isTokenReceived.result) {
                    createJiraIssue(ctx.chat.title, text)
                        .then(response => {
                            ctx.reply('Task created, team will be here soon to help! @SupportName');
                        })
                        .catch(error => {
                            ctx.reply('Unfortunately, the task has not been created, but our team will come to the chat soon and help you. @SupportName');
                        });
                } else {
                    ctx.reply('Unfortunately, the task has not been created, but our team will come to the chat soon and help you. @SupportName');
                }
            })
            .catch(error => {
                ctx.reply('Unfortunately, the task has not been created, but our team will come to the chat soon and help you. @SupportName');
            });
    }
});

// Запуск бота с использованием polling
bot.launch();

// Обработка корректной остановки
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));