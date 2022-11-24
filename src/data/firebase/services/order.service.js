import { idID } from "@mui/material/locale";
import { getAllOrders, getOrderByID, getOrdersByEmail, updateStatusByID } from "../repositories/orders.repository";

export const placeOrder = () => {};

export const orderUpdateStatusService = async (id, newStatus) => {
    const order = await getOrderByID(id)
    console.log(order)
    if(!order){
        return alert('Error: order maybe deleted, please try again.')
    }
    return await updateStatusByID(id, {
        ...order,
        Status: newStatus
    })
}

export const getMyOrdersService = async () => {
    const getEmail = sessionStorage.getItem('email')
    return getOrdersByEmail(getEmail)
}


export const getAllOrdersService = async () => {
    return getAllOrders()
}