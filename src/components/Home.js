import { Container } from "react-bootstrap";

function Home(props) {
  return (
    <Container>
      <div>
        <h1>
          <span className="orange-text">f4ncyz4nz4</span>@
          <span className="blu-text">oneiros</span>:~$
          <span className="cursor">_</span>
          {/* <span className="cursor">█</span> */}
        </h1>
      </div>
      <div id="app" className="container"></div>
      <div>
        My name is Lorenzo, but everyone calls me <em>ippo</em>.
        <br />
        I'm a
        <strong>
          <em>Cyber Security Analyst</em>
        </strong>
        .
        <br />
        <br />
        <div>Find me online:</div>
        <ul className="list-centered">
          <li>
            Email: lorenzoippolito <em>dot</em> 99 <em>at</em> gmail{" "}
            <em>dot</em> com
            <br />
            <br />
          </li>
          <li>
            <a href="https://linkedin.com/in/lorenzo-ippolito">LinkedIn</a>
            <br />
            <br />
          </li>
          <li>
            <a href="https://github.com/f4ncyz4nz4">GitHub</a>
            <br />
            <br />
          </li>
          <li>
            <a href="https://twitter.com/Ippo_99">Twitter</a>
            <br />
            <br />
          </li>
          <li>
            <a href="https://scholar">Google Scholar</a>
            <br />
            <br />
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default Home;
