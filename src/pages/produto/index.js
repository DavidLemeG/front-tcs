import React, { useEffect, useState } from "react";
import {
  Table,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../layout/header/Header";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";
import confirmService from "../../components/confirmDialog";
import { DeleteProduto, GetAllProdutos } from "../../services/produtoService";

const Produto = (props) => {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    _getAllProdutos()
  }, []);

  const _getAllProdutos = () => {
    GetAllProdutos().then(
      (resp) => {
        let data = resp.data;
        setProduto(data);
      },
      (error) => { }
    );
  };

  const showDeleteDialog = async (id) => {
    let props = {}

    const result = await confirmService.show(props);
    if (result) {
      DeleteProduto(id).then(
        (data) => {
          toast.success("Produto deletado com sucesso!");
          let tbl = produto.filter(
            (c) => !(c.idProduto === id)
          );
          setProduto(tbl);
        },
        (error) => {
          toast.error("Não foi possível deletar os dados.");
        }
      );
    }
  };

  return (
    <div>
      <Header />
      <h1>Produtos</h1>
      <form className="form-inline">
        <Button className="button-create" href="/produtos-create" variant="outline-dark">Criar</Button>
        <Table className="table-form" striped hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Descrição</th>
              <th>Tipo do Produto</th>
              <th>Valor</th>
              <th>Qtd. em Estoque</th>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>

            {produto.map((data, index) =>
            (
              <tr className="table-row" key={index}>
                <td>{data.idProduto}</td>
                <td> {data.descricao}</td>
                <td>{data.tipoProduto}</td>
                <td>{data.valor}</td>
                <td>{data.quantidadeEstoque}</td>
                <td width="5%"><Button href={"/produtos-edit/" + data.idProduto} variant="outline-dark"><FiEdit2 /></Button></td>
                <td width="5%"><Button variant="outline-dark" onClick={() =>
                  showDeleteDialog(data.idProduto)
                }><RiDeleteBin7Line /></Button></td>
              </tr>
            ))}

          </tbody>
        </Table>
      </form>
    </div>
  );
};

export default Produto;
