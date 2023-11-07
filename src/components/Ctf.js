import { Container } from "react-bootstrap";

function Ctf(props) {
  return (
    <Container>
      <h1>CTFs</h1>
      <div>
        In the world of CTFs I'm known as{" "}
        <span class="f4ncyz4nz4">f4ncyz4nz4</span>.
      </div>
      <div>
        Check out my{" "}
        <a
          href="https://ctftime.org/user/156414"
          target="_blank"
          rel="noopener noreferrer"
        >
          CTFtime
        </a>{" "}
        profile!
      </div>
      <h3>All my teams</h3>
      <ul>
        <li>b4shlyk</li>
        <li>NOPS</li>
        <li>pwnthem0le</li>
      </ul>
      <h3>Participations</h3>
      <ul>
        <li className="title">
          <a
            href="https://ph0wn.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ph0wn CTF
          </a>
        </li>
        <div className="date">2022-12-09</div>
        <div>
          <strong>On-site / Jeopardy</strong>
        </div>
        <div>
          <a
            href="https://github.com/ph0wn/writeups"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write-ups
          </a>
        </div>
        <div>Team name: n00bs</div>
        <div>
          Ranking: <strong>21st</strong>
        </div>
        <br />
        {/* <li className="title">
          <a href="https://official/" target="_blank" rel="noopener noreferrer">
            CTF name
          </a>
        </li>
        <div className="date">2023-11-10</div>
        <div>
          <strong>On-line / Jeopardy</strong>
        </div>
        <div>
          <a href="https://official/" target="_blank" rel="noopener noreferrer">
            Write-ups
          </a>
        </div>
        <div>Rating: 1st</div>
        <br /> */}
      </ul>
    </Container>
  );
}

export default Ctf;
