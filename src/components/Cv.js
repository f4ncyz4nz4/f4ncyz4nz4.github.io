import { Container } from "react-bootstrap";

function Cv(props) {
  return (
    <Container>
      <h1>Curriculum Vitae</h1>
      <p>Check out my CV!</p>
      <p>
        <a href="/docs/cv.pdf" download="LorenzoIppolito.pdf">
          Download PDF [english version]
        </a>
      </p>
      <p>
        <a href="/docs/cv_ita.pdf" download="LorenzoIppolito_ita.pdf">
          Download PDF [italian version]
        </a>
      </p>
    </Container>
  );
}

export default Cv;
