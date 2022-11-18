<h1 align="center">
  supermarket chatbot server
</h1>

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucasvtiradentes/supermarket-chatbot-api.svg">
  <a href="https://github.com/lucasvtiradentes/supermarket-chatbot-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasvtiradentes/supermarket-chatbot-api.svg">
  </a>
  <a href="https://github.com/lucasvtiradentes/supermarket-chatbot-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lucasvtiradentes/supermarket-chatbot-api.svg">
  </a>
</p>

<p align="center">
  <a href="#information_source-description">Description</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="#information_source-features">Features</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-edit-it">How to edit it?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-it-works">How it works?</a>
</p>

## :information_source: Description

This is an simple server API used to add supermarkts customer messages to an database, which will be read by [supermarket-chatbot](https://github.com/lucasvtiradentes/supermarket-chatbot) and send customer messages in whatsapp.

<p align="center">
  <img style="width: 100%" src="https://media0.giphy.com/media/dt0kE9GZGgXCCSahfv/giphy.gif">
</p>


## :information_source: Features

- [x] Add messages to a database, which will be used to sent messages to customers;
- [x] Add token/license to a database, which will be used to validate supermaket desktop app usage. This means, the app will only send messages if there's a valid access token;

## :information_source: Technologies

The project used the following technologies:

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>Scope</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>engine</td>
      <td align="center">
        <a target="_blank" href="https://nodejs.org"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>secondary</td>
      <td align="center">
        <a target="_blank" href="https://expressjs.com/pt-br/"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></a>
        <a target="_blank" href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"></a>
        <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>dev tools</td>
      <td align="center">
        <a target="_blank" href="https://editorconfig.org/"><img src="https://img.shields.io/badge/editorconfig-gray?style=for-the-badge&logo=editorconfig&logoColor=white"></a>
      </td>
    </tr>
  </table>
</div>

## :information_source: How to edit it

To clone this repository and make changes in the source code, you'll need [Git](https://git-scm.com) and  [Nodejs](https://nodejs.org/en/) in your computer.

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/supermarket-chatbot-api

# Go into the repository
$ cd supermarket-chatbot-api

# Install dependencies
$ npm install

# Run the code in devlopment mode
$ npm run dev

# Run the code in production mode
$ npm run start

```

To access the mongoDB database, you can use [this tool](https://www.mongodb.com/try/download/compass).

## :information_source: How it works

In order to send messages for supermaket clients in [supermarket-chatbot](https://github.com/lucasvtiradentes/supermarket-chatbot), you'll need to store the messages in a database. How? By send a post request to this API with the following JSON content:

```
{
  "token": "___",
  "message_content": {
    "customer_name": "Iracema Sousa Barroso",
    "customer_phone": "(98) 98118-4923",
    "market_name": "Mateus Renascença   🛒",
    "market_id": "237a2010-2f46-4424-b5e8-d209aaa8a169",
    "message_type": "############",
    "order_number": "20200725105555",
    "order_date": "25/07/2020",
    "order_time": "15:07",
    "order_products": [
      [
          "Sku: 1077 - Código de barras: 7891080400599",
          "Margarina Cremosa com Sal",
          "-",
          "1",
          "3,190",
          "1",
          "3,190",
          "",
          "-",
          "-",
          "-"
      ],
      [
          "Sku: 100179 - Código de barras: 7896369619228",
          "Manteiga de Palma",
          "-",
          "1",
          "6,670",
          "1",
          "6,670",
          "",
          "-",
          "-",
          "-"
      ]
    ]
  }
}
```

You need to replace the content of `message_type` according to the orders's position in the order step in the funnel. The possible options are shown in the next table:

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>message_type</th>
      <th>when to send</th>
      <th>content</th>
    </tr>
    <tr>
      <td>greeting</td>
      <td>authorized request
</td>
      <td align="left">Hello super customer, the separation of your order has started, so we will contact you if any product is temporarily out of stock on the market.</td>
    </tr>
    <tr>
      <td>occurrences</td>
      <td>processed order</td>
      <td align="left">Hello super customer, your order has the following occurrences: x, y, z. In this way, below is the updated value of your purchases.</td>
    </tr>
    <tr>
      <td>ready_for_pickup</td>
      <td>ready to pick up</td>
      <td align="left">Hello super customer, your order is ready for pickup.</td>
    </tr>
  </table>
</div>

The messages can be denied to be add in the database in the following cases:
- Unsuccessful attempt to add message, invalidated due to incompatible token;
- Unsuccessful attempt to add a message, invalidation because it already exists in the database;
- Unsuccessful attempt to add a message, invalidation due to the message not having the appropriate fields in the object.

__API ROUTES__

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>Scope</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>/message/add</td>
      <td align="left">Adds a message to the database through an object sent by POST method.</td>
    </tr>
    <tr>
      <td>/token/add</td>
      <td align="left">Returns an authentication token from an object (containing the `username` field) sent by POST method.</td>
    </tr>
  </table>
</div>


---

Made with ♥ by Lucas Vieira.

Get it touch: [github](https://github.com/lucasvtiradentes) | [linkedin](https://www.linkedin.com/in/lucasvtiradentes) | lucasvtiradentes@gmail.com
