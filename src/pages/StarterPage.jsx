import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';

function StarterPage() {
  return (
    <Container className="justify-content-md-center">
      <Row>
        <Col>
          <Image src="./src/assets/logo-img.jpg" alt="" className="img-wrap" rounded />
        </Col>
      </Row>

      <Row className="p-3">
        <Col>
          <Link to="/signup">
            <button className="btn-magenta">Sign Up</button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <Link to="/login">
            <button className="btn-magenta">Login</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default StarterPage;
