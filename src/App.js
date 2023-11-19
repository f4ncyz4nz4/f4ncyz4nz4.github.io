import "./App.css";
import {
  HashRouter,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Cv from "./components/Cv";
import Publications from "./components/Publications";
import NotFound from "./components/NotFound";
import Ctf from "./components/Ctf";
import Map from "./components/Map";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cv" element={<Cv />} />
          <Route path="ctfs" element={<Ctf />} />
          <Route path="publications" element={<Publications />} />
          <Route path="map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

function Layout() {
  const location = useLocation();
  const className = location.pathname === "/map" ? "map" : "body";
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col className={className}>
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
