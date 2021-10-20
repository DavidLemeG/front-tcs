import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Label,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../../layout/header/Header";
import { toast } from "react-toastify";
import { formatPrice } from "../../../util/formatPrice";
import { GetAllClientes } from "../../../services/clienteService";
import { useHistory } from "react-router";
import styled from "styled-components";
import { GetAllProdutos } from "../../../services/produtoService";
import { CreatePedido,  } from "../../../services/pedidoService";

const PedidoForm = (props) => {
  const { register, handleSubmit, watch } = useForm();
  const [validationState, setValidationState] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState({});

  const [pedido, setPedido] = useState({});
  const [quantidade, setQuantidade] = useState(1);

  const history = useHistory();


  useEffect(() => {
    _getAllClientes()
    _getAllProdutos()
  }, []);

  const _getAllClientes = () => {
    GetAllClientes().then(
      (resp) => {
        let data = resp.data;
        setClientes(data);
      },
      (error) => { }
    );
  };

  const _getAllProdutos = () => {
    GetAllProdutos().then(
      (resp) => {
        let data = resp.data;
        setProdutos(data);
      },
      (error) => { }
    );
  };

  const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.cliente === undefined || form.cliente === null || form.cliente === "") {
      hasError = true;
      validationState.cliente = "error";
      toast.error("Você precisa informar o nome do cliente.");
    }

    if (form.produto === undefined || form.produto === null || form.produto === "") {
      hasError = true;
      validationState.produto = "error";
      toast.error("Você precisa informar um Produto pelo menos.");
    }

    if (form.quantidade === undefined || form.quantidade === null || form.quantidade === "" || form.quantidade === 0) {
      hasError = true;
      validationState.quantidade = "error";
      toast.error("Quantidade precisa ser maior do que 0.");
    }

    setValidationState(validationState);
    return hasError;
  };

  function onChangeSelectedProduct(event) {
    const code = Number(event.target.value);

    const produto = produtos.find((item) => item.idProduto === code);
    setSelectedProduto(produto);
  }

  function onChangeSelectedCliente(event) {
    const code = Number(event.target.value);

    const cliente = clientes.find((item) => item.idCliente === code);
    setSelectedCliente(cliente);
  }

  function insertIntoOrderSummary() {
    if (quantidade < 1) {
      toast.error("Você precisa adicionar ao menos um produto.");
      return;
    }

    if (
      selectedProduto === undefined ||
      (selectedProduto !== undefined && Object.keys(selectedProduto).length < 1)
    ) {
      toast.error("Você precisa selecionar um produto.");
      return;
    }

     let atualizarPedido;
     let atualizarItens = [];

    if (Object.keys(pedido).length > 0) {
      let hasSelectedProduto = false;

      pedido.pedidoItens.forEach((item) => {
        if (item.produtoId !== selectedProduto.idProduto) {
          atualizarItens.push(item);
        } else {
          atualizarItens.push({
            ...item,
            quantidade: item.quantidade + quantidade,
            valor: item.produto.valor * (item.quantidade + quantidade),
          });
        }
      });

      atualizarItens.forEach((item) => {
        if (item.produtoId === selectedProduto.idProduto) {
          hasSelectedProduto = true;
        }
      });

      if (!hasSelectedProduto) {
        atualizarItens.push({
          produtoId: selectedProduto.idProduto,
          quantidade,
          produto: selectedProduto,
          valor: selectedProduto.valor * quantidade,
        });
      }
    } else {
      atualizarItens.push({
        produtoId: selectedProduto.idProduto,
        quantidade,
        produto: selectedProduto,
        valor: selectedProduto.valor * quantidade,
      });
    }

    atualizarPedido = {
      pedidoItens: atualizarItens,
    };

    const total = atualizarItens.reduce((acc, product) => {
      acc += product.valor;
      return acc;
    }, 0);

    setPedido({ ...atualizarPedido, total });
  }

  const createPedido = (form) => {

    const atualizarItens = pedido.pedidoItens.map((item) => {
      return { ...item };
    });

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    let dataAtual = ano + '-' + mes + '-' + dia;

    const obj = {
      dtPedido: dataAtual,
      valorTotal: pedido.total,
      itens: atualizarItens,
      cliente: selectedCliente 
    };


    CreatePedido(obj).then(
      (resp) => {
        toast.success("Pedido criado com sucesso!");
        history.push("/pedidos");
      },
      (error) => {
        toast.error("Ocorreu um erro interno, alguns dos itens estão com a quantidade maior do que em estoque.");
      }
    );
  };

  function onSubmit(form) {
    if (!validationBeforeCreate()) {
       createPedido(form);
    }
  }

  return (
    <div>
      <Header />
      <h1>Criar Pedido</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-5 mx-auto"
      >

        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Label for="produto">Produto</Label>
            <select
              className="form-control"
              name="produto"
              id="produto"
              onChange={onChangeSelectedProduct}
              ref={register}
              style={
                validationState.produto !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            >
              <option value="">Selecione o produto...</option>
              {produtos.map((data, index) => (
                <option key={index} value={data.idProduto}>
                  {data.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 col-sm-12">
            <Label for="quantidade">Quantidade</Label>
            <input
              className="form-control"
              name="quantidade"
              id="quantidade"
              ref={register}
              type="number"
              onChange={(event) =>
                setQuantidade(Number(event.target.value))
              }
              style={
                validationState.quantidade !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Label for="cliente">Cliente</Label>
            <select
              className="form-control"
              name="cliente"
              id="cliente"
              onChange={onChangeSelectedCliente}
              ref={register}
              style={
                validationState.cliente !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            >
              <option value="">Selecione o Cliente...</option>
              {clientes.map((data, index) => (
                <option key={index} value={data.idCliente}>
                  {data.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 col-md-3">
            <Button onClick={insertIntoOrderSummary} className="button-form">
              Adicionar
            </Button>
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="form-group col-md-4">
            <Button className="button-form" type="submit">
              Criar Pedido
            </Button>
          </div>
        </div>
        <br />
        <div className="form-group col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumo do Pedido:</h5>
              <ProductTable>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Qtd.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.pedidoItens &&
                    pedido.pedidoItens.map((orderItem) => (
                      <tr key={orderItem.produto.idProduto}>
                        <td>
                          <strong>{orderItem.produto.descricao}</strong>
                          <span>{formatPrice(orderItem.produto.valor)}</span>
                        </td>
                        <td>{orderItem.quantidade}</td>
                        <td>
                          <strong>{formatPrice(orderItem.valor)}</strong>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </ProductTable>
              <br />
              <footer>
                <p
                  style={{
                    color: "#222",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  TOTAL -{" "}
                  {!isNaN(pedido.total) ? formatPrice(pedido.total) : ""}
                </p>
              </footer>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const ProductTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  img {
    height: 100px;
  }
  strong {
    color: #333;
    display: block;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
    svg {
      color: #222;
      transition: color 0.2s;
    }
  }
`;

export default PedidoForm;
