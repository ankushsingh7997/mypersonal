const express=require('express');
const router=express.Router();
const customer=require('../controller/customerControllers.js');
const customerMiddleware=require('../middleware/customerMiddleware')

const card=require('../controller/cardController.js')
const cardOperations=require('../middleware/cardMiddleware.js')

router.post('/createCustomer',customerMiddleware.validation, customer.create);

router.post('/createCard',cardOperations.operations,card.create)
router.get('/getActive',customer.getStatusActiveList)
router.get('/getCard',card.getCard)
router.delete('/deleteCard',customer.DeleteCustomer)



module.exports=router;