import { Nav, Navbar } from "react-bootstrap";

function Header(props) {
  return (
    <Navbar>
      <Nav>
        <Nav.Link href="/" className="underline">
          /home
        </Nav.Link>
        <Nav.Link href="/#/about" className="underline">
          /about
        </Nav.Link>
        <Nav.Link href="/#/cv" className="underline">
          /cv
        </Nav.Link>
        <Nav.Link href="/#/publications" className="underline">
          /publications
        </Nav.Link>
        <Nav.Link href="/#/ctfs" className="underline">
          /ctfs
        </Nav.Link>
        <Nav.Link href="/#/posts" className="underline">
          /posts
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
