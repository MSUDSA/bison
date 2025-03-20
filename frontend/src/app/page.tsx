'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  age: string;
  gender: 'man' | 'woman' | 'other';
  occupation?: string;
  college?: string;
  lifestyle: 'active' | 'not active' | 'sometimes active';
  dob: string;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    gender: 'man',
    occupation: '',
    college: '',
    lifestyle: 'active',
    dob: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    
    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful login/signup
        console.log('Success!');
      }
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
                onChange={(e) => setFormData({...formData, gender: e.target.value as 'man' | 'woman' | 'other'})}
              >
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="other">Other</option>
              </select>

              <select
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
                value={formData.lifestyle}
                onChange={(e) => setFormData({...formData, lifestyle: e.target.value as 'active' | 'not active' | 'sometimes active'})}
              >
                <option value="active">Active</option>
                <option value="not active">Not Active</option>
                <option value="sometimes active">Sometimes Active</option>
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
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900"
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
