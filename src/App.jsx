import Principal from './pages/Principal.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter> 
    <Routes>
      <Route path='/' element = {<Principal/>}/>
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
