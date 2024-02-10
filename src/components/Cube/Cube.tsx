import { useState } from 'react';
import './Cube.css';

const Cube: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);

  const rotateLeft = (): void => {
    setRotation(rotation - 90);
  };

  const rotateRight = (): void => {
    setRotation(rotation + 90);
  };

  return (
    <div className="cube-container">
      <div className="cube" style={{ transform: `rotateY(${rotation}deg)` }}>
        <div className="cube-face front">Front</div>
        <div className="cube-face right">Right</div>
        <div className="cube-face back">Back</div>
        <div className="cube-face left">Left</div>
      </div>
      <button onClick={rotateLeft}>Rotate Left</button>
      <button onClick={rotateRight}>Rotate Right</button>
    </div>
  );
};

export default Cube;
