import { Link } from "react-router-dom";
export default function Pagination() {
    return (
        <>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 text-xl text-black dark:text-white py-10">
            Roles
        </h2>
        <nav className="pr-0">
            <ol className="flex items-center gap-2 text-gray-400 font-normal">
            <li>
                <Link  to="/">
                Dashboard /
                </Link>
            </li>
            <li className="font-sm text-sky-600">Roles</li>
            </ol>
        </nav>
        
        </div>
        
        </>
    )
}