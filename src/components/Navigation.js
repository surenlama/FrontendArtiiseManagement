import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../static/logo.jpeg";
import "../App.css";
import { useNavigate } from 'react-router-dom';

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';


const Navigation = () => {
const [token, setToken, removeToken] = useCookies(['mytoken']);
const navigate = useNavigate();

const logoutBtn = () => {
  console.log('mytoken', token['mytoken']);
  removeToken('mytoken'); // Update the argument to match the cookie name
};

useEffect(()=>{
  if(!token['mytoken']){
    navigate('/');
  }
},[token])
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="app-logo" href="#home">
          <img
            alt=""
            src={logo}
            width="40"
            height="50"
            className="d-inline-block align-center"
          />{" "}
          Artist Management System
        <button  onClick={logoutBtn} className="btn btn-primary">Logout</button>
        </Navbar.Brand>
      </Navbar>
      <div className="sidebar">
        <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Navigation
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              {/* <NavLink exact to="/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink> */}
               <NavLink exact to="/musicmanage" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                   Musics
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/users" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Users List</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/manage" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  Manage Users
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/artistmanage" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  Manage Artist
                </CDBSidebarMenuItem>
              </NavLink>
             
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{ padding: "20px 5px" }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};
export default Navigation;
