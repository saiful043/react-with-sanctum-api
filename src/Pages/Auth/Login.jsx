import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { AiOutlineOpenAI } from "react-icons/ai";


export default function Login() {
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    async function handleLogin(e) {
        e.preventDefault();
        const res =await fetch("/api/login",{
            method: "post",
            body: JSON.stringify(formData)
        });
        const data = await res.json()
        // console.log(data)

        if(data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem("token", data.token)
            setToken(data.token)
            navigate("/")
            // console.log(data);
        }
        
    }

    useEffect(() => {
        const storedMessage = localStorage.getItem('successMessage');
        if (storedMessage) {
          setMessage(storedMessage);
          localStorage.removeItem('successMessage'); // Clear the message
        }
      }, []);

    return (
        <>
        <div className="h-screen  mx-auto space-y-6 pt-10 bg-zinc-100">
        <div className="w-1/4 mx-auto pt-10 pb-20  mt-20 bg-zinc-50 shadow-md">
            <div className="flex justify-center text-sky-700 ">
                <div><AiOutlineOpenAI className="text-8xl"/></div>
            </div>
            <h1 className="title text-sky-700">Login to your Account</h1>
            {message && <div className="flex justify-center pb-5"><p className="text-sky-700">{message}</p></div>}
            
            <form onSubmit={handleLogin} className="space-y-6 px-10">
                <div>
                    <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})} />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>
                <div>
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})} />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>
                {/* <div className="flex justify-start">
                    <input type="checkbox" value={formData.remember} onChange={(e) => setFormData({...formData, remember:e.target.value})} />
                    <p className="text-sky-700 text-sm px-2">Remember Me</p>
                </div> */}
                <div><a className="text-sm text-sky-700" href="/forgot-password">Forgot Password?</a></div>
                <button className="primary-btn bg-sky-700">Login</button>
            </form>
        </div>
       
        </div>
        
        </>
    );
}