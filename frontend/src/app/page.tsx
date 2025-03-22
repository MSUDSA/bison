"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';

interface FormData {
  name: string;
  password: string;
  email: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  occupation?: string;
  college?: string;
  lifestyle: 'active' | 'not active' | 'sometimes active';
  dob: string;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
    email: '',
    age: '18',
    gender: 'male',
    occupation: '',
    college: '',
    lifestyle: 'active',
    dob: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    isLogin ? handleLogin(formData) : handleSignup(formData);
  };

  const handleLogin = async (formdata: FormData) => {
    try {
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);

      // Set cookie on client side
      Cookies.set('auth_token', data.access_token, { expires: 7, path: '/' });

      console.log("Login successful!");
      router.push('/chat'); // Redirect after login
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignup = async (formdata: FormData) => {
    try {
      const res = await fetch(`http://localhost:8000/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      setIsLogin(true)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Login to your account' : 'Sign up for a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>

              <select
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value as 'male' | 'female' | 'other'})}
              >
                <option value="male">male</option>
                <option value="female">woman</option>
                <option value="other">other</option>
              </select>

              <select
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                value={formData.lifestyle}
                onChange={(e) => setFormData({...formData, lifestyle: e.target.value as 'active' | 'not active' | 'sometimes active'})}
              >
                <option value="active">active</option>
                <option value="not active">not active</option>
                <option value="sometimes active">sometimes active</option>
              </select>

              <input
                type="text"
                placeholder="Occupation (Optional)"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              />

              <input
                type="text"
                placeholder="College (Optional)"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
