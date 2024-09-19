import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Header() {

    const {user, token, setUser, setToken} = useContext(AppContext)
    // const navigate = useNavigate
    async function handleLogout(e) {
        e.preventDefault()
        const res = await fetch('/api/logout',{
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        console.log(data)
        if(res.ok) {
            setUser(null)
            setToken(null)
            localStorage.removeItem('token')
            // console.log('test')
            // navigate('/login2')
            window.location.href = '/login';
        }
    }
    return (
        <>
        <header className="bg-white">
                    <nav>
                        <Link to="/home" className="nav-link">Home</Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
                                <Link to="/create" className="nav-link">New Post</Link>
                                <form  onSubmit={handleLogout}>
                                    <button className="nav-link">Logout</button>
                                </form>
                            </div>
                            ):(
                            <div className="space-x-4">
                                <Link to="/register" className="nav-link">Register</Link>
                                {/* <Link to="/login2" className="nav-link">Login</Link> */}
                            </div>
                        )}
                    </nav>
                </header>
        </>
    )
}