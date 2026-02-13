import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router";
import { registerUserThunk } from '../stores/auth.js'
import { useDispatch, useSelector } from "react-redux";
import Desgin from "../components/Design.jsx";


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedUser } = useSelector(state => state.authentication)
    const { handleSubmit, reset, register, formState: { errors } } = useForm({ mode: 'onBlur' });
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = async (data) => { 
        dispatch(registerUserThunk(data))
        reset()
    };


    useEffect(() => {
        if (loggedUser) {
            navigate('/')
            reset()
        }
    }, [loggedUser])
    

    return (
        <div className="min-h-screen flex bg-gray-100 relative">
            {/* LEFT SIDE */}
            <Desgin/>
            <div className="hidden md:flex w-1/2 text-white items-center justify-center ">
                <div className="z-50 ">
                    <div className="flex gap-2 mb-10">
                        <h1 className="text-4xl font-bold mb-8">BudgetWise</h1>
                        <img className=" bottom-0 right-0 w-20 h-12 z-40 " src="./wallet.png" alt="" />
                    </div>
                    <p className="text-4xl opacity-80 mb-2 z-50 font-bold">
                        Track Smart. <br /> Spend Smart. <span className="text-blue-950 shadow text-shadow-white ">Predict Smart.</span>
                    </p>
                    <div className="relative w-full">
                        <img className="opacity-80 rotate-x-12" src="./light-dash.png" alt="" />
                        <img className="absolute bottom-0 right-0 w-52" src="./software-agent.png" alt="" />

                    </div>
                </div>

            </div>

            {/* RIGHT SIDE FORM */}
            <div className="flex w-full md:w-1/2 items-center justify-center  p-6">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 bg-white/70 p-8 z-100 w-md rounded-2xl shadow-lg"
                >
                    <div className="flex gap-3 items-center mb-4 ">
                        <div className="w-1 h-8 bg-violet-800 rounded-full">

                        </div>
                        <div className="text-3xl font-bold font-sans mb-1">Sign up</div>
                    </div>

                    {/* Full Name */}
                    <label className="font-semibold text-gray-800">Full Name</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-3 focus-within:border-blue-500 transition">

                        <input
                            {...register('name', { required: "FullName is required" })}
                            placeholder="Enter your Full Name"
                            className="w-full h-full outline-none bg-transparent"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}

                    {/* Email */}
                    <label className="font-semibold text-gray-800">Email</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-3 focus-within:border-blue-500 transition">

                        <input
                            {...register('email', {
                                required: "Email is Required*", pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                            name="email"
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full h-full outline-none bg-transparent"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}

                    {/* Password */}
                    <label className="font-semibold text-gray-800">Password</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-3 focus-within:border-blue-500 transition">

                        <input
                            name="password"
                            {...register('password', {
                                required: "Password is required*",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters*"
                                }
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            className="w-full h-full outline-none bg-transparent"
                            alt="current-password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-blue-800 text-white h-12 rounded-lg mt-4 font-bold hover:bg-blue-950 transition"
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm">
                        Have an account?
                        <Link className="text-blue-500 font-medium cursor-pointer ml-1" to={'/login'}>
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Signup;
