import React, { useEffect, useState } from "react";
import {
  Table,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../layout/header/Header";
import { GetAllPedidos } from "../../services/pedidoService";

const Pedido = (props) => {
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    _getAllPedidos()
  }, []);

  const _getAllPedidos = () => {
    GetAllPedidos().then(
      (resp) => {
        let data = resp.data;
        setPedido(data);
      },
      (error) => { }
    );
  };

  return (
    <div>
      <Header />
      <h1>Pedido</h1>
      <form className="form-inline">
        <Button className="button-create" href="/pedidos-create" variant="outline-dark">Criar</Button>
        <Table className="table-form" striped hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Cliente</th>
              <th>Data do Pedido</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>

            {pedido.map((data, index) =>
            (
              <tr className="table-row" key={index}>
                <td width="25%">{data.idPedido}</td>
                <td width="25%"> {data.cliente.nome}</td>
                <td width="25%">{data.dtPedido}</td>
                <td width="25%">{data.valorTotal}</td>
              </tr>
            ))}

          </tbody>
        </Table>
      </form>
    </div>
  );
};

export default Pedido;
