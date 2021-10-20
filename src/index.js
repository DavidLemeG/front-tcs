import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cliente from './pages/cliente';
import Produto from './pages/produto';
import ClienteForm from './pages/cliente/clienteForm';
import EditClienteForm from './pages/cliente/editClienteForm';
import ProdutoForm from './pages/produto/produtoForm';
import EditProdutoForm from './pages/produto/editProdutoForm';
import Pedido from './pages/pedido';
import PedidoForm from './pages/pedido/pedidoForm';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/pedidos" component={Pedido} />
      <Route path="/pedidos-create" component={PedidoForm} />
      <Route path="/pedidos-view" component={Pedido} />
      <Route path="/clientes" component={Cliente} />
      <Route path="/clientes-create" component={ClienteForm} />
      <Route path="/clientes-edit/:idCliente" component={EditClienteForm} />
      <Route path="/produtos" component={Produto} />
      <Route path="/produtos-create" component={ProdutoForm} />
      <Route path="/produtos-edit/:idProduto" component={EditProdutoForm} />
    </Switch>
<ToastContainer autoClose={4000} />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
