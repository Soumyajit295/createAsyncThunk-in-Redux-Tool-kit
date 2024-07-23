import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { searchUser } from '../Features/userInfoSlice';

function Navbar() {
    const [searchField, setSearchField] = useState('');
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.app);

    function handleForm(e) {
        e.preventDefault();
        dispatch(searchUser(searchField));
        setSearchField('');
    }

    return (
        <div className='w-full p-5 flex justify-between items-center bg-slate-500 shadow-lg text-slate-50'>
            <div className='flex gap-7'>
                <div>
                    <h1 className='text-xl font-semibold'>ReduxToolkit</h1>
                </div>
                <div>
                    <ul className='flex gap-4 text-lg'>
                        <li>
                            <NavLink to='create'>Create users</NavLink>
                        </li>
                        <li>
                            <NavLink to=''>All users ({users.length})</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <form onSubmit={handleForm}>
                    <input
                        onChange={(e) => setSearchField(e.target.value)}
                        type="text"
                        placeholder='Search'
                        className='p-2 rounded-lg border outline-none text-slate-800'
                        value={searchField}
                    />
                </form>
            </div>
        </div>
    );
}

export default Navbar;
