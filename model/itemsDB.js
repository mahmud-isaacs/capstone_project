import { createPool } from "mysql2/promise";
import {config} from 'dotenv'

config()

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getItemsDb = async () => {
    let [data] = await pool.query('SELECT * FROM items')
    return data;
}

const getItemDb = async (id) => {
    let [[data]] = await pool.query('SELECT * FROM items WHERE itemID = ?', [id])
    return data;
}

const addItemDb = async(itemName, itemDescription, itemPrice, itemUrl)=>{
    await pool.query(`
        INSERT INTO items (itemName, itemDescription, itemPrice, itemUrl)
        VALUES (?,?,?,?)
        `, [itemName, itemDescription, itemPrice, itemUrl])
}

const deleteItemDb = async(id) =>{
    await pool.query('DELETE FROM items WHERE itemID = ?', [id])
}

const updateItemDb = async(itemName, itemDescription, itemPrice, itemUrl, id) =>{
    await pool.query(`
        UPDATE items
        SET itemName = ?,
        itemDescription = ? ,
        itemPrice = ?,
        itemUrl = ?
        WHERE itemID = ?`, [itemName, itemDescription, itemPrice, itemUrl, id])
}

export {getItemsDb,getItemDb,addItemDb,deleteItemDb,updateItemDb}