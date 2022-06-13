import React, {useContext} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../context";

const Navbar = () => {
    const{isAuth,setIsAuth}=useContext(AuthContext);
    const logout=()=>{
        setIsAuth(false);
        sessionStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <MyButton onClick={logout}>Выйти</MyButton>
            <div className="navbar__links">
                <Link to="/posts">Посты </Link>
                <Link to="/about">О сайте</Link>

            </div>
        </div>
    );
};

export default Navbar;