import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import { GetAllOrders, GetFilteredOrders, GetAllPrices } from "../../services/sellerService";

const Tables = (props) => {
  const { register, handleSubmit, watch } = useForm();

  const [orders, setOrders] = useState([]);
  const [pages, setPages] = useState([]);
  const [sellerPrices, setSellerPrices] = useState({
    seller1: "", 
    seller2: "",
    seller3: "",
  });


  useEffect(() => {
    _getAllOrders();
    _getAllPricesForSeller();
    
  }, []);

  const _getAllOrders = () => {
    GetAllOrders().then(
      (resp) => {
        let data = resp.data.data;

        let actualPages = [];
        for (let i = 1; i <= resp.data.last_page; i++) {
          actualPages.push(i);
        }
        setPages(actualPages);
        setOrders(data);
      },
      (error) => {}
    );
  };

  const _getAllPricesForSeller = () => {
    GetAllPrices().then(
      (resp) => {
        let data = resp.data;

        let totalSeller1 = data.reduce((somaTotal, order) => {
          if(order.seller === "Seller #1" ) {
            somaTotal += order.price
          }
    
         return somaTotal;
       }, 0)

       let totalSeller2 = data.reduce((somaTotal, order) => {
        if(order.seller === "Seller #2" ) {
          somaTotal += order.price
        }
  
       return somaTotal;
     }, 0)

     let totalSeller3 = data.reduce((somaTotal, order) => {
      if(order.seller === "Seller #3" ) {
        somaTotal += order.price
      }

     return somaTotal;
   }, 0)
    
      setSellerPrices({
        seller1: totalSeller1,
        seller2: totalSeller2,
        seller3: totalSeller3,
      });
      },
      (error) => {}
    );
  };

  const find = (form, paginationPages) => {
    let seller = form.seller;
    let country = form.country;
    let page = paginationPages;

    GetFilteredOrders(seller, country, page).then((resp) => {
      let data = resp.data.data;

      let actualPages = [];
      for (let i = 1; i <= resp.data.last_page; i++) {
        actualPages.push(i);
      }
      setPages(actualPages);

      setOrders(data);
    });

  };

  const pagination = ( data ) => {
    let form = watch();
  
    find(form, data);
  }

  return (
    <div>
      <h1>Ordens</h1>
      <form className="form-inline" onSubmit={handleSubmit(find)}>
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <Card
              body
              inverse
              style={{
                height: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#333",
                borderColor: "#333",
              }}
            >
              <CardTitle tag="h3">Total do Sellers #1</CardTitle>
              <CardText tag="h4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sellerPrices.seller1)}</CardText>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-12">
            <Card
              body
              inverse
              style={{
                height: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#333",
                borderColor: "#333",
              }}
            >
              <CardTitle tag="h3">Total do Sellers #2</CardTitle>
              <CardText tag="h4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sellerPrices.seller2)}</CardText>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-12">
            <Card
              body
              inverse
              style={{
                height: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#333",
                borderColor: "#333",
              }}
            >
              <CardTitle tag="h3">Total do Sellers #3</CardTitle>
              <CardText tag="h4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sellerPrices.seller3)}</CardText>
            </Card>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-2 col-sm-12">
            <Label for="seller">Vendedores</Label>
            <select
              className="form-control"
              name="seller"
              id="seller"
              ref={register}
            >
              <option value="">Selecione</option>
              <option value="">Todos os Vendedores</option>
              <option value="1">Somente os Sellers #1</option>
              <option value="2">Somente os Sellers #2</option>
              <option value="3">Somente os Sellers #3</option>
            </select>
          </div>

          <div className="col-lg-2 col-sm-12">
            <Label for="country">Paises</Label>
            <select
              className="form-control"
              name="country"
              id="country"
              ref={register}
            >
              <option value="">Selecione</option>
              <option value="">Todos os Paises</option>
              <option value="bra">Brasil</option>
              <option value="arg">Argentina</option>
              <option value="mex">México</option>
            </select>
          </div>
          <div className="col-lg-2 col-sm-12">
            <Button className="button-form" color="dark" type="submit">
              Enviar
            </Button>
          </div>
        </div>

        <Table className="table-form" striped hover responsive>
          <thead>
            <tr>
              <th>Ordem de Id</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Vendedor</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>{}
            {orders.map((data, index) => (
              <tr className="table-row" key={index}>
                <td>{data.orderId}</td>
                <td>{data.product}</td>
                <td>{data.price}</td>
                <td>{data.seller}</td>
                <td>{data.country}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination aria-label="Page navigation example">
          {pages.map((data, index) => (
          <PaginationItem key={'p-' + index}>
            <PaginationLink style={{cursor: 'pointer', color: '#000'}} href={() => false} onClick={() => pagination(data)}>{data}</PaginationLink>
          </PaginationItem>
          ))}
        </Pagination>
      </form>
    </div>
  );
};

export default Tables;
