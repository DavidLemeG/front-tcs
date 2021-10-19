import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Label,
} from "reactstrap";
import { Button } from 'react-bootstrap';
import Header from "../../../layout/header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { zipCodeMask } from "../../../util/zipCodeMask";

const ClienteForm = (props) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [cepWithMask, setCepWithMask] = useState("");


  useEffect(() => {

  }, []);

  async function viacepSearch(event) {
    const valor = event.target.value;
    var cep = valor.replace(/\D/g, "");

    if (cep !== "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        setValue("cidade", "...");
        setValue("bairro", "...");
        setValue("logradouro", "...");
        setValue("uf", "...");

        const response = await axios.get(
          "https://viacep.com.br/ws/" + cep + "/json/"
        );

        const viacep = response.data;

        setValue("cidade", viacep.localidade);
        setValue("bairro", viacep.bairro);
        setValue("logradouro", viacep.logradouro);
        setValue("uf", viacep.uf);
      } else {
        toast.error("Cep inválido!");
      }
    }
  }

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

  const onChangeCep = (event) => {
    setCepWithMask(zipCodeMask(event.target.value));
  };


  return (
    <div>
      <Header />
      <h1>Clientes</h1>
      <form className="form-inline">
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <Label for="nome">Nome Completo</Label>
            <input
              className="form-control"
              name="nome"
              id="nome"
              ref={register}
              type="text"
            />
          </div>
          <div className="col-lg-2 col-sm-4">
            <Label for="cpf">CPF</Label>
            <input
              className="form-control"
              name="cpf"
              id="cpf"
              ref={register}
              type="text"
            />
          </div>
          <div className="col-lg-1 col-sm-4">
            <Label for="sexo">Sexo</Label>
            <select
              className="form-control"
              name="sexo"
              id="sexo"
              ref={register}
            >
              <option value="">Selecione</option>
              <option value="M">Homem</option>
              <option value="F">Mulher</option>
              <option value="O">Outro</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-2 col-sm-4">
            <Label for="telefone">Telefone</Label>
            <input
              className="form-control"
              name="telefone"
              id="telefone"
              ref={register}
              type="text"
            />
          </div>
          <div className="col-lg-2 col-sm-4">
            <Label for="celular">Celular</Label>
            <input
              className="form-control"
              name="celular"
              id="celular"
              ref={register}
              type="text"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-2 col-sm-4">
            <Label for="cep">CEP</Label>
            <input
              className="form-control"
              name="cep"
              id="cep"
              maxLength="9"
              defaultValue=""
              placeholder="Ex: 09112-000"
              onBlur={viacepSearch}
              value={cepWithMask}
              onChange={onChangeCep}
              ref={register}
              type="text"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Label for="logradouro">Logradouro</Label>
            <input
              className="form-control"
              name="logradouro"
              id="logradouro"
              ref={register}
              type="text"
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <Label for="bairro">Bairro</Label>
            <input
              className="form-control"
              name="bairro"
              id="bairro"
              ref={register}
              type="text"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Label for="cidade">Cidade</Label>
            <input
              className="form-control"
              name="cidade"
              id="cidade"
              ref={register}
              type="text"
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <Label for="uf">Estado</Label>
            <select
              className="form-control"
              name="uf"
              id="uf"
              ref={register}
            >
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
              <option value="EX">EX</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-2 col-sm-12">
            <Button className="button-form" color="dark" type="submit">
              Enviar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
