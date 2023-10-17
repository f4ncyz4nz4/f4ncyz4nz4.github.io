import { Container } from "react-bootstrap";

function Home(props) {
  return (
    <Container>
      <div className="site-title">
        <h1>
          <span className="orange-text">f4ncyz4nz4</span>@
          <span className="blu-text">oneiros</span>:~$
          <span className="cursor">_</span>
          {/* <span className="cursor">█</span> */}
        </h1>
      </div>
      <div id="app" className="container"></div>
      <div>
        My name is Lorenzo, and I'm currently a{" "}
        <strong>
          <em>malware research</em>
        </strong>{" "}
        student.
        <br />
        <br />
        Find me online:
        <ul>
          <li>
            <a href="https://linkedin.com/in/lorenzo-ippolito">LinkedIn</a>
            <br />
            <br />
          </li>
          <li>
            <a href="https://twitter.com/Ippo_99">Twitter</a>
            <br />
            <br />
          </li>
          <li>
            <a href="https://github.com/f4ncyz4nz4">GitHub</a>
            <br />
            <br />
          </li>
          {/* <li>
            <a href="https://">Scholar</a>
            <br />
            <br />
          </li> */}
        </ul>
      </div>
    </Container>
  );
}

export default Home;
