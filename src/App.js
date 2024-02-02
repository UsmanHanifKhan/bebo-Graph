import Graph from "./components/Graph";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from "./components/Header";
function App() {
  return (
    <div className='bg-body-tertiary vh-100'>
      <Header />
      <Graph />
    </div>
  );
}

export default App;
