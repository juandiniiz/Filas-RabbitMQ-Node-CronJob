  
  function connect(){
    return require('amqplib').connect("amqp://localhost:5672")
                             .then(conn => conn.createChannel());
  }
 
  function createQueue(channel, queue){
    return new Promise((resolve, reject) => {
      try{
        channel.assertQueue(queue, { durable: true });
        resolve(channel);
      }
      catch(err){ reject(err) }
    });
  }
   
  function sendQueue(queue, message){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))))        
      .catch(err => console.log(err))         

  }
   
  function consume(queue, callback){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.consume(queue, callback, { noAck: true }))
      .catch(err => console.log(err));
  }
   
module.exports = { consume , sendQueue }






