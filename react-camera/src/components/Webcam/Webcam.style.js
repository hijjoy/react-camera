import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 640px;
  height: 480px;
`;

const WebCam = styled.video`
  width: 640px;
  height: 480px;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);

  display: ${(props) => (props.$showCam ? "" : "none")};
`;

const Canvas = styled.canvas`
  display: ${(props) => (props.$showCanvas ? "" : "none")};
`;

const Button = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 5%;
  left: 45%;

  display: grid;
  place-items: center;

  width: 70px;
  height: 70px;
  margin: 10px;
  border-radius: 100px;
  background-color: white;

  cursor: pointer;
  display: ${(props) => (props.$showCam ? "" : "none")};
`;

export { Container, WebCam, Canvas, Button };
