import React, { useEffect, useState } from "react";
import {
  Table,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../layout/header/Header";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { DeleteCliente, GetAllClientes } from "../../services/clienteService";
import { toast } from "react-toastify";
import confirmService from "../../components/confirmDialog";

const Cliente = (props) => {
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    _getAllClientes()
  }, []);

  const _getAllClientes = () => {
    GetAllClientes().then(
      (resp) => {
        let data = resp.data;
        setCliente(data);
      },
      (error) => { }
    );
  };

  const showDeleteDialog = async (id) => {
    let props = {}

    const result = await confirmService.show(props);
    if (result) {
      DeleteCliente(id).then(
        (data) => {
          toast.success("Cliente deletado com sucesso!");
          let tbl = cliente.filter(
            (c) => !(c.idCliente === id)
          );
          setCliente(tbl);
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
      <h1>Clientes</h1>
      <form className="form-inline">
        <Button className="button-create" href="/clientes-create" variant="outline-dark">Criar</Button>
        <Table className="table-form" striped hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>CEP</th>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>

            {cliente.map((data, index) =>
            (
              <tr className="table-row" key={index}>
                <td>{data.idCliente}</td>
                <td> {data.nome}</td>
                <td>{data.cpf}</td>
                <td>{data.telefone}</td>
                <td>{data.cep}</td>
                <td width="5%"><Button href={"/clientes-edit/" + data.idCliente} variant="outline-dark"><FiEdit2 /></Button></td>
                <td width="5%"><Button variant="outline-dark" onClick={() =>
                  showDeleteDialog(data.idCliente)
                }><RiDeleteBin7Line /></Button></td>
              </tr>
            ))}

          </tbody>
        </Table>
      </form>
    </div>
  );
};

export default Cliente;
