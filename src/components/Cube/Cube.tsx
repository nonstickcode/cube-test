import { useState } from 'react'
import './Cube.css'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Generator from '../Generator/Generator'
import PwnedChecker from '../PwnedChecker/PwnedChecker'
import Tester from '../Tester/PasswordStrengthMeter'
import ComingSoon from '../ComingSoon/ComingSoon'

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
      <button className="rotate-btn" onClick={rotateRight}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="cube-container">
        <div className="cube" style={{ transform: `rotateY(${rotation}deg)` }}>
          <div className="cube-face front">
            <Tester />
          </div>
          <div className="cube-face right">
            <PwnedChecker />
          </div>
          <div className="cube-face back">
            <Generator />
          </div>
          <div className="cube-face left">
            <ComingSoon />
          </div>
        </div>
      </div>
      <button className="rotate-btn" onClick={rotateLeft}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

export default Cube
