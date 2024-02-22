import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './componets/Home';
import Login from './componets/Login';
import About from './componets/About';
import Contact from './componets/Contact';
import Navbar from './componets/Navbar';
import SignUp from './componets/SignUp'
import Main from './componets/Main';
import Addblog from './componets/Addblog';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import ViewPost from './componets/ViewPost';
import Account from './componets/Account';

function App() {

  const{isLoggedIn} = useContext(AuthContext);
  return (
    <div >

       <Navbar/>
       <Routes>
           <Route path="/" element={isLoggedIn ? <Home/>:<Main/>}/>
           <Route path="/Contact" element={<Contact/>}/>
           <Route path="/About" element= {<About/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/SignUp" element={<SignUp/>}/>
           <Route path="/Home" element={<Home/>}/>
           <Route path="/Main" element={<Main/>}/>
           <Route path="/Addblog" element={<Addblog/>}/>
           <Route path="/post/:postId" element={<ViewPost />} />
           <Route path="/Account" element ={<Account/>}/>
       </Routes>

       
    </div>
  );
}

export default App;
