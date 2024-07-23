import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../Features/userInfoSlice';

function PopupForm({ id, user, closeForm }) {
    const [userData, setUserData] = useState(user);
    const dispatch = useDispatch();

    function onValueChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(editUser({ id, data: userData }));
        closeForm();
    }

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative'>
                <button
                    onClick={closeForm}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                >
                    &times;
                </button>
                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Edit User Details</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='name' className='block text-gray-700 font-medium mb-1'>Name</label>
                        <input
                            name='name'
                            id='name'
                            type='text'
                            value={userData.name}
                            onChange={onValueChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
                        <input
                            name='email'
                            id='email'
                            type='email'
                            value={userData.email}
                            onChange={onValueChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='age' className='block text-gray-700 font-medium mb-1'>Age</label>
                        <input
                            name='age'
                            id='age'
                            type='number'
                            value={userData.age}
                            onChange={onValueChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-medium mb-1'>Gender</label>
                        <div className='flex gap-4'>
                            <label className='flex items-center'>
                                <input
                                    type='radio'
                                    name='gender'
                                    checked={userData.gender === 'male'}
                                    value='male'
                                    onChange={onValueChange}
                                    className='mr-2'
                                />
                                Male
                            </label>
                            <label className='flex items-center'>
                                <input
                                    type='radio'
                                    name='gender'
                                    checked={userData.gender === 'female'}
                                    value='female'
                                    onChange={onValueChange}
                                    className='mr-2'
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
                    >
                        Update User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupForm;