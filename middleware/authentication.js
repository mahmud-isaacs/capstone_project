import { config } from 'dotenv';
import pkg from 'jsonwebtoken'

const { sign, verify } = pkg;

config(); 

export function createToken(user) {
    try {
        return sign({
            userID: user.userID,
            userName: user.userName
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
    } catch (error) {
        throw new Error('Token creation failed: ' + error.message);
    }
}

export function verifyAToken(req, res, next) {
    try {
        console.log('hehe');
        // const token = req.cookies["Valid User"];
        // console.log(req.headers.cookie.split('=')[2]);
        const token =req.headers.cookie && req.headers.cookie.split('=')[2];
        console.log('hehe2');
        if (token) {
            const valid = verify(token, process.env.SECRET_KEY);
            if (valid) {
                req.authenticated = true;
                req.user = valid; 
                next();
            } else {
                res.status(401).json({ err: "Invalid token" });
            }
        } else {
            res.status(401).json({ err: "No token provided" });
        }
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
}
// module.exports= {createToken, verifyAToken};