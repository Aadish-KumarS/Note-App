import Home from "./pages/Home.page"
import { useState } from "react"
import NavBar from "./components/NavBar/NavBar"


function App() {
  const [isSlideMenuActive, setIsSlideMenuActive] = useState(true);

  return (
    <section>
      <NavBar setIsSlideMenuActive={setIsSlideMenuActive} />
      <Home isSlideMenuActive={isSlideMenuActive} />
    </section>
  )
}

export default App
