import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Table,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../layout/header/Header";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

const Cliente = (props) => {
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
  }, []);

  // const _getAllOrders = () => {
  //   GetAllOrders().then(
  //     (resp) => {
  //       let data = resp.data.data;

  //       let actualPages = [];
  //       for (let i = 1; i <= resp.data.last_page; i++) {
  //         actualPages.push(i);
  //       }
  //       setPages(actualPages);
  //       setOrders(data);
  //     },
  //     (error) => { }
  //   );
  // };

  return (
    <div>
      <Header />
      <h1>Clientes</h1>
      <form className="form-inline">
        <Button href="/clientes-create"variant="outline-dark">Criar</Button>
        <Table className="table-form" striped hover responsive>
          <thead>
            <tr>
              <th>Ordem de Id</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Vendedor</th>
              <th>País</th>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>

            <tr className="table-row">
              <td>1</td>
              <td>Celular</td>
              <td>1000.00</td>
              <td>teste</td>
              <td>Brasil</td>
              <td width="5%"><Button variant="outline-dark"><FiEdit2/></Button></td>
              <td width="5%"><Button variant="outline-dark"><RiDeleteBin7Line/></Button></td>
            </tr>

          </tbody>
        </Table>
      </form>
    </div>
  );
};

export default Cliente;
