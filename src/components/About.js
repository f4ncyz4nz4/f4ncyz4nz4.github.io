import { Container } from "react-bootstrap";

function About(props) {
  return (
    <Container>
      <h1>About Me</h1>
      <p>
        Hey there! I'm Lorenzo, a <strong>double degree student</strong> at{" "}
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
      <p>
        Currently, I'm working on my thesis at the{" "}
        <a
          href="https://software.imdea.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IMDEA Software Institute
        </a>{" "}
        in Madrid.
      </p>
      <p>
        I'm passionate about cybersecurity, especially{" "}
        <strong>malware analysis</strong> and <strong>binary reversing</strong>.
      </p>
      <p>
        When I'm not diving into code, you can find me indulging in various
        sports. Join me on this captivating journey as we unravel the mysteries
        of cybersecurity and make the digital world safer.
      </p>
      <p>Let's stay curious and vigilant together!</p>
      <p>
        <a href="/docs/LorenzoIppolito.vcf" download>
          [vCard]
        </a>
      </p>
      <h2>Experience</h2>
      <ul className="list-centered" id="education-list">
        <li>
          <strong>Researcher</strong>, IMDEA Software Institute, 6 months intern
        </li>
        <li>
          <strong>Penetration Tester</strong>, Shielder, 3 months intern
        </li>
        {/* <li>[Job Title], [Company Name], [Employment Dates]</li> */}
      </ul>
      <h2>Education</h2>
      <ul className="list-centered" id="education-list">
        <li>
          <strong>Master's degree</strong>, Digital Security, Eurecom, April
          2024
        </li>
        <li>
          <strong>Master's degree</strong>, Computer Engineering, Politecnico di
          Torino, April 2024
        </li>
        <li>
          <strong>Bachelor's degree</strong>, Computer Engineering, Politecnico
          di Torino, Jul 2021, <em>110 cum laude</em>
        </li>
      </ul>
    </Container>
  );
}

export default About;
