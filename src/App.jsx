import PrincipalParking from './pages/PrincipalParking'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter> 
    <Routes>
      <Route path='/' element = { <PrincipalParking/>}/>
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
