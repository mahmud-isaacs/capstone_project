import { compare } from "bcrypt";
import { loginUserDb } from "../model/usersDB.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const checkUser = async(req,res,next)=>{
    const {userAdd,userPass} = req.body
    let hashedPassword = (await loginUserDb(userAdd)).userPass
    
    console.log(hashedPassword);

    try {
        compare(userPass, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).send('Internal server error');
            }
            
            if (result) {
                let token = jwt.sign({ userAdd: userAdd }, process.env.SECRET_KEY, { expiresIn: '1h' });
                console.log(token);
                req.body.token = token;
                next();
                return;
            } else {
                res.status(401).send('Your password is incorrect');
            }
        });
    } catch (error) {
        res.status(500).send('An unexpected error occurred');
    }
}
export {checkUser}