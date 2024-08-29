import { getItemsDb,getItemDb,addItemDb,deleteItemDb,updateItemDb } from "../model/itemsDB.js";

const fetchItems = async(req,res) =>{
    res.json(await getItemsDb())
}

const fetchItem = async(req,res)=>{
    res.json(await getItemDb(req.params.id))
}

const addItem = async(req,res) =>{
    try{
        let {itemName, itemDescription, itemPrice, itemUrl} = req.body;
        await addItemDb(itemName, itemDescription, itemPrice, itemUrl);

        res.status(200).send('Item was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding item')
    }
};

const deleteItem = async(req,res) => {
    try {
        await deleteItemDb(req.params.id);
        res.status(200).send('Item was deleted successfully')
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete item')
    }
};

const updateItem = async(req,res) => {
    try {
        let { itemName, itemDescription, itemPrice, itemUrl} = req.body;
        let item = await getItemDb(req.params.id);
        itemName?itemName=itemName:itemName = item.itemName
        itemDescription?itemDescription=itemDescription:itemDescription = item.itemDescription
        itemPrice?itemPrice=itemPrice:itemPrice = item.itemPrice
        itemUrl?itemUrl=itemUrl:itemUrl = item.itemUrl

        await updateItemDb(itemName, itemDescription, itemPrice, itemUrl, req.params.id);
        res.status(200).send('Item was updated successfully');
    } catch (error) {
        res.status(404).send('An error occurred while updating item')
    }
};

export {fetchItems,fetchItem,addItem,deleteItem,updateItem}