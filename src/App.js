import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Cv from "./components/Cv";
import { Container, Row, Col } from "react-bootstrap";
import Publications from "./components/Publications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cv" element={<Cv />} />
          {/*<Route path="press" element={<Cv />} />*/}
          <Route path="publications" element={<Publications />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col className="body">
          <Outlet />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
