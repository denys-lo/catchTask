## Подготовка

### 1. Создание Telegram-бота
1. Перейдите в [BotFather](https://t.me/BotFather) и отправьте команду `/newbot`.
2. Следуйте инструкциям, чтобы создать нового бота. Сохраните API-ключ, который будет предоставлен в конце.
3. Отправьте команду `/setprivacy` в [BotFather](https://t.me/BotFather), выберите своего бота и установите `Disable`.

### 2. Создание приложения в Jira Cloud
1. Перейдите на [Jira Developer Console](https://developer.atlassian.com/console/myapps/).
2. Нажмите `Create` и выберите `OAuth 2.0 integration`.
3. Укажите имя приложения.
4. Откроется страница приложения и необходимо внизу нажать `Authorization` и напротив OAuth 2.0 (3LO) нажать кнопку `Add`.
5. Необходимо указать `Callback URL`, на который мы будем получать токен для авторизации.
6. После появится поле “Your app doesn't have any APIs. `Add APIs` to your app.” - нам нужно нажать на ссылку в тексте `Add APIs` и добавить разрешения, который позволять создавать задачи в Jira.

### 3. Получение первого токента
1. Вернитесь в раздел `Authorization` и скопируйте сгенерированный URL.
2. Добавьте `offline_access` к URL для получения Refresh Token (подробности [здесь](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#use-a-refresh-token-to-get-another-access-token-and-refresh-token-pair)).
3. Перейти по этой ссылке и разрешить доступ. После этого на `Callback URL` придет токен, который необходимо скопировать и вставить в скрипт `./scripts/getJiraToken.js`. Данное действие необходимо совершить только один раз мануально, после этого авторизация будет происходить через Refresh Token. Как получить остальные данные для `getJiraToken.js` можно узнать [здесь](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/).

### 4. Запуск `app.js`
Перед всеми манипуляциями необходимо внести изменения под конкретную доску и приложение в файлах папки `/scripts`.
