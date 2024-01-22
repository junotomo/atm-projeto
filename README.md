# atm-projeto
 Projeto criado em Nodejs e MongoDB que possui Apis com a finalidade de calcular o menor número de notas (entre notas de 10, 20, 50 e 100) dado um valor a ser retirado da caixa eletronica, outra api para retornar o saldo da conta e por ulimo no numero de notas restantes na caixa.__Rodar ante do projeto svelte-front-atm__

 # Instruções

  Para rodar o projeto:
  - Criar um arquivo .env onde a porta utilizada é a 3000
    > PORT=3000
    > MONGODB_URI=XXXXXX
    
 ```
  npm install
  npm run start
```
- Para rodar os testes
  
 ```
  npm run test
```
# Routes das APIs
## GET: saldo da conta
 realiza um GET request que retorna objeto json, o valor do pin foi criado de forma estatica e o valor inicial do saldo foi definido de acordo com o desafio.
 ```
 {
   "pin": 777,
   "balance": 1000
  }
```
  (http://localhost:3000/atm/balance)

  ## GET: Número de notas restantes na máquina
 realiza um GET request que retorna objeto json, o valorda quantidade de notas de cada valor.
 ```
 {
   "10": 200,
   "20": 200,
   "50": 200,
   "100": 200
  }
```
  (http://localhost:3000/atm/atmData)
## PUT: Retira a quantidade desejada de dinheiro
 realiza um PUT request que recebe como párametro um Integer positivo atualiza o saldo do cliente, a quantidade de notas da máquina e retorna a quantidade de cada nota totalizando o valor requerido. Exemplo: 90
 ```
 {
   "10": 0,
   "20": 2,
   "50": 1,
   "100": 0
  }
```
http://localhost:3000/atm/withdrawal
### É necessário utilizar o pin para que a conta do cliente se ja encontrado no banco.
 ```
 {
   "pin": 777,
   "amount": 90,
  }
```

