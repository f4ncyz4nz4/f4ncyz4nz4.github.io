import { Nav, Navbar, Container } from "react-bootstrap";

function Header(props) {
  return (
    <Navbar>
      <Container className="header">
        <Nav className="nav">
          <Nav.Link href="/#" className="underline">
            /home
          </Nav.Link>
          <Nav.Link href="/#/about" className="underline">
            /about
          </Nav.Link>
          <Nav.Link href="/#/cv" className="underline">
            /cv
          </Nav.Link>
          {/* <Nav.Link href="/#/publications" className="underline">
            /publications
          </Nav.Link> */}
          <Nav.Link href="/#/ctfs" className="underline">
            /ctfs
          </Nav.Link>
          <Nav.Link href="/#/map" className="underline">
            /map
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
