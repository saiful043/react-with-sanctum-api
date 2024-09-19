import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { AiOutlineOpenAI } from "react-icons/ai";


export default function ResetPassword() {
    const {id} = useParams();
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState({})
    // console.log('token',id)
    async function handleResetPassword(e) {
       
        e.preventDefault();
        const res =await fetch(`/api/reset_password/${id}`,{
            method: "post",
            body: JSON.stringify(formData)
        });
        const data = await res.json()
        console.log(data)

        if(data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem("token", data.token)
            setToken(data.token)
            localStorage.setItem('successMessage', 'Password Reset Successfully!');
            navigate("/")
            // console.log(data);
        }
        
    }

    return (
        <>
        <div className="h-screen  mx-auto space-y-6 pt-10 bg-zinc-100">
        <div className="w-1/4 mx-auto pt-10 pb-20  mt-20 bg-zinc-50 shadow-md">
            <div className="flex justify-center text-sky-700 ">
                <div><AiOutlineOpenAI className="text-8xl"/></div>
            </div>
            <h1 className="title text-sky-700">Rest Password</h1>
            <div className="flex justify-center pb-5">{errors.message && <p className="error">{errors.message[0]}</p>}</div>
            <form onSubmit={handleResetPassword} className="space-y-6 px-10">
                <div>
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})} />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>
                <div>
                    <input type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation:e.target.value})} />
                    {errors.password_confirmation && <p className="error">{errors.password_confirmation[0]}</p>}
                </div>
                
                <button className="primary-btn bg-sky-700">Reset Password</button>
            </form>
        </div>
       
        </div>
        
        </>
    );
}