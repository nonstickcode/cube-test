import './App.css'
import Cube from './components/Cube/Cube'
import NavBar from './components/NavBar/NavBar'

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Cube />
    </div>
  )
}

export default App
