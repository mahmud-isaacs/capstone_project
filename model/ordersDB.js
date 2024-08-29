import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config()

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getOrdersDb = async()=>{
    let [data] = await pool.query('SELECT * FROM orders')
    return data;
}

const getOrderDb = async(id) =>{
    let [[data]] = await pool.query('SELECT * FROM orders WHERE orderID = ?', [id])
    return data;
}

const addOrderDb = async (userID, itemID, quantity, totalPrice, status, timeSlot, orderDate, bookingDate) => {
    await pool.query(`
        INSERT INTO orders (userID, itemID, quantity, totalPrice, status, timeSlot, orderDate, bookingDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [userID, itemID, quantity, totalPrice, status, timeSlot, orderDate, bookingDate]);
}

const deleteOrderDb = async(id) =>{
    await pool.query(
        `DELETE FROM orders WHERE orderID = ?`, [id]
    )
}

const updateOrderDb = async (quantity, totalPrice, status, timeSlot, bookingDate, orderID) => {
    await pool.query(`
        UPDATE orders
        SET quantity = ?,
            totalPrice = ?,
            status = ?,
            timeSlot = ?,
            bookingDate = ?
        WHERE orderID = ?
    `, [quantity, totalPrice, status, timeSlot, bookingDate, orderID]);
}

export{getOrdersDb,getOrderDb,addOrderDb,deleteOrderDb,updateOrderDb}