import { useEffect, useRef, useState } from "react";
import * as S from "./Webcam.style";

const Webcam = () => {
  const [count, setCount] = useState(3);
  let timerId;

  const camRef = useRef(null);
  const canvasRef = useRef(null);

  const [showCanvas, setShowCanvas] = useState(false);
  const [showCam, setShowCam] = useState(true);

  useEffect(() => {
    getWebcam((stream) => {
      camRef.current.srcObject = stream;
    });
  }, []);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const screenShot = (target) => {
    setShowCanvas(true);
    setShowCam(false);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = camRef.current.videoWidth;
    canvas.height = camRef.current.videoHeight;

    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(camRef.current, 0, 0, canvas.width, canvas.height);

    // 이미지 저장
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "test";
    link.click();

    const s = camRef.current.srcObject;
    s.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const startTimer = () => {
    timerId = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(timerId);
          screenShot();
          return 3;
        }
        return count - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    if (!timerId) {
      setCount(3);
      startTimer();
    }
  };

  return (
    <S.Container>
      <S.WebCam ref={camRef} autoPlay $showCam={showCam} />
      <S.Button onClick={handleClick} $showCam={showCam}>
        {count === 3 ? "촬영" : count}
      </S.Button>
      <S.Canvas ref={canvasRef} $showCanvas={showCanvas} />
    </S.Container>
  );
};

export default Webcam;
