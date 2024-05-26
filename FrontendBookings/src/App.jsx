import './App.css'
import { AppRoutes } from './AppRoutes'
import {AuthProvider} from './context/Auth/AuthProvider'
import { HotelProvider } from './context/Hotel/HotelProvider'
function App() {


  return (
    <>
    <AuthProvider>
      <HotelProvider>
        <AppRoutes/>
      </HotelProvider>
    </AuthProvider>
    </>
  )
}

export default App
