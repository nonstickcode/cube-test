import React, { useState } from 'react';
import './App.css';
import Cube from './components/Cube/Cube';
import NavBar from './components/NavBar/NavBar';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);

  const navigateTo = (side: 'Tester' | 'PwnedChecker' | 'Generator' | 'ComingSoon'): void => {
    const sideToDegrees: { [key: string]: number } = {
      'Tester': 0, // Front face
      'PwnedChecker': 90, // Right face
      'Generator': 180, // Back face
      'ComingSoon': 270 // Left face
    };
    setRotation(sideToDegrees[side]);
  };

  return (
    <div className="App">
      <NavBar onNavigate={navigateTo} />
      <Cube rotation={rotation} />
    </div>
  );
}

export default App;
