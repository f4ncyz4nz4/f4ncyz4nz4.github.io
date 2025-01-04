function About(props) {
  return (
    <>
      <h1>About Me</h1>
      <p>
        Hey there! I'm Lorenzo, a <strong>cyber security analyst</strong> and a
        former <strong>double degree student</strong> at{" "}
        <a
          href="https://www.polito.it/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Politecnico di Torino
        </a>
        , Italy, and{" "}
        <a
          href="https://www.eurecom.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Eurecom
        </a>
        , France.
      </p>
      {/* <p>
        Currently, I'm working
      </p> */}
      <p>
        I'm passionate about cybersecurity, especially{" "}
        <strong>malware analysis</strong> and <strong>binary reversing</strong>.
      </p>
      <p>
        When I'm not diving into code, you can often find me on the mats, honing
        my skills as a dedicated BJJ practitioner. Here, you'll find a
        collection of CTF writeups and detailed malware analysis, reflecting my
        journey through the world of cybersecurity.
      </p>
      <p>Let's make the digital world a safer place!</p>
      {/* <p>
        <a href="" download>
          [vCard]
        </a>
      </p> */}
      <h2>Experience</h2>
      <ul className="list-centered" id="education-list">
        <li>
          <strong>Cyber Security Analyst</strong>,{" "}
          <a
            href="https://fortgale.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fortgale
          </a>
          , now
        </li>
        <li>
          <strong>Security Researcher</strong>,{" "}
          <a
            href="https://software.imdea.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDEA Software Institute
          </a>
          , 6 months intern
        </li>
        <li>
          <strong>Penetration Tester</strong>,{" "}
          <a
            href="https://www.shielder.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shielder
          </a>
          , 3 months intern
        </li>
        {/* <li>[Job Title], [Company Name], [Employment Dates]</li> */}
      </ul>
      <h2>Education</h2>
      <ul className="list-centered" id="education-list">
        <li>
          <strong>Master's degree</strong>, Digital Security, Eurecom, April
          2024
          <br />
          <em></em>
        </li>
        <li>
          <strong>Master's degree</strong>, Computer Engineering, Politecnico di
          Torino, April 2024
          <br />
          <em>110 cum laude</em>
        </li>
        <li>
          <strong>Bachelor's degree</strong>, Computer Engineering, Politecnico
          di Torino, Jul 2021
          <br />
          <em>110 cum laude</em>
        </li>
      </ul>
    </>
  );
}

export default About;
