import { Card, CardText, CardTitle } from 'reactstrap';
import './App.css';
import Header from './layout/header/Header';


function App() {

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <div className="form-inline">
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
              <CardTitle tag="h3"><a href="/clientes">Cliente</a></CardTitle>
              <CardText tag="h4"></CardText>
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
              <CardTitle tag="h3"><a href="/produtos">Produtos</a></CardTitle>
              <CardText tag="h4"></CardText>
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
              <CardTitle tag="h3"><a href="/pedidos">Pedidos</a></CardTitle>
              <CardText tag="h4"></CardText>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
