import { getOrdersDb,getOrderDb,addOrderDb,deleteOrderDb,updateOrderDb, getUserOrderDb } from "../model/ordersDB.js";

const fetchOrders = async(req,res) =>{
    res.json(await getOrdersDb())
}

const fetchOrder = async(req,res)=>{
    res.json(await getOrderDb(req.params.id))
}

const getUserOrder = async (req, res) => {
    try {
      const userID = req.params.id;
      const orders = await getUserOrderDb(userID);
      res.status(200).json({
        status: 200,
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'An error occurred while fetching the orders',
        error: error.message,
      });
    }
  };
  

const addOrder = async (req, res) => {
    try {
        let { userID, itemID, quantity, totalPrice, status, timeSlot, orderDate, bookingDate } = req.body;
        
        await addOrderDb(userID, itemID, quantity, totalPrice, status, timeSlot, orderDate, bookingDate);
        res.status(200).send('Order was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the order');
    }
};

const deleteOrder = async(req,res)=>{
    try{
        await deleteOrderDb(req.params.id);
        res.status(200).send('Order was deleted successfully')
    } catch(error){
        res.status(404).send('An error occurred while deleting order')
    }
};

const updateOrder = async (req, res) => {
    try {
        let { quantity, totalPrice, status, timeSlot, bookingDate } = req.body;
        let order = await getOrderDb(req.params.id);

        quantity ? quantity = quantity : quantity = order.quantity;
        totalPrice ? totalPrice = totalPrice : totalPrice = order.totalPrice;
        status ? status = status : status = order.status;
        timeSlot ? timeSlot = timeSlot : timeSlot = order.timeSlot;
        bookingDate ? bookingDate = bookingDate : bookingDate = order.bookingDate;

        await updateOrderDb(quantity, totalPrice, status, timeSlot, bookingDate, req.params.id);
        res.status(200).send('Order was updated successfully');
    } catch (error) {
        res.status(404).send('An error occurred while updating the order');
    }
};

export {fetchOrders,fetchOrder,addOrder,deleteOrder,updateOrder, getUserOrder}