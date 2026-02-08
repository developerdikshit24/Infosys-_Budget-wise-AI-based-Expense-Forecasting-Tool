import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from "lucide-react";
import Design from '../components/Design.jsx'
import { Link } from "react-router";
import { axiosInstance } from "../connection/axios.js";
const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onBlur' })
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = async (data) => {
        console.log(data);
        const res = await axiosInstance.post('/users/login', data);
        console.log(res);
        reset()
    };


    return (
        <div className="min-h-screen flex bg-gray-100 relative">
            {/* LEFT SIDE */}
            <Design />
            <div className="hidden md:flex w-1/2 text-white items-center justify-center ">
                <div className="z-50 ">
                    <div className="flex gap-2 mb-10">
                        <h1 className="text-4xl font-bold mb-8">BudgetWise</h1>
                        <img className=" bottom-0 right-0 w-20 h-12 z-40 " src="./wallet.png" alt="" srcset="" />
                    </div>
                    <p className="text-4xl opacity-80 mb-2 z-50 font-bold">
                        Track Smart. <br /> Spend Smart. <span className="text-blue-950 shadow text-shadow-white ">Predict Smart.</span>
                    </p>
                    <div className="relative w-full">
                        <img className="opacity-80 rotate-x-12" src="./light-dash.png" alt="" srcset="" />
                        <img className="absolute bottom-0 right-0 w-52" src="./software-agent.png" alt="" srcset="" />

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
                        <div className="text-3xl font-bold font-sans mb-1">Login</div>
                    </div>

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
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters*"
                                }
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            className="w-full h-full outline-none bg-transparent"
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
                        Login
                    </button>

                    {/* Signup Link */}
                    <p className="text-center text-sm">
                        Don't have an account?
                        <Link to={'/signup'} className="text-blue-500 font-medium cursor-pointer ml-1">
                            Signup
                        </Link >
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;
