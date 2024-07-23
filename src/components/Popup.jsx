import React from 'react';

function Popup({ user, closePopUp }) {
    const { name, email, gender, age } = user;

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center transition-opacity duration-300'>
            <div className='bg-white rounded-lg shadow-lg w-80 p-6 max-w-sm transition-transform duration-300 transform'>
                <button
                    onClick={closePopUp}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl'
                >
                    &times;
                </button>
                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>{name}</h2>
                <div className='text-gray-700'>
                    <p className='mb-3'><strong>Email:</strong> {email}</p>
                    <p className='mb-3'><strong>Gender:</strong> {gender}</p>
                    <p className='mb-3'><strong>Age:</strong> {age}</p>
                </div>
            </div>
        </div>
    );
}

export default Popup;