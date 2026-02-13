import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { authService } from '../appwrite/auth'
import { set, useForm } from 'react-hook-form'


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getcurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate("/");
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div
                    className="mb-2 flex justify-center"
                >
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;  {/* "Don't" uses &apos; for apostrophe, &nbsp; keeps spacing before the Sign Up link */}

                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


                {/* 
                        handleSubmit is provided by react-hook-form.
                        It wraps the login function and handles the entire form submission flow:
                        1. Prevents the default form refresh behavior.
                        2. Collects values from all inputs registered with `register`.
                        3. Runs validation rules on those inputs.
                        4. If validation succeeds, it calls `login` and passes the form data as an object.
                        
                        Example data passed to login:
                        {
                            email: "user@example.com",
                            password: "123456"
                        }
                */}

                <form onSubmit={handleSubmit(login) } className="mt-8">
                    <div className='space-y-5'>
                        <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                {/* register syntax is  {...register("fieldName", { validationRules or options })} }

                    // The `register` function connects this input to React Hook Form.
                    // "email" is the unique key used to store and track this field's value in the form state.
                    // `required: true` ensures the field cannot be left empty.
                    // The `validate` option runs a custom function that checks if the value
                    // matches a valid email pattern. If it fails, the provided error message is shown.

                */}

                <Input
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                    required: true,
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                    },
                    })}
                />

                    <Button 
                        type="submit"
                        className="w-full"
                    >
                        Sign In
                    </Button>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login