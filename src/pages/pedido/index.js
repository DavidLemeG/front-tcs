import React, { useEffect, useState } from "react";
import {
  Table,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../layout/header/Header";
import { GetAllPedidos } from "../../services/pedidoService";
import { GrView } from "react-icons/gr";

const Pedido = (props) => {
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    _getAllPedidos()
  }, []);

  const _getAllPedidos = () => {
    GetAllPedidos().then(
      (resp) => {
        let data = resp.data;

        console.log(data);

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
              <td></td>
            </tr>
          </thead>
          <tbody>

            {pedido.map((data, index) =>
            (
              <tr className="table-row" key={index}>
                <td width="25%">{data.idPedido}</td>
                <td width="25%"> {data.cliente.nome}</td>
                <td width="25%">{data.dtPedido}</td>
                <td width="20%">{data.valorTotal}</td>
                <td width="5%"><Button href={"/pedido-view/" + data.idPedido} variant="outline-dark"><GrView /></Button></td>
              </tr>
            ))}

          </tbody>
        </Table>
      </form>
    </div>
  );
};

export default Pedido;
