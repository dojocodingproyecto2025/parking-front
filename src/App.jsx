import PrincipalParking from './pages/PrincipalParking'
import Success from './pages/Success'
import Canceled from './pages/Canceled'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter> 
    <Routes>
      <Route path='/' element = { <PrincipalParking/>}/>
      <Route path="/success" element ={ <Success />} />
      <Route path="/canceled" element = { <Canceled />} />
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
