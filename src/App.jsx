import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Showcase } from "./components/Showcase"
import { Footer } from "./components/Footer"
import { Modal } from "./components/Modal"

function App() {
  return (
    <div className='grid grid-rows-[minmax(100vh, auto)] relative'>
        <Modal />
        <Header />
        <Hero />
        <div className="bg-[url('/src/assets/images/dirt.jpg')] bg-cover">
          <Showcase />
          <Footer />
        </div>
    </div>
  )
}

export default App
