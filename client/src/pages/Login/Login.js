import React, { useState } from 'react';
import InputField from '../../components/InputField';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Sa fac mai modular, sa separ toate astea intr-un fisier separat, utils, helpers, etc.
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) {
      newErrors.email = (
        <>
          Invalid email format (e.g. <span className="italic">email@provider.com</span>)
        </>
      );
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO: CALL API TO LOGIN, FROM BACKEND

    console.log('Submitted:', formData);
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-900">
      <div className="bg-[rgba(0,0,0,0.5)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-accent-color underline">Sign up</a>
        </p>
      </div>
    </div>
  );


};

export default Login;