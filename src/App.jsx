import './App.css'
import {Header} from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='bg-[#14161a] text-white min-h-screen'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
