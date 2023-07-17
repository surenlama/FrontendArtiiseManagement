import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../static/download.png";
import artistIcon from "../static/artist.png";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { BsMusicNoteBeamed } from "react-icons/bs";
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

  useEffect(() => {
    if (!token['mytoken']) {
      navigate('/');
    }
  }, [token])

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ display: "flex", justifyContent: "space-between", paddingRight: "60px" }}>
        <Navbar.Brand className="app-logo" href="#home">
          <img
            alt=""
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-center"
          />{" "}
                            <span>&nbsp;&nbsp;</span>
                            <span>&nbsp;&nbsp;</span>
                            <span>&nbsp;&nbsp;</span>

          Artist Management System
        </Navbar.Brand>
        <button onClick={logoutBtn} className="btn btn-primary mr-3">Logout</button>
      </Navbar>
      <div className="sidebar">
        <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Navigation
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/musicmanage" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <BsMusicNoteBeamed />
                  <span>&nbsp;&nbsp;</span>
                  <span>&nbsp;&nbsp;</span>
                  <span>&nbsp;&nbsp;</span>
                  Manage Musics
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
                <CDBSidebarMenuItem>
                  <img src={artistIcon} alt="Artist Icon" style={{ width: "20px", height: "20px" }} />
                  <span>&nbsp;&nbsp;</span>
                  <span>&nbsp;&nbsp;</span>
                  <span>&nbsp;&nbsp;</span>
                  Manage Artist
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default Navigation;
