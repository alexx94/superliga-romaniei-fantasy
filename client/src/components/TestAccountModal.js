import React from 'react';

export default function TestAccountModal({ onClose }) {

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative'>
                <h2 className='text-xl font-bold mb-2'>Test Account</h2>
                <p className='mb-4'>Use this account to try the app:</p>
                <ul className="mb-4">
                    <li><strong>Email:</strong> <code>test_user@rofantasy.com</code></li>
                    <li><strong>Password:</strong> <code>parola1234</code></li>
                </ul>
            
                <button
                    onClick={onClose}
                    className='bg-blue-600 text-white px-4 py-2 roudned hover:bg-blue-700 w-full'
                >
                    Got it
                </button>
            </div>
        </div>
    );
};