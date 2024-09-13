import Home from "./pages/Home.page"
import { useState } from "react"
import NavBar from "./components/NavBar/NavBar"
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth page/Register";


function App() {
  const [isSlideMenuActive, setIsSlideMenuActive] = useState(true);

  return (
    <section>
      <NavBar setIsSlideMenuActive={setIsSlideMenuActive} />
      <Home isSlideMenuActive={isSlideMenuActive} />
      <Routes>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </section>
  )
}

export default App
