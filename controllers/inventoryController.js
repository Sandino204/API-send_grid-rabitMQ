const {sendToQueue} = require('../utils/queue')

const inventoryController = {}

//sign the email to receive all the products in stock of default store
inventoryController.subscribeToAllCodeby = async(req, res) => {
    const {email} = req.body

    //Send to Queue
    const result = await sendToQueue("productsCodeBy", {
            email, 
        })

    if(result === true){
        return res.status(200).json({
            success: true, 
            message: "Your email is subscribed"
        })
    }else{
        return res.status(500).json({
            success: false, 
            message: "Something was wrong"
        })
    }
}

//sign the email to receive all the products in stock by dinamic store
inventoryController.subscribeToAll = async(req, res) => {
    const {email, 
        acountName, 
        enviroment} = req.body

    //Send to Queue
    const result = await sendToQueue("products", {
            email,
            acountName, 
            enviroment,
        })

    if(result === true){
        return res.status(200).json({
            success: true, 
            message: "Your email is subscribed"
        })
    }else{
        return res.status(500).json({
            success: false, 
            message: "Something was wrong"
        })
    }
}

module.exports = inventoryController