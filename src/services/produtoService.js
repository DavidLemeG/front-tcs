import api from "../api";

const route = "produto"

export async function GetAllProdutos() {
  return await api.get(`/${route}/list`);
}

export async function GetProduto(id) {
  return await api.get(`/${route}/${id}`);
}

export async function CreateProduto(form) {
  return await api.post(`/${route}/`, form);
}

export async function UpdateProduto(id, form) {
  return await api.put(`/${route}/${id}`, form);
}

export async function DeleteProduto(id) {
  return await api.delete(`/${route}/${id}`);
}
