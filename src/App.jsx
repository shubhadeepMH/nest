
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import CategoryPage from "./Pages/CategoryPage"
import HumanCheck from "./Components/HumanCheck"
import AdminPanel from "./Pages/AdminPanel"
import SpecialCategoryPage from "./Pages/SpecialCategoryPage"
import Feed from "./Pages/Feed"
import PostPage from "./Pages/PostPage"
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<Navigate to="/feed" />} />
        <Route path='/feed' element={<Feed/>} />
        <Route path='/post/:uid' element={<PostPage/>} />
        <Route path='/boards' element={<Home/>} />
        <Route path="/:path/:boardName" element={<CategoryPage/>} />
        <Route path="/:path/:boardName/admin" element={<AdminPanel/>} />
        <Route path="/special/:path/:boardName" element={<SpecialCategoryPage/>} />
      </Routes>
    </BrowserRouter>
   
    
     
    </>
  )
}

export default App
