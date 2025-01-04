function Publications(props) {
  return (
    <>
      <h1>Publications</h1>
      <ul className="list-centered">
        {/* <li className="title">Title 1</li>
        <div className="authors">Authors</div>
        <div className="conference">
          ACM Asia Conference on Computer and Communications Security (ASIACCS
          2019)
        </div>
        <div className="acceptance">Acceptance rate: ?</div>
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
        <br /> */}
      </ul>
      <h3>Thesis</h3>
      <ul className="list-centered">
        <li className="title">
          <strong>
            A Framework for the Analysis of File Infection Malware
          </strong>
        </li>
        <div className="authors">Lorenzo Ippolito</div>
        <div>
          M.Sc. thesis at Politecnico di Torino, Turin, Italy, April 2024.
        </div>
        <div>Supervisors: Dr. Juan Caballero and Prof. Cataldo Basile.</div>
        <div>
          {/* <a
            href="publications/master_thesis/master_thesis.pdf"
            className="pub_link"
            download="master_thesis.pdf"
          > */}
          <a
            href="https://webthesis.biblio.polito.it/31107/1/tesi.pdf"
            className="pub_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            pdf
          </a>
          <a
            href="publications/master_thesis/master_thesis_presentation.pdf"
            className="pub_link"
            download="master_thesis_presentation.pdf"
          >
            slides
          </a>
          <a
            href="publications/master_thesis/master_thesis.bib"
            className="pub_link"
            download="master_thesis.bib"
          >
            bibtex
          </a>
        </div>
      </ul>
    </>
  );
}

export default Publications;