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
import { cpfMask } from "../../../util/cpfMask";
import { cellphoneMask } from "../../../util/cellphoneMask";
import { CreateCliente } from "../../../services/clienteService";
import { useHistory } from "react-router";

const ClienteForm = (props) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [validationState, setValidationState] = useState([]);
  const [cpfWithMask, setCpfWithMask] = useState("");
  const [cepWithMask, setCepWithMask] = useState("");
  const [cellWithMask, setCellWithMask] = useState("");
  const [tellWithMask, setTellWithMask] = useState("");
  const history = useHistory();


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

  const validationBeforeCreate = () => {
    let form = watch();
    let hasError = false;
    let validationState = {};

    if (form.nome === undefined || form.nome === null || form.nome === "") {
      hasError = true;
      validationState.nome = "error";
      toast.error("Você precisa informar o nome do cliente.");
    }

    if (form.cpf === undefined || form.cpf === null || form.cpf === "") {
      hasError = true;
      validationState.cpf = "error";
      toast.error("Você precisa informar o CPF do cliente.");
    }

    if (form.sexo === undefined || form.sexo === null || form.sexo === "") {
      hasError = true;
      validationState.sexo = "error";
      toast.error("Você precisa informar o sexo do cliente.");
    }

    if (form.cep === undefined || form.cep === null || form.cep === "") {
      hasError = true;
      validationState.cep = "error";
      toast.error("Você precisa informar o CEP do cliente.");
    }

    if (form.logradouro === undefined || form.logradouro === null || form.logradouro === "") {
      hasError = true;
      validationState.logradouro = "error";
      toast.error("Você precisa informar o logradouro do cliente.");
    }

    if (form.bairro === undefined || form.bairro === null || form.bairro === "") {
      hasError = true;
      validationState.bairro = "error";
      toast.error("Você precisa informar o bairro do cliente.");
    }

    if (form.cidade === undefined || form.cidade === null || form.cidade === "") {
      hasError = true;
      validationState.cidade = "error";
      toast.error("Você precisa informar o cidade do cliente.");
    }

    if (form.uf === undefined || form.uf === null || form.uf === "") {
      hasError = true;
      validationState.uf = "error";
      toast.error("Você precisa informar o estado do cliente.");
    }

    setValidationState(validationState);
    return hasError;
  };

  const createNewCliente = (form) => {

    let data = {
      ...form,
      cep: cepWithMask
    }

    CreateCliente(data).then(
      (resp) => {
        toast.success("Cliente cadastrado com sucesso!");
        history.push('/clientes')
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

  const onChangeCep = (event) => {
    setCepWithMask(zipCodeMask(event.target.value));
  };

  const onChangeCpf = (event) => {
    setCpfWithMask(cpfMask(event.target.value));
  };

  const onChangeCell = (event) => {
    setCellWithMask(cellphoneMask(event.target.value));
  };

  const onChangeTell = (event) => {
    setTellWithMask(cellphoneMask(event.target.value));
  };

  function onSubmit(form) {
    if (!validationBeforeCreate()) {
      createNewCliente(form);
    }
  }

  return (
    <div>
      <Header />
      <h1>Criar Cliente</h1>
      <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <Label for="nome">Nome Completo</Label>
            <input
              className="form-control"
              name="nome"
              id="nome"
              ref={register}
              type="text"
              style={
                validationState.nome !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          <div className="col-lg-2 col-sm-4">
            <Label for="cpf">CPF</Label>
            <input
              className="form-control"
              name="cpf"
              id="cpf"
              onChange={onChangeCpf}
              value={cpfWithMask}
              ref={register}
              type="text"
              style={
                validationState.cpf !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          <div className="col-lg-1 col-sm-4">
            <Label for="sexo">Sexo</Label>
            <select
              className="form-control"
              name="sexo"
              id="sexo"
              ref={register}
              style={
                validationState.sexo !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
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
              onChange={onChangeTell}
              value={tellWithMask}
              maxLength="14"
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
              onChange={onChangeCell}
              value={cellWithMask}
              maxLength="15"
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
              style={
                validationState.cep !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
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
              style={
                validationState.logradouro !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
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
              style={
                validationState.bairro !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
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
              style={
                validationState.cidade !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <Label for="uf">Estado</Label>
            <select
              className="form-control"
              name="uf"
              id="uf"
              ref={register}
              style={
                validationState.uf !== undefined
                  ? { border: "1px solid red" }
                  : {}
              }
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
};

export default ClienteForm;
