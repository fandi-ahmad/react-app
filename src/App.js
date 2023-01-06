import React, { useState } from "react";
import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Btn from './components/Btn';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./components/Post";
import Product from "./components/Product";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    const navText = 'fandi ahmad'

    const clicked = () => {
        alert('button di klik')
    }

    const paragraf = () => {
        return (
            <div>
                <i>the paragraf</i>
                <marquee>mantapp</marquee>
            </div>
        )
    }

    const [getNav, setNav] = useState('')

    const traceBtn = () => {
        setNav('my kontak')
    }

    return (
        // <div>
        //     <Navbar text={navText} navValue={getNav} />
        //     <Btn clicked={clicked} />
        //     <Btn clicked={traceBtn} />
        // </div>

        <BrowserRouter>
            <nav>
                <Link to={"/"}>home</Link> | <Link to={"/login"}>login</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/detail/:id"
                    element={
                        <ProtectedRoute>
                            <Detail />
                        </ProtectedRoute>
                    }
                >
                    <Route path={"post"} element={<Post/>} />
                    <Route path={"product"} element={<Product/>} />
                </Route>
                
            </Routes>
        </BrowserRouter>

    );
}

export default App;
