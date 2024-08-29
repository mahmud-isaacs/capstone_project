import express from 'express'
import { fetchItems,fetchItem,addItem,deleteItem,updateItem } from '../controller/itemsController.js'

const router = express.Router()

router.get('/', fetchItems)

router.get('/:id', fetchItem)

router.post('/addItem', addItem)

router.patch('/update/:id', updateItem)

router.delete('/delete/:id', deleteItem)

export default router