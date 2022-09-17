import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UserList from "./pages/user/UserList";
import RegisterForm from "./pages/auth/RegisterForm";
import Home from "./pages/Home.jsx";
import LoginForm from "./pages/auth/LoginForm.jsx";
import UserDashboard from "./pages/dashbord/UserDashbord";
import BookList from "./pages/book/BookList";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"}>
                  <Route index element={<Navigate to={"/home"} replace/>}/>
                  <Route path={"/home"} element={<Home/>}/>
                  <Route path={"users"} element={<UserList/>}/>
                  <Route path={"register"} element={<RegisterForm/>}/>
                  <Route path={"login"} element={<LoginForm/>}/>
                  <Route path={"/user/dashboard"} element={<UserDashboard/>}/>
                  <Route path={"/book/list"} element={<BookList/>}/>
              </Route>
          </Routes>
      </BrowserRouter>

  </React.StrictMode>
)
