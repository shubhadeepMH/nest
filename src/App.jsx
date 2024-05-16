
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import CategoryPage from "./Pages/CategoryPage"
import HumanCheck from "./Components/HumanCheck"
import AdminPanel from "./Pages/AdminPanel"
import SpecialCategoryPage from "./Pages/SpecialCategoryPage"
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HumanCheck/>} />
        <Route path='/home' element={<Home/>} />
        <Route path="/:path/:boardName" element={<CategoryPage/>} />
        <Route path="/:path/:boardName/admin" element={<AdminPanel/>} />
        <Route path="/special/:path/:boardName" element={<SpecialCategoryPage/>} />
      </Routes>
    </BrowserRouter>
   
    
     
    </>
  )
}

export default App
