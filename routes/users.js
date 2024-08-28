import express from 'express'
import { fetchUsers,fetchUser,addUser,deleteUser,updateUser,loginUser } from '../controller/usersController.js'
import { checkUser } from '../middleware/authentication.js'

const router =  express.Router()

router.get('/', fetchUsers)

router.get('/:id', fetchUser)

router.post('/login', checkUser, loginUser)

router.post('/register', addUser)

router.patch('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

export default router