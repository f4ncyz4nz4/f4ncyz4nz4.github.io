function Ctf(props) {
  return (
    <>
      <h1>CTFs</h1>
      <div>
        In the world of CTFs I'm known as{" "}
        <span>
          <a
            href="https://www.youtube.com/watch?v=J1V2NWb39vE&pp=ygUPYm9pbmcgY2x1YiBkb2dv"
            target="_blank"
            rel="noopener noreferrer"
            className="orange-text"
          >
            f4ncyz4nz4
          </a>
        </span>
        .
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
      {/* <h3>All my teams</h3>
      <ul className="list-centered">
        <li>b4shlyk</li>
        <li>NOPS</li>
        <li>pwnthem0le</li>
      </ul> */}
      <h3>Participations</h3>
      <ul className="list-centered">
        <li className="title">
          <a
            href="https://2023.squarectf.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SquareCTF
          </a>
        </li>
        <div className="date">2023-11-17</div>
        <div>
          <strong>Online / Jeopardy</strong>
        </div>
        <div>
          <s>Write-ups</s>
        </div>
        <div>Team name: b4shlyk</div>
        <div>
          Ranking: <strong>145st</strong>
        </div>
        <br />
        <li className="title">
          <a
            href="https://ph0wn.org/2022/12/09/edition2022.html"
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
          <s>Write-ups</s>
        </div>
        <div>Team name: n00bs</div>
        <div>
          Ranking: <strong>21st</strong>
        </div>
        <br />
      </ul>
    </>
  );
}

export default Ctf;
