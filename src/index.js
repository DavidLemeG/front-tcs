import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cliente from './pages/cliente';
import Produto from './pages/produto';
import ClienteForm from './pages/cliente/clienteForm';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/clientes" component={Cliente} />
      <Route path="/clientes-create" component={ClienteForm} />
      <Route path="/clientes-edit" component={ClienteForm} />
      <Route path="/produtos" component={Produto} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
