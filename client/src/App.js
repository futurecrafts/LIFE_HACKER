import React, { useEffect, useState } from "react";
import { BrowserRouter, createPath, Route, Routes } from "react-router-dom";
import axios from "./utils/axios"
import './App.css';
import { Home, Login, Register, Dashboard, Chat, TextToImage, AI_Image, ThreeSkyBox, ThreeSkyBoxPortal } from './pages';
import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";

function App() {
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const params = new URLSearchParams();
      params.append('token', localStorage.getItem('token'));
      (async () => {
        const response = await axios.post('/api/accesstoken', params);
        console.log(response?.data);
        if (response.status === 200) {
          console.log("accesstoken is vaild.")
        } else{
          localStorage.clear();
        }
      })().catch((error) => {
        console.log(error);
        localStorage.clear();
      }).finally(() => {
        console.log("useEffect End");
        setLoading(true);
      });
    } else {
      setLoading(true);
    }
  }, []);

  if(loading){
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<PublicRoute restricted={true}><Home /></PublicRoute>}></Route>
            <Route path="/api/login" element={<PublicRoute restricted={true}><Login /></PublicRoute>}></Route>
            <Route path="/api/register" element={<PublicRoute restricted={true}><Register /></PublicRoute>}></Route>
            <Route path="/api/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
            <Route path="/api/chat" element={<PrivateRoute><Chat /></PrivateRoute>}></Route>
            <Route path="/api/texttoimage" element={<PrivateRoute><TextToImage /></PrivateRoute>}></Route>
            <Route path="/api/aiimage" element={<PrivateRoute><AI_Image /></PrivateRoute>}></Route>
            <Route path="/api/skybox" element={<PrivateRoute><ThreeSkyBox /></PrivateRoute>}></Route>
            <Route path="/api/skyboxportal" element={<PrivateRoute><ThreeSkyBoxPortal /></PrivateRoute>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <div>Loading.....</div>
    )
  }
}

export default App;