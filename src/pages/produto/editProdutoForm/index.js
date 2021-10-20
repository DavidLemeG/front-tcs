/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Label,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../../layout/header/Header";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";
import { GetProduto, UpdateProduto } from "../../../services/produtoService";

export function EditProdutoForm() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [validationState, setValidationState] = useState([]);
  const history = useHistory();

  const params = useParams();
  const idProduto = params.idProduto;

  useEffect(() => {
    _getProduto();
  }, []);

  const _getProduto = () => {
    GetProduto(idProduto).then(
      (resp) => {
        let data = resp.data

        setValue("descricao", data.descricao);
        setValue("tipoProduto", data.tipoProduto);
        setValue("valor", data.valor);
        setValue("quantidadeEstoque", data.quantidadeEstoque);
      },
      (error) => {
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === 'object') {
              Object.values(erro.errors).forEach((e) => {
                toast.error(e[0]);
              });
            } else {
              toast.error(erro);
            }
          } else {
            toast.error("Não foi possível carregar os dados.");
          }

        } catch (e) {
          toast.error("Ocorreu um erro interno.");
        }
      }
    );
  };

  const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.descricao === undefined || form.descricao === null || form.descricao === "") {
      hasError = true;
      validationState.descricao = "error";
      toast.error("Você precisa informar a descrição do produto.");
    }

    if (form.tipoProduto === undefined || form.tipoProduto === null || form.tipoProduto === "") {
      hasError = true;
      validationState.tipoProduto = "error";
      toast.error("Você precisa informar o tipo do produto.");
    }

    if (form.valor === undefined || form.valor === null || form.valor === "") {
      hasError = true;
      validationState.valor = "error";
      toast.error("Você precisa informar o valor do produto.");
    }

    if (form.quantidadeEstoque === undefined || form.quantidadeEstoque === null || form.quantidadeEstoque === "") {
      hasError = true;
      validationState.cep = "error";
      toast.error("Você precisa informar a quantidade estoque do produto.");
    }

    setValidationState(validationState);
    return hasError;
  };

  const  updateProduto= (form) => {

    let data = {
      ...form,
    }

    UpdateProduto(idProduto, data).then(
      (resp) => {
        toast.success("Produto editado com sucesso!");
        history.push('/produtos')
      },
      (error) => {
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === "object") {
              Object.values(erro.errors).forEach((e) => {
                toast.error(e[0]);
              });
            } else {
              toast.error(erro);
            }
          } else {
            toast.error("Não foi possível carregar os dados.");
          }
        } catch (e) {
          toast.error("Ocorreu um erro interno.");
        }
      }
    );
  };

  function onSubmit(form) {
    if (!validationBeforeCreate()) {
      updateProduto(form);
    }
  }

  return (
    <div>
      <Header />
      <h1>Editar Cliente</h1>
      <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Label for="descricao">Descrição</Label>
            <input
              className="form-control"
              name="descricao"
              id="descricao"
              ref={register}
              type="text"
              style={
                validationState.descricao !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <Label for="tipoProduto">Tipo do Produto</Label>
            <input
              className="form-control"
              name="tipoProduto"
              id="tipoProduto"
              ref={register}
              type="text"
              style={
                validationState.tipoProduto !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Label for="valor">Valor</Label>
            <input
              className="form-control"
              name="valor"
              id="valor"
              type="number"
              step="0.01"
              ref={register}
              style={
                validationState.valor !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <Label for="quantidadeEstoque">Qtd. em Estoque</Label>
            <input
              className="form-control"
              name="quantidadeEstoque"
              id="quantidadeEstoque"
              ref={register}
              type="number"
              style={
                validationState.quantidadeEstoque !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-1 col-sm-12">
            <Button className="button-form" color="dark" type="submit">
              Enviar
            </Button>
          </div>
          <div className="col-lg-1 col-sm-12">
            <Button className="button-form" href="/clientes" variant="outline-dark">Voltar</Button>
          </div>
        </div>
      </form>
    </div>
  );
}


export default EditProdutoForm;
