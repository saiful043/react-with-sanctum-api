import { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { AppContext } from "../Context/AppContext";
import axios from 'axios';
import PropTypes from 'prop-types';

export default function RoleForm({ isShowForm, showInfoId, dataSaveInfo }) {
    const { token } = useContext(AppContext)
    const [isDataSave, setIsDataSave] = useState(false)
    const [message, setMessage] = useState('')
    const [fadeOut, setFadeOut] = useState(false);
    const modalRef = useRef(null); // Reference for modal content
    // Trigger the parent's callback function when the button is clicked

    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleClick = () => {
        isShowForm(false);
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('/api/roles/' + showInfoId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            });
            // console.log(response.data)
            if (response.status === 200) {
                setFormData({
                    id: response.data.id,
                    name: response.data.name,
                    description: (response.data.description) ? response.data.description : ''
                });
            }
        } catch (error) {
            console.error('Error submitting the form:', error.response || error);
        }
    }, [showInfoId, token]);

    useEffect(() => {
        if (showInfoId) {
            fetchData()
        }

    }, [showInfoId, token, fetchData]);

    // Handle click outside the modal
    const handleClickOutside = (event) => {
        // Check if click is outside the modal content
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClick();
        }
    };



    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Update the relevant field value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFadeOut(false);
        if (formData.id) {
            try {
                const response = await axios.put('/api/roles/' + formData.id, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                });
                if (response.status === 200) {
                    // setMessage('Role Created Successfully')
                    // setIsDataSave(true)
                    dataSaveInfo({ hideForm: true, dataSave: true, msg: "Role Updated Successfully" })
                    // console.log('Form submitted successfully:', response.data);
                    // You can also reset the form after submission
                    setFormData({ name: '', description: '' });
                    handleClick()
                }

            } catch (error) {
                console.error('Error submitting the form:', error.response || error);
                setFadeOut(false);
                setMessage(error.response.data.message)
                setIsDataSave(true)
                // console.log('Form submitted successfully:', response.data);
                // You can also reset the form after submission
                showMessage()
            }
        } else {
            try {
                const response = await axios.post('/api/roles', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                });
                if (response.status === 201) {
                    // setMessage('Role Created Successfully')
                    // setIsDataSave(true)
                    dataSaveInfo({ hideForm: true, dataSave: true, msg: "Role Created Successfully" })
                    // console.log('Form submitted successfully:', response.data);
                    // You can also reset the form after submission
                    setFormData({ name: '', description: '' });
                    handleClick()
                }

            } catch (error) {
                console.error('Error submitting the form:', error.response || error);
                setFadeOut(false);
                setMessage(error.response.data.message)
                setIsDataSave(true)
                // console.log('Form submitted successfully:', response.data);
                // You can also reset the form after submission
                showMessage()
            }
        }


    };

    function showMessage() {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setIsDataSave(false)
            // Remove alert after animation
        }, 800); // Duration of the fade-out animation (500ms)
        // Cleanup the timer when the component unmounts or when altMessage.msg changes

        return () => clearTimeout(timer);
    }
    return (
        <>
            {/* <!-- Main modal --> */}
            <div id="crud-modal" onClick={handleClickOutside} tabIndex="-1" aria-hidden="true" className={` flex bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full" ref={modalRef}>
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {showInfoId ? 'Update Role' : 'Create New Role'}
                            </h3>
                            <button onClick={handleClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        {isDataSave && <div id="alert-3" className={`alert ${fadeOut ? "fade-out" : ""} mt-2  mx-5 flex items-center p-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div className="ms-3 text-sm">
                                {message}
                            </div>
                            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        }

                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span className="text-red-500 ml-1">*</span></label>
                                    <input value={formData.name} onChange={handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Role name" required={true} />
                                </div>
                                {/* <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Select category</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                        </select>
                    </div> */}
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea onChange={handleChange} value={formData.description} name="description" id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write role description here"></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


// Define propTypes to expect a function for onChildClick
RoleForm.propTypes = {
    isShowForm: PropTypes.func.isRequired,
    dataSaveInfo: PropTypes.func,
    showInfoId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])  // Ensure onChildClick is defined as a function
};