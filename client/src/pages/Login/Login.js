import React, { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import { login } from '../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import TestAccountModal from '../../components/TestAccountModal';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [showTestModal, setShowTestModal] = useState(false); // for the Test Account alert

  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('seenTestModal');
    if (!hasSeenModal) {
      setShowTestModal(true);
      sessionStorage.setItem('seenTestModal', 'true');
    }
  }, []);

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
    setErrors({});
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = await login(formData);
    if (user === undefined) {
      setErrors({ ...errors, email: 'Invalid email or password' });
      return;
    } else {
      // TODO: Add transition to search page, and also modify search page
      // a little bit to include what the search page is all about and other stuff
      console.log('Login succesful!', user);
      navigate('/search');
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-900">

      {showTestModal && 
        <TestAccountModal 
          onClose={() => setShowTestModal(false)}
        />
      }
      
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