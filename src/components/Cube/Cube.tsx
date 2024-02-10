import { useState } from 'react'
import './Cube.css'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Cube: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0)

  const rotateLeft = (): void => {
    setRotation(rotation - 90)
  }

  const rotateRight = (): void => {
    setRotation(rotation + 90)
  }

  return (
    <div className="cube-wrapper">
      <button className="rotate-left" onClick={rotateLeft}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="cube-container">
        <div className="cube" style={{ transform: `rotateY(${rotation}deg)` }}>
          <div className="cube-face front">Front</div>
          <div className="cube-face right">Right</div>
          <div className="cube-face back">Back</div>
          <div className="cube-face left">Left</div>
        </div>
      </div>
      <button className="rotate-right" onClick={rotateRight}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

export default Cube
