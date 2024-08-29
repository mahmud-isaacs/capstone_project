import express from 'express'
import { fetchOrders,fetchOrder,addOrder,deleteOrder,updateOrder } from '../controller/ordersController.js'

const router = express.Router()

router.get('/', fetchOrders)

router.get('/:id', fetchOrder)

router.post('/addOrder', addOrder)

router.patch('/update/:id', updateOrder)

router.delete('/delete/:id', deleteOrder)

export default router