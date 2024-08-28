import { compare } from "bcrypt";
import { loginUserDb } from "../model/usersDB.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const checkUser = async (req, res, next) => {
    const { userName, userPass } = req.body;

    try {
        const user = await loginUserDb(userName);
        
        if (!user) {
            return res.status(401).send('User does not exist');
        }

        const hashedPassword = user.userPass;

        compare(userPass, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).send('Internal server error');
            }

            if (result) {
                const token = jwt.sign({ userName: userName }, process.env.SECRET_KEY, { expiresIn: '1h' });
                console.log(token);
                req.body.token = token;
                next();
            } else {
                return res.status(401).send('Your password is incorrect');
            }
        });
    } catch (error) {
        return res.status(500).send('An unexpected error occurred');
    }
};

export { checkUser };