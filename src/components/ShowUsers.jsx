import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, filteredGender, showAllUsers } from '../Features/userInfoSlice';
import Popup from './Popup';
import PopupForm from './PopupForm';

function ShowUsers() {
    const [showPopUp, setShowPopUp] = useState(false)
    const [formPopUp, setFormPopUp] = useState(false)
    const [seletedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch();
    const { users, loading , filteredUser} = useSelector((state) => state.app);

    console.log("FilteredUser : ",filteredUser)

    const [filterGender,setFilter] = useState('all')

    function onFilterChange(e) {
        const selectedGender = e.target.value;
        setFilter(selectedGender);
        dispatch(filteredGender(selectedGender));
    }
    
    useEffect(() => {
        dispatch(showAllUsers());
    }, [dispatch]);

    function removeUser(id) {
        dispatch(deleteUser(id))
    }

    function openPopUp(user) {
        setSelectedUser(user)
        setShowPopUp(true)
    }

    function closePopUp() {
        setShowPopUp(false)
        setSelectedUser(null)
    }

    function openForm(user) {
        setSelectedUser(user)
        setFormPopUp(true)
    }

    function closeForm() {
        setSelectedUser(null)
        setFormPopUp(false)
    }

    return (
        <>
            <div className='flex flex-col spacey-2 p-5' >
                <label 
                className='mb-4'
                htmlFor="gender">Filter user by gender</label>
                <div className='flex gap-4'>
                    <input
                        id='all'
                        onChange={onFilterChange}
                        name='filter'
                        value='all'
                        checked={filterGender === 'all'}
                        type="radio" />
                    <label htmlFor="all">All</label>
                    <input
                        id='male'
                        onChange={onFilterChange}
                        name='filter'
                        value='male'
                        checked={filterGender === 'male'}
                        type="radio" />
                    <label htmlFor="male">Male</label>
                    <input
                        id='female'
                        onChange={onFilterChange}
                        name='filter'
                        checked={filterGender === 'female'}
                        value='female'
                        type="radio" />
                    <label htmlFor="female">Female</label>
                </div>
            </div>
            <div className='w-full flex flex-wrap gap-6 p-6'>
                {
                    loading ? <p className='w-full text-center text-lg font-semibold'>Loading....</p> :
                        filteredUser.length == 0 ? <p>No user</p> : filteredUser.map((user) => (
                            <div key={user.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <div className='bg-white rounded-lg shadow-lg overflow-hidden h-72 flex flex-col'>
                                    <div className='p-6 flex flex-col'>
                                        <center className='text-2xl font-semibold text-gray-900 mb-3'>{user.name}</center>
                                        <div className='flex-grow'>
                                            <p className='text-gray-700 mb-2'>Email: {user.email}</p>
                                            <p className='text-gray-700'>Gender: {user.gender}</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-100 p-4 flex justify-around'>
                                        <button
                                            onClick={() => openPopUp(user)}
                                            className='bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'>View</button>
                                        <button
                                            onClick={() => openForm(user)}
                                            className='bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-300'>Edit</button>
                                        <button
                                            onClick={() => removeUser(user.id)}
                                            className='bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
                {showPopUp && <Popup user={seletedUser} closePopUp={closePopUp} />}
                {formPopUp && <PopupForm id={seletedUser.id} user={seletedUser} closeForm={closeForm} />}
            </div>
        </>
    );
}

export default ShowUsers;
