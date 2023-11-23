import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

/**
 * Registration
 * Contains the registration form with required validations
 */

const Registration = () => {
  // Get the navigation function from React Router
  const navigate = useNavigate()

  // Define state variables for username, email, password, and confirm password
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    cpassword: '',
  })

  //Function to update state variables on change
  const handleChange = (e) =>
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Create an object with the user's information
    const { userName, email, password, cpassword } = form
    const formData = { userName, email, password }
    e.preventDefault() // Prevent the default form submission behavior

    if (userName === '' || email === '') {
      toast.error('Fields Cannot be empty')
      return
    }
    // Check if the password and confirm password match or if both are empty
    if (password !== cpassword || (password === '' && cpassword === '')) {
      toast.error('Password did not match')
      return
    }

    try {
      // Send a POST request to the '/api/signup' endpoint with the form data
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Parse the response JSON
      const res = await response.json()

      // Check if the registration was successful
      if (res.success) {
        // Display a success toast and reset the form fields
        toast.success('User registered successfully')
        setForm({
          userName: '',
          email: '',
          password: '',
          cpassword: '',
        })
        navigate('/') // Redirect to the login page
      } else {
        // Display an error toast if the registration was not successful
        toast.error(res.error)
      }
    } catch (error) {
      // Display an error toast for any exceptions
      toast.error(error)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Revenue Analysis Dashboard"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="/" className="font-medium text-gray-600 hover:text-gray-500">
            Login
          </a>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                value={form.userName}
                onChange={handleChange}
                id="name"
                name="userName"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={form.email}
                onChange={handleChange}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={form.password}
                onChange={handleChange}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={form.cpassword}
                onChange={handleChange}
                id="cpassword"
                name="cpassword"
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
