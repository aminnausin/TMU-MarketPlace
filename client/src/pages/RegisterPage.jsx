import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../authAndContext/contextApi'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function RegisterPage() {

    const {registerNewAccount, user} = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const registerAttempt = async () => {
        const response = await registerNewAccount('email', 'passwoird12324');
        alert(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        let invalid = {};

        const username = form.get("username")

        const email = form.get("email");
        if (email && !email.endsWith("@torontomu.ca")) {
            invalid.email = "Must use student email with domain @torontomu.ca";
        }

        const password = form.get("password")
        if (form.get("password") !== form.get("confirm-password")) {
            invalid.confirm = "Passwords do not match";
        }

        if (Object.keys(invalid).length > 0) {
            setErrors(invalid);
        } else {
            // console.log(Array.from(form.entries()));
            setErrors({});
            const [data, error] = await registerNewAccount(email, password, username);
             
            // console.log(data);
            // console.log(error);
            if(! error && data.success == true) {
                toast.success(`Successfully registered as ${email}`);
                navigate('/');
            }
            else{
                toast.error(`Unable to register. ${error.error.message ?? 'Unknown reason.'}`)
            }
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate('/');
        }
    }, [user])

    return (
        <section className='flex justify-center items-center h-[100vh] bg-neutral-100'>
            <form onSubmit={handleSubmit} className='flex bg-amber-50 shadow-lg rounded-xl border-2 border-amber-200 w-[70%] sm:w-[55%] md:w-[45%] lg:w-[35%] p-8 flex-wrap space-y-4 justify-center'>
                <h2 className='w-full text-xl text-center'>Logo</h2>
                <section className='w-full space-y-2'>
                    <div className='flex flex-row space-x-[6%] w-[90%]'>
                        <div className='flex-col w-[47%]'>
                            <label htmlFor={"first-name"} className={"block mb-2 text-sm font-medium text-gray-900"}>First Name <span className='text-neutral-400 text-xs'>(Letters Only)</span></label>
                            <input  type="text" name="first-name"
                                className={" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                                placeholder="Enter First Name" required pattern='[A-Za-z]+' minLength={2}>
                            </input>
                            {errors.username && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.username}</div>}
                        </div>
                        <div className='flex-col w-[47%]'>
                            <label htmlFor={"last-name"} className={"block mb-2 text-sm font-medium text-gray-900"}>Last Name <span className='text-neutral-400 text-xs'>(Letters Only)</span></label>
                            <input  type="text" name="last-name"
                                className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                                placeholder="Enter Last Name" required pattern='[A-Za-z]+' minLength={2}>
                            </input>
                            {errors.username && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.username}</div>}
                        </div>
                    </div>
                    <div className='flex-col w-[90%]'>
                        <label htmlFor={"student-num"} className={"block mb-2 text-sm font-medium text-gray-900"}>Student Number <span className='text-neutral-400 text-xs'>(9 digits)</span></label>
                        <input  type="text" name="student-num"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                            placeholder="Enter Student Number" required pattern='[0-9]{9}' minLength={9} maxLength={9}>
                        </input>
                        {errors.username && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.username}</div>}
                    </div>
                    <div className='flex-col w-[90%]'>
                        <label htmlFor={"username"} className={"block mb-2 text-sm font-medium text-gray-900"}>Username <span className='text-neutral-400 text-xs'>(No spaces)</span></label>
                        <input  type="text" name="username"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                            placeholder="Enter username" required pattern='[A-Za-z0-9]{4,16}' minLength={4} maxLength={16}>
                        </input>
                        {errors.username && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.username}</div>}
                    </div>
                    <div className='flex-col w-[90%]'>
                        <label htmlFor={"email"} className={"block mb-2 text-sm font-medium text-gray-900"}>Email <span className='text-neutral-400 text-xs'>(Must use TMU Email)</span></label>
                        <input  type="email" name="email"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                            placeholder="name@torontomu.ca" required>
                        </input>
                        {errors.email && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.email}</div>} 
                    </div>
                    <div className='flex flex-row space-x-[6%] w-[90%]'>
                        <div className='flex-col w-[47%]'>
                            <label htmlFor={"password"} className={"block mb-2 text-sm font-medium text-gray-900"}>Password</label>
                            <input  type="password" name="password"
                                className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                                placeholder="Enter password" required minLength={6}>
                            </input>
                            {errors.password && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.password}</div>}
                        </div>
                        <div className='flex-col w-[47%]'>
                            <label htmlFor={"confirm-password"} className={"block mb-2 text-sm font-medium text-gray-900"}>Confirm Password</label>
                            <input  type="password" name="confirm-password"
                                className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"} 
                                placeholder="Re-enter password" required minLength={6}>
                            </input>
                            {errors.confirm && <div className={"mb-2 text-sm font-medium text-red-600"}>{errors.confirm}</div>}
                        </div>
                    </div>
                </section>
                <section className='flex flex-col space-y-3'>
                    <button className={" bg-sky-500 rounded w-32 shadow hover:bg-sky-600 text-white py-2"} type='submit'>Register</button>
                    <Link to={'/login'} className='hover:underline'>{'Already registered?'}</Link>
                </section>
            </form>
        </section>
    )
}
