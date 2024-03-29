import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";

function StarterPage() {
  return (
    <div className="bg-lila">
      <div className="wrap-container">
        <Container className="wrap">
          <Row>
            <Col>
              <Image
                src="../src/assets/logo.png"
                alt=""
                className="img-wrap"
                rounded
              />
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
      </div>
    </div>
  );
}

export default StarterPage;
