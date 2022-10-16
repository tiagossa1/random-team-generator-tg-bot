<h1 align="center">Welcome to Footbal Team Generator - Telegram Bot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/tiagossa1/random-team-generator-tg-bot#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/tiagossa1/random-team-generator-tg-bot/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/tiagossa1/random-team-generator-tg-bot/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/tiagossa1/Footbal Team Generator - Telegram Bot" />
  </a>
</p>

> Telegram bot to randomize two or more football teams.

## Environment variables
- **TOKEN**: Telegram bot token. For this token, create a bot using @BotFather on Telegram.
- **ALLOWED_IDS**: List of user/chat ids that are allowed to use this bot. **This list MUST be separated by a comma.** To find your user ID, use @userinfobot on Telegram. 
- **TEAM_PLAYERS**: List of player names to generate the teams. **This list MUST be separated by a comma.**
- **GENERATE_COMMAND**: Command keyword for generate command.
- **TIMEZONE**: Time zone string. You can find [here](https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a) all of the time zones.
- **LANGUAGE**: Full language code. e.g. en-US.

## Bot commands
- /[GENERATE_COMMAND] [number of teams] [player names to ignore separated by space].

## Install

```sh
npm install
```

## Usage

```sh
npm run dev
```

## Run tests

```sh
npm test
```

## Author

👤 **Tiago Sá**

* Github: [@tiagossa1](https://github.com/tiagossa1)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/tiagossa1/random-team-generator-tg-bot/issues). You can also take a look at the [contributing guide](https://github.com/tiagossa1/random-team-generator-tg-bot/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Tiago Sá](https://github.com/tiagossa1).<br />
This project is [ISC](https://github.com/tiagossa1/random-team-generator-tg-bot/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_