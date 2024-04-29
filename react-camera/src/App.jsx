import styled from "styled-components";
import Webcam from "./components/Webcam/Webcam";

function App() {
  return (
    <Container>
      <Webcam />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  place-items: center;

  width: 100vw;
  height: 100vh;
`;
