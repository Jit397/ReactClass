import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
function App() {
  return (
    <div className="App">     
        <Navbar /> 
        <News pageSize={5}/>
    </div>
  );
}

export default App;
