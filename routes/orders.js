import express from 'express'
import { fetchOrders,fetchOrder,addOrder,deleteOrder,updateOrder, getUserOrder } from '../controller/ordersController.js'
import { checkToken } from '../middleware/authentication.js'

const router = express.Router()

router.get('/', fetchOrders)

router.get('/:id', fetchOrder)

router.post('/addOrder', addOrder)

router.patch('/update/:id', updateOrder)

router.delete('/delete/:id', deleteOrder)

router.get('/user/:id',checkToken, getUserOrder)

export default router