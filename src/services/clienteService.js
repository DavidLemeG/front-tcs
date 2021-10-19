import api from "../api";

const route = "cliente"

export async function GetAllClientes() {
  return await api.get(`/${route}/list`);
}

export async function GetCliente(id) {
  return await api.get(`/${route}/${id}`);
}

export async function CreateCliente(form) {
  return await api.post(`/${route}/`, form);
}

export async function UpdateCliente(id, form) {
  return await api.put(`/${route}/${id}`, form);
}

export async function DeleteCliente(id) {
  return await api.delete(`/${route}/${id}`);
}