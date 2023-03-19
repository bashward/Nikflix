import Navbar from "./components/Navbar";
import {Route, Routes} from 'react-router-dom'
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Account from "./Pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Store from "./Pages/Store";
import Play from "./Pages/Play";

function App() {
  return (
    <>
    <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute> }/>
        <Route path='/store' element={<ProtectedRoute><Store/></ProtectedRoute>} />
        <Route path='/play' element={<Play />} />
      </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
