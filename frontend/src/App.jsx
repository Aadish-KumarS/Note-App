import Home from "./pages/Home.page"
import { useState } from "react"
import NavBar from "./components/NavBar/NavBar"
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth page/Register";
import Login from "./pages/auth page/Login";


function App() {
  const [isSlideMenuActive, setIsSlideMenuActive] = useState(true);

  return (
    <section>
      <NavBar setIsSlideMenuActive={setIsSlideMenuActive} />
      <Home isSlideMenuActive={isSlideMenuActive} />
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </section>
  )
}

export default App
