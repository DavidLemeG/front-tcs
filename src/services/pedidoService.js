import api from "../api";

const route = "pedido"

export async function GetAllPedidos() {
  return await api.get(`/${route}/list`);
}

export async function GetPedido(id) {
  return await api.get(`/${route}/${id}`);
}

export async function CreatePedido(form) {
  return await api.post(`/${route}/`, form);
}