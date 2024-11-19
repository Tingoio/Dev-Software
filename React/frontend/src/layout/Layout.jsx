import React from "react";
import Header from "./header";
import Nav from "./nav";
import '../App.css';

function Layout(props) {
  return (
   <>
    <Header/>
    <Nav/>
    <main>{props.children}</main>
   </>
  );
}
export default Layout;
