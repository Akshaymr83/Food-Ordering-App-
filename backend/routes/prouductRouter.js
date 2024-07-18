
const express=require('express')
const {categoryName} = require('../Controllers/CategoryControler')
 const router=express.Router()

 router.get('/categoryName',categoryName)

 module.exports=router