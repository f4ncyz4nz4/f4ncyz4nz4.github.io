import { Container } from "react-bootstrap";
import ImageZoom from "react-image-zooom";

function Map(props) {
  const imageUrl = "/Countries.png";
  return (
    <Container>
      <h1>My world</h1>
      <ImageZoom
        // src="%PUBLIC_URL%/Countries.png"
        src={imageUrl}
        alt="My world"
        height="720"
        zoom="350"
      />
    </Container>
  );
}

export default Map;
