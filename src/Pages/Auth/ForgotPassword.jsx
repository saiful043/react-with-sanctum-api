import { useState } from "react"; // useContext, 
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../../Context/AppContext";
import { AiOutlineOpenAI } from "react-icons/ai";


export default function ForgotPassword() {
    // const {setToken} = useContext(AppContext)
    // const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [messages, setMessages] = useState({})

    async function handleForgotPassword(e) {
        e.preventDefault();
        const res =await fetch("/api/forgot_password",{
            method: "post",
            body: JSON.stringify(formData)
        });
        const data = await res.json()
        console.log(data)

        if(data.errors) {
            setErrors(data.errors)
        } else {
            // localStorage.setItem("token", data.token)
            // setToken(data.token)
            setMessages(data.message)
            // navigate("/reset-password")
            // console.log(data);
        }
        
    }

    return (
        <>
        <div className="h-screen  mx-auto space-y-6 pt-10 bg-zinc-100">
        <div className="w-1/4 mx-auto pt-10 pb-20 mt-20 bg-zinc-50 shadow-md">
            <div className="flex justify-center text-sky-700 ">
                <div><AiOutlineOpenAI className="text-8xl"/></div>
            </div>
            {Object.keys(messages).length === 0 &&<h1 className="title text-sky-700">Forgot Password</h1>}
            {Object.keys(messages).length >0 && <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md m-20" role="alert">
            <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                {/* <p className="font-bold">{messages.message}</p> */}
                <p className="text-sm">{messages}</p>
                </div>
            </div>
            </div>}
            {Object.keys(messages).length === 0 && <form onSubmit={handleForgotPassword} className="space-y-6 px-10">
                <div>
                    <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})} />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>
                <div><a className="text-sm text-sky-700" href="/">Back to Login</a></div>
                <button className="primary-btn bg-sky-700">Forgot Password</button>
            </form>
            }
        </div>
       
        </div>
        
        </>
    );
}