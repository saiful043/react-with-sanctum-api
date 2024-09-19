
import { Outlet } from "react-router-dom";
import Sidebar from "./Global/Sidebar";
import Header from "./Global/Header";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
    const {user} = useContext(AppContext)
    useEffect(() => {
      if(!user) {
        window.location.href = '/';
      }
    },[]);
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="w-full">
                <Header/>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
        </>
    )
}