import express from 'express'
import { fetchUsers,fetchUser,addUser,deleteUser,updateUser,loginUser } from '../controller/usersController.js'
import { checkUser , checkToken} from '../middleware/authentication.js'

const router =  express.Router()

router.get('/', fetchUsers)

router.get('/:id', fetchUser)

router.get('/auth', checkToken, async(req,res)=>{
    res.json(req.body.user)
    console.log(req.body.user);
    
})

router.post('/login', checkUser, loginUser)

router.post('/register', addUser)

router.patch('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

export default router