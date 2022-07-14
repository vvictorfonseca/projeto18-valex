<p align="center">
  <a href="https://github.com/vvictorfonseca/valex">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h2 align="center">
    Valex
  </h2>
</p>

## Usage

```bash
$ git clone https://github.com/vvictorfonseca/valex

$ cd valex

$ npm install

$ npm run dev
```
## Link deploy Heroku

```bash
https://valexproject.herokuapp.com/
```
API:

```
- POST /insert (autenticada)
    - Rota para criar e cadastrar um novo cartão, usando o identificador do empregado e o tipo do cartão.
    - headers: { x-api-key: apiKey }
    - body: 
    {
        "employeeId": 1,
        "type": "groceries"
    }

- PUT /update
    - Rota para ativar o cartão criado, usando o identificador do cartão, seu código de segurança e uma senha.
    - body: 
    {
        "cardId": 1,
        "securityCode": "633",
        "password": "1234"
    }

- GET /balance
    - Rota para listar todos as transações, recargas e também o saldo atual do cartão, usando seu identificador.
    - body: 
    {
        "cardId": 1
    }

- PUT /block
    - Rota para bloquear o cartão, usando seu identificador e senha.
    - body: 
    {
        "cardId": 1,
        "password": "1234"
    }

- PUT /unlock
    - Rota para desbloquear o cartão, usando seu identificador e senha.
    - body: 
    {
        "cardId": 1,
        "password": "1234"
    }

- POST /recharge (autenticada)
    - Rota para fazer uma recarga no cartão, usando seu identificador e o valor a ser colocado
    - headers: { x-api-key: apiKey }
    - body: 
    {
        "cardId": 1,
        "amount": 500
    }

- POST /payment
    - Rota para fazer uma compra, usando seu identificador, identificador do estabelecimento, sua senha e o valor a ser pago.
    - body: 
    {
        "cardId": 1,
        "businessId, 2,
        "password": "1234",
        "amount": 35
    }
