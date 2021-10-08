require('dotenv').config()
const queue = require("./utils/queue")
const axios = require("axios")
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


queue.consume("productsDefault", async(message) => {
    //process the message
    const data = JSON.parse(message.content.toString())
    console.log("Send E-mail to: " + data.email)

    //Get the inventory from VTEX
    await axios({
        url: process.env.DEFAULT_URL, 
        method: "get", 
        headers: {
            Accept: 'application/json'
        }
    })
    .then(async(inventory) => {

        //Create HTML
        let html = "<h1> Inventario </h1> <br></br>"

        //Count the quantity of Items
        html = html + `<h2>Qunatidade de items: ${inventory.data.length} </h3> <br></br>`

        //Print all products on HTML
        inventory.data.forEach(product => {
            html = html + `<h4> ${product.productId} - ${product.productName} </h4> <br> </br>`
        })

        //E-mail
        const msg = {
            to: data.email, 
            from: process.env.SENDER, // Change to your verified sender
            subject: 'Inventario',
            html: html
        }

        //Sender
        sgMail
        .send(msg)
        .then(() => {
            console.log('E-mail sent')
        })
        .catch((error) => {
            console.error(error)
        })
    })
    .catch(err => {
        console.log(err)
    })

})


queue.consume("products", async(message) => {
    //process the message
    const data = JSON.parse(message.content.toString())
    console.log("Send E-mail to: " + data.email)


    //Get the inventory from VTEX
    await axios({
        url: `https://${data.acountName}.${data.enviroment}/api/catalog_system/pub/products/search`, 
        method: "get", 
        headers: {
            Accept: 'application/json'
        }
    })
    .then(async(inventory) => {

        //Create HTML
        let html = "<h1> Inventario </h1> <br></br>"

        //Count the quantity of Items
        html = html + `<h2>Qunatidade de items: ${inventory.data.length} </h3> <br></br>`

        //Print all products on HTML
        inventory.data.forEach(product => {
            html = html + `<h4> ${product.productId} - ${product.productName} </h4> <br> </br>`
        })

        //E-mail
        const msg = {
            to: data.email, 
            from: 'caiogustavoxaviermelo@gmail.com', // Change to your verified sender
            subject: 'Inventario',
            html: html
        }

        //Sender
        sgMail
        .send(msg)
        .then(() => {
            console.log('E-mail sent')
        })
        .catch((error) => {
            console.error(error)
        })
    })
    .catch(err => {
        console.log(err)
    })

})



