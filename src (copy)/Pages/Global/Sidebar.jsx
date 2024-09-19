import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown, BsFillImageFill,BsReverseLayoutTextSidebarReverse, BsPerson } from "react-icons/bs";
import { AiFillEnvironment, AiOutlineBarChart,AiOutlinePlusCircle, AiOutlineFileText,AiOutlineLogout,AiOutlineMail, AiOutlineSetting } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const Menus = [
        {id: 1, title: "Dashboard", to: "/dashboard"},
        {id: 2,title: "Posts", icon: <AiOutlineFileText/>, to: "/posts"},
        {id: 2,title: "Roles", icon: <AiOutlineFileText/>, to: "/roles"},
        {id: 3,title: "New Posts", icon: <AiOutlinePlusCircle/>, to: "/create"},
        {id: 4,title: "Media", spacing: true, icon: <BsFillImageFill/>},
        {
            id: 5,
            title: "Projects",
            icon: <BsReverseLayoutTextSidebarReverse/>,
            submenu: true,
            submenuItems:[
                {id: 6,title: "Submenu 1"},
                {id: 7,title: "Submenu 2"},
                {id: 8,title: "Submenu 3"},

            ],
        },
        {id: 9,title: "Analytics", icon: <AiOutlineBarChart/>},
        {id: 10,title: "Inbox" , icon: <AiOutlineMail/>},
        {id: 11,title: "Profile", spacing: true, icon: <BsPerson/>},
        {id: 12,title: "Setting" , icon: <AiOutlineSetting/>},
        {id: 13,title: "Logout" , icon: <AiOutlineLogout/>}
    ];

    return (
        <>
        <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"}  relative duration-300`}>
                <BsArrowLeftShort onClick={() => setOpen(!open)} className={`text-dark-purple text-3xl rounded-full absolute -right-3 top-9 bg-white border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}/>
                <div className="inline-flex">
                    <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0" }`}>Tailwind</h1>
                </div>
                <div className={`flex items-center  rounded-full bg-white opacity-30 mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>
                   
                    <BsSearch className={`text-gray-600 text-lg block float-left cursor-pointer ${open && "mr-2"}`}/>
                   
                    <input type={"search"} placeholder="Search" className={`text-base bg-transparent w-full text-gray-400 focus:outline-none  ${!open && "hidden"}`} />
                </div>
                <ul className="pt-2">
                    {Menus.map((menu) =>(
                        <>
                        <Link to={`${menu.to?menu.to:'#'}`} key={menu.id} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-400 rounded-md mt-2 ${menu.spacing ? "mt-9" : "mt-2"}`}>
                            <span className="text-2xl block float-left">{menu.icon ? menu.icon : <RiDashboardFill/> }</span>
                            <span  className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                            {menu.submenu && open && (<BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={() => setSubMenuOpen(!subMenuOpen)}/>)}
                        </Link>
                        {menu.submenu &&  subMenuOpen && open  && (
                            <ul>
                                {menu.submenuItems.map((submenuItem) => (
                                    <Link to={`${submenuItem.to?submenuItem.to:'#'}`} key={submenuItem.id} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md px-5">{submenuItem.title}</Link>
                              ))}
                            </ul>
                        )}
                        </>
                    ))}

                    
                </ul>
            </div>
        </>
    )
}