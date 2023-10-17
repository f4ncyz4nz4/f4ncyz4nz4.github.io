import { Container } from "react-bootstrap";

function Cv(props) {
  return (
    <Container>
      <h1>Curriculum Vitae</h1>
      <p>Check out my CV!</p>
      <a href="/docs/cv.pdf" download="LorenzoIppolito.pdf">
        Download PDF
      </a>
    </Container>
  );
}

export default Cv;
