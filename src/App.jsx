
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import CategoryPage from "./Pages/CategoryPage"
import HumanCheck from "./Components/HumanCheck"
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HumanCheck/>} />
        <Route path='/home' element={<Home/>} />
        <Route path="/category/:path" element={<CategoryPage/>} />
      </Routes>
    </BrowserRouter>
   
    
     
    </>
  )
}

export default App
