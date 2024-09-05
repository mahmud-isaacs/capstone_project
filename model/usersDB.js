import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config()

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getUsersDb = async()=>{
    const [data] = await pool.query('SELECT * FROM users')
    return data
}

const getUserDb = async(id)=>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE userID = ?', [id])
    return data
}

const loginUserDb = async(userName) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE userName = ?' , [userName])
    return data
}

const addUserDb = async(firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile) => {
    try {
        await pool.query(`
            INSERT INTO users (firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [firstName, lastName, userName, userAge, gender, userRole, userAdd, userPass, userProfile]);
    } catch (error) {
        console.error("Database insertion failed:", error.message);
        throw error; 
    }
};

const deleteUserDb = async(id)=>{
    await pool.query(`DELETE FROM users WHERE userID = ?`, [id])
}

const updateUserDb = async(firstName,lastName,userName,userAge,gender,userRole,userAdd,userPass,userProfile, id)=>{
    await pool.query(`
        UPDATE users
        SET firstName = ?,
        lastName = ?,
        userName = ?,
        userAge = ?,
        gender = ?,
        userRole = ?,
        userAdd = ?,
        userPass = ?,
        userProfile = ?
        WHERE userID = ?`,
    [firstName,lastName,userName,userAge,gender,userRole,userAdd,userPass,userProfile, id])
}

export {getUsersDb, getUserDb, addUserDb, deleteUserDb,loginUserDb,updateUserDb}