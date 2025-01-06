import "./App.css";
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Cv from "./components/Cv";
import Publications from "./components/Publications";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import Ctf from "./components/Ctf";

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
          <Route path="posts" element={<Posts />} />
          <Route path="post" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

function Layout() {
  return (
    <Container>
      <Row className="nav">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="body">
        <Col>
          <Outlet />
        </Col>
      </Row>
      <Row className="footer">
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
