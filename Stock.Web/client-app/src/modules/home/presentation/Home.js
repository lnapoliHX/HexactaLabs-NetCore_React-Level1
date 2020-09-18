import React from "react";
import { Jumbotron, Container} from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-3">Bienvenidos!</h1>
        <p className="lead">
        <Link className="category-list__button" to="/category">
          Ir a Categorias
        </Link>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Home;
