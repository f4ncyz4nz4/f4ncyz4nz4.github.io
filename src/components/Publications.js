import { Container } from "react-bootstrap";

function Publications(props) {
  return (
    <Container>
      <h1>Publications</h1>
      <ul>
        <li className="title">Title 1</li>
        <div className="authors">Authors</div>
        <div className="conference">
          ACM Asia Conference on Computer and Communications Security (ASIACCS
          2019)
        </div>
        {/* <div className="acceptance">Acceptance rate: ?</div> */}
        <div>
          <a href="publication/publication1.pdf" className="pub_link">
            pdf
          </a>
          <a href="publication/publication1-slides.pdf" className="pub_link">
            slides
          </a>
          <a href="publication/publication1.bib" className="pub_link">
            bibtex
          </a>
        </div>
        <br />
        {/* <li className="title">Title</li>
        <div className="authors">Authors</div>
        <div className="conference">Conference</div>
        <div>
          <a href="publication/publication1.pdf" className="pub_link">pdf</a>
          <a href="publication/publication1-slides.pdf" className="pub_link">slides</a>
          <a href="publication/publication1.bib" className="pub_link">bibtex</a>
        </div>
        <br /> */}
      </ul>
      <h3>Master's thesis</h3>
      <ul>
        <li className="title">Title 1</li>
        <div className="authors">Authors</div>
        <div className="conference">
          ACM Asia Conference on Computer and Communications Security (ASIACCS
          2019)
        </div>
        {/* <div className="acceptance">Acceptance rate: ?</div> */}
        <div>
          <a href="publication/publication1.pdf" className="pub_link">
            pdf
          </a>
          <a href="publication/publication1-slides.pdf" className="pub_link">
            slides
          </a>
          <a href="publication/publication1.bib" className="pub_link">
            bibtex
          </a>
        </div>
      </ul>
    </Container>
  );
}

export default Publications;
