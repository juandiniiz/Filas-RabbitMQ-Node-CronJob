# Desenho do Projeto

![](/images/diagrama3.jpg)

# Instalar o Docker e o Node através dos links abaixo

1. https://docs.docker.com/get-docker/
2. https://nodejs.org/pt-br/download/

## Criar a imagem do mongodb com o comando abaixo

```
sudo docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4
```
## Para conferir se a imagem está rodandod e maneira correta acesse http://localhost:27017/ e você verá a imagem abaixo:

![](/images/testemongodb.png)

## Caso queira uma ferramenta de visualização, criar a imagem do mongoclient o comando abaixo

```
sudo docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
```
## Agora para verificar se o mongoclient está rodando corretamente, acesse o seguinte endereço no seu navegador: http://localhost:3000/, em seguida crie uma conexao com os dados de admin seguindo as imagens abaixo

1. clique em conect

![](/images/connectmongo0.png)

2 clique em create new e preencha a aba Coonection com as informações abaixo: 

![](/images/connectmongo1.png)

3. em seguida, preencha a aba authentication com as informações abaixo 

usuario:  admin
senha: admin  

![](/images/connectmongo2.png)



![](/images/connectmongo3.png)

## Crie a imagem do RabbitMq com o comando abaixo:

```
sudo docker run -d --hostname my-rabbit  --name rabbit13 -p 8081:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```

## Agora para verificar se o RabbitMQ está rodando corretamente, acesse o seguinte endereço no seu navegador: http://localhost:8081/, em seguida logue com os dados de acesso:
```
user:  guest
senha: guest    
```
![](/images/rabbitmq.png)

## na raiz da pasta nodeapi , instale as dependencias do projeto com o comando:

```
npm install -g json-server  
npm install express body-parser mongoose amqplib request node-cron fs request
```

## Para colocar mensagens na fila, abra um terminal, navegue até a pasta ApiFila, inicie o serviço com o comando:
```
node index.js
```

## Com o serviço em execução, installe o POSTMAN e faça uma requisição(REQUEST) do tipo POST conforme a imagem abaixo

<imagem>

## Exemplo de objetos para inserir no BODY na opção raw ( não esqueça de mudar o tipo de texto do RAW para JSON)
```
[{
  "freight_order_id": "97019e36-6c5d-4815-bad0-840d53897c34",
  "freight_content_statement_key": "43160400850257000130550010000083991000083990",
  "shipping_integration_id": "f7c95de4-89e0-444a-9455-d01b50dd3e7e",
  "shipping_integration_type": "SSW",
	"delivery": false
},
{
  "freight_order_id": "97019e36-6c5d-4815-bad0-840d53897c35",
  "freight_content_statement_key": "53160400850257000133550010000083991000083991",
  "shipping_integration_id": "f7c95de4-89e0-444a-9455-d01b50dd3e7e",
  "shipping_integration_type": "SSW",
	"delivery": false
},
{
  "freight_order_id": "97019e36-6c5d-4815-bad0-840d53897c36",
  "freight_content_statement_key": "63160400850257000332550010000083991000083997",
  "shipping_integration_id": "f7c95de4-89e0-444a-9455-d01b50dd3e7e",
  "shipping_integration_type": "SSW",
	"delivery": false
}]
```

## Para validar que a mensagem foi inserida na fila, verifique o RabbitMQ na aba Queue, aparecerá a fila de entrada com uma mensagem pronta(Ready) para ser consumida conforme exemplo da imagem abaixo:

![](/images/rabbitmqfilas.png)

## Para consumir a fila e inserir os dados no mongodb, abra um novo terminal, navegue até a raiz do projeto na pasta nodeapi e inicie o servico worker com o comando ;
```
node worker.js
```
## Para validar que as informações foram inseridas, abra o console do mongoclient, vá até a aba collections, clique em encomendas e sem seguida execute a query

<imagem>

## Para executar o Job a cada duas horas, abra outro terminal e navegue até a pasta raiz do projeto(nodeapi) e execute o comando abaixo para iniciar o jsonserver com a resposta da api do transportador:
```
json-server api-shipping-orders-tracking.json --port 3004
```
### 1. Abra outro terminal, navegue até a pasta ApiEncomenda( api para consultar e inserir dados no mongodb ) e inicialize o serviço com o comando:
```
node index.js
```
### 2. Abra outro terminal, navegue até a pasta Cronjob e inicialize o serviço com o comando:
```
node index.js
```
## Caso queira reduzir o tempo do job para a cada 1 minuto, pare o serviço, abra o arquivo index.js dentro da pasta Cronjob, COMENTE a linha 13 e 50 com //, descomente a linha 10 e 51 tirando o // e execute o serviço novamente

## Para validar a inserção da fila de saida, abra um novo terminal, navegue até a raiz do projeto e execute o arquivo worker_saida com o comando 
```
node worker_saida.js
```



