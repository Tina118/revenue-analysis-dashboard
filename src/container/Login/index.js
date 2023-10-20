import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useRevenueAnalysisContext } from 'context'

/**
 * Login
 * Contains the login form with required validations
 */

const Login = () => {
  // Get the navigation function from React Router
  const navigate = useNavigate()

  // Define state variables for email and password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Get the setUserName function from the context
  const { setUserName } = useRevenueAnalysisContext()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.clear()
    }
  }, [])

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Create an object with the email and password from the state
    const formData = { email, password }
    e.preventDefault() // Prevent the default form submission behavior

    //Check if email or password field is not empty
    if (email === '' || password === '') {
      toast.error('Email and password fields cannot be empty.')
      return
    }

    try {
      // Send a POST request to the '/api/login' endpoint with the form data
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Parse the response JSON
      const res = await response.json()

      // Check if the login was successful
      if (res.success) {
        // Display a success toast and reset the email and password fields
        toast.success('Logged In Successfully')
        setEmail('')
        setPassword('')
        setUserName(res.userName)
        navigate('/dashboard') // Redirect to the dashboard page
        // Store the token in the local storage for authentication
        localStorage.setItem(
          'token',
          JSON.stringify({
            token: res.token,
          }),
        )
      } else {
        // Display an error toast if the login was not successful
        toast.error(res.error)
      }
    } catch (error) {
      // Display an error toast for any exceptions
      toast.error(error)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Revenue Analysis Dashboard"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="/register"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              Signup
            </a>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
