import {useEffect, useState,useContext } from "react";
import { AppContext } from "../../Context/AppContext";
// import { Link } from "react-router-dom";
import Sidebar from "../Global/Sidebar";
import Header from "../Global/Header";
import { BiEdit, BiShow, BiTrash} from "react-icons/bi";

export default function Roles() {
    const {token} = useContext(AppContext)
    const [roles, setRoles] = useState([])
    const [tblHeaders, setTblHeaders] = useState([])
    async function getRoles(){
        const res = await fetch('/api/roles',{
            method: "get",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        if(res.status == 200) {
            const headers = data.length > 0 ? Object.keys(data[0]) : [];
            setTblHeaders(headers)
            setRoles(data)
        }
    }
    useEffect(() => {
        getRoles();
    },[]);
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="w-full">
                <Header/>
              <div className="container mx-auto">
                    <h1 className="title">Roles </h1>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {tblHeaders.map((header, index) => (
                                    index !=0 && <th key={index} scope="col" className="px-6 py-3">{header}</th>
                                ))}
                                <th scope="col" className="px-6 py-3">
                                Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {roles.length > 0 ? roles.map(role => (
                        <tr key={role.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b">
                        {/* <td className="px-6 py-4">{role.id}</td> */}
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{role.name}</th>
                        <td className="px-6 py-4">{role.description}</td>
                        <td className="px-6 py-4">{role.created_at.split("T")[0]}</td>
                        <td className="px-6 py-4">{role.updated_at.split("T")[0]}</td>
                        <td className="px-6 py-4 flex justify-center border-none"><a href="#"><BiEdit className="mx-2" /></a> <a href="#"><BiShow className="mx-2" /></a><a href="#"> <BiTrash className="mx-2 text-red-600" /></a></td>
                        </tr>
                    )) : <p> There is no roles</p>}
                        </tbody>
                    </table>
                    </div>
            </div>
        </div>
        </>
    );
}