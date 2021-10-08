const rabitMQ = require('amqplib')

//Connect to the rabitMQ
function connect(){
    return rabitMQ.connect("amqp://localhost")
                            .then(conn => conn.createChannel())
}

//Create a Queue
function createQueue(channel, queue){
    return new Promise((resolve, reject) => {
        try{
            channel.assertQueue(queue, { durable: true })
            resolve(channel);
        }
        catch(err){ reject(err) }
    });
}

//Send to a existing queue
function sendToQueue(queue, message){
    return connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => {
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
            return true
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

//Consume the queue
function consume(queue, callback){
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.consume(queue, callback, { noAck: true }))
        .catch(err => console.log(err));
}

module.exports = {
    sendToQueue, 
    consume
}