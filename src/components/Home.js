import { Container } from "react-bootstrap";

function Home(props) {
  return (
    <Container>
      <div className="site-title">
        <h1>
          <span className="orange-text">
            <a
              href="https://www.youtube.com/watch?v=J1V2NWb39vE&pp=ygUPYm9pbmcgY2x1YiBkb2dv"
              target="_blank"
              rel="noopener noreferrer"
            >
              f4ncyz4nz4
            </a>
          </span>
          @<span className="blu-text">oneiros</span>:~$
          <span className="cursor">_</span>
          {/* <span className="cursor">█</span> */}
        </h1>
      </div>
      <div id="app" className="container"></div>
      <div>
        My name is Lorenzo, but everyone calls me <em>ippo</em>.
        <br />
        I'm currently a{" "}
        <strong>
          <em>research student</em>
        </strong>
        .
        <br />
        <br />
        Find me online:
        <ul>
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
