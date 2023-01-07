import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Status from "./pages/Status";
import ProtectedRoute from "./routes/ProtectedRoute";
import Gate from "./pages/setting/Gate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/detail/:id" element={<Detail />} />

                <Route path="/" element={<Status/>} />
                <Route path="/gate" element={<Gate/>} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
