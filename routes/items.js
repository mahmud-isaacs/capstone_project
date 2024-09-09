import express from 'express'
import { fetchItems,fetchItem,addItem,deleteItem,updateItem } from '../controller/itemsController.js'
import { checkToken } from '../middleware/authentication.js'

const router = express.Router()

router.get('/',checkToken, fetchItems)

router.get('/:id', fetchItem)

router.post('/addItem', addItem)

router.patch('/update/:id', updateItem)

router.delete('/delete/:id', deleteItem)

export default router