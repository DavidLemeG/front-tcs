import api from "../api";

const route = "seller"

export async function GetAllOrders(){
    return await api.get(`/${route}/index`);
}

export async function GetAllPrices(){
    return await api.get(`/${route}/prices`);
}

export async function GetFilteredOrders(seller,country,page){
    return await api.get(`/${route}/filter?seller=${seller}&country=${country}&page=${page}`);
}
