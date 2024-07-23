import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../Features/userInfoSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [user, setUser] = useState({ name: '', email: '', age: '', gender: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onValueChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!user.name || !user.email || !user.age || !user.gender) {
            alert('Please fill all fields.');
            return;
        }
        dispatch(createUser(user));
        navigate('/');
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className='w-1/2 mx-auto p-5 rounded-lg border bg-slate-50 mt-5 shadow-sm flex flex-col gap-2'
            >
                <label>Name</label>
                <input
                    name='name'
                    className='p-2 border rounded-lg'
                    placeholder='User name'
                    type="text"
                    onChange={onValueChange}
                />
                <label>Email Address</label>
                <input
                    name='email'
                    className='p-2 border rounded-lg'
                    placeholder='User email'
                    type="email"
                    onChange={onValueChange}
                />
                <label>Age</label>
                <input
                    name='age'
                    className='p-2 border rounded-lg'
                    placeholder='User age'
                    type="number"
                    onChange={onValueChange}
                />
                <label>Gender</label>
                <div className='flex gap-3'>
                    <input
                        id='gender-male'
                        name='gender'
                        value='male'
                        type="radio"
                        onChange={onValueChange}
                    />
                    <label className='cursor-pointer' htmlFor="gender-male">Male</label>
                    <input
                        id='gender-female'
                        name='gender'
                        value='female'
                        type="radio"
                        onChange={onValueChange}
                    />
                    <label className='cursor-pointer' htmlFor="gender-female">Female</label>
                </div>
                <button className='bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 p-2 mt-3'>
                    Create user
                </button>
            </form>
        </div>
    );
}

export default CreateUser;
