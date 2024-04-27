import './App.scss'
import { SideBar } from './components/SideBar'
import { Simple } from './pages/simple'

function App() {
  return (
    <>
      <SideBar />
      <main className="lg:pl-72">
          <div className="py-10 px-4 sm:px-6 lg:px-8 h-full">
            <Simple />
          </div>
      </main>
    </>
  )
}

export default App
