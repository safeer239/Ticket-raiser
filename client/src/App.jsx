import AdminHome from './Components/AdminHome'
import './App.css';
// import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Signin from './Components/Signin';
import { Toaster } from 'react-hot-toast';
import CreateTicket from './Components/CreateTicket';
import TicketList from './Components/TicketList';


function App() {
  return (
    <div className="App h-dvh">
        <div className="absolute top-0 z-[-2] h-full w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* <NavBar/> */}
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path='/home' element={ <Home/>}/>
        <Route path='/addTicket' element={<CreateTicket/>}/>
        <Route path='/viewTicket' element={<TicketList/>}/>
     
      </Routes>
        <Toaster/>     
      
    </div>
  );
}

export default App;
