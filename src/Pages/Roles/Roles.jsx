import { useEffect, useState, useContext, useCallback } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from 'axios';
import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
import PageTitleWithButtons from '../../Component/PageTitleWithButtons';
import Pagination from "../../Component/Pagination";
import Breadcrumb from "../../Component/Breadcrumb";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AlertMessage from "../../Component/AlertMessage";
import ConfirmModal from "../../Component/ConfirmModal";
import RoleForm from "../../Component/RoleForm";
import LoadingIcon from "../../Component/LoadingIcon";


export default function Roles() {
  const { token } = useContext(AppContext)
  const [roles, setRoles] = useState([])
  const [from, setFrom] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [to, setTo] = useState()
  const [total, setTotal] = useState([])
  const [selectedValue, setSelectedValue] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [tblHeaders, setTblHeaders] = useState([])

  const [altMessage, setAltMessage] = useState({});
  const [clickCount, setClickCount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showId, setShowId] = useState()

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  }

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/roles?page=${currentPage}&&per_page=${selectedValue}&&search_text=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status == 200) {
        const headers = response.data.data.length > 0 ? Object.keys(response.data.data[0]) : [];
        setTblHeaders(headers)
        setRoles(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);
        setFrom(response.data.from)
        setTo(response.data.to)
        setTotal(response.data.total)
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, searchTerm, selectedValue]);

  const handleDelete = async (id) => {
    setClickCount((prevCount) => prevCount + 1);
    try {
      const response = await axios.delete(`/api/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status == 200) {
        fetchRoles()
        setAltMessage({ msg: 'Role Deleted Successfully', type: 'error', clickCount: clickCount })
        closeModal();
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

  useEffect(() => {
    fetchRoles(selectedValue);
  }, [selectedValue, searchTerm, fetchRoles, currentPage]);

 

  // Handle the select box change
  const handleSelectChange = (event) => {
    setCurrentPage(1)
    setSelectedValue(event.target.value); // Get the value of the selected option
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (value != '') { setSearchTerm(value) } else { setSearchTerm('') }
    // Filter the data based on the search term
    fetchRoles(selectedValue);
  };
  

  // Function to handle the response from child
  const handleChildForm = (obj) => {
    setClickCount((prevCount) => prevCount + 1);
    // const message = obj.msg
    // if(message != '') {
    setAltMessage({ msg: obj.msg, type: 'success', clickCount: clickCount });
    // console.log('alt', altMessage)
    fetchRoles()
    closeModal()
    // }




    // setAltMessage({msg:'Role Deleted Successfully', type:'error', clickCount:clickCount})

  }
  const handleChildClick = (childData) => {
    setShowForm(childData);
  };

  const handleUpdate = (id) => {
    setShowForm(!showForm)
    setShowId(id)
  }

  const handleClickShowForm = () => {
    setShowForm(!showForm)
    setShowId('')
  }

  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage)
  } 

  

  return (
    <>
      {/* onClick={() => setShowForm(!showForm)} */}
      <Breadcrumb />
      <div className="flex justify-between mb-6">
        <button onClick={handleClickShowForm} type="submit" className="inline-flex h-10 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
          Add new Role
        </button>
        <div className="flex" role="group">
          <PageTitleWithButtons />
        </div>
      </div>
      {altMessage.msg && <AlertMessage altMessage={altMessage} />}
      <div className="flex justify-between  pb-4">
        <div className="w-100">
          <input type="text" value={searchTerm} onChange={handleSearchChange} className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" placeholder="Search..." /></div>
        <div className="flex items-center font-medium">
          <select className="bg-transparent pl-2" value={selectedValue} onChange={handleSelectChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <p className="pl-2 text-black dark:text-white">Entries Per Page</p></div></div>

      {loading ? (
        <p><LoadingIcon /></p>
      ) : (
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #SL
              </th>
              {roles.length > 0 && tblHeaders.map((header, index) => (
                index != 0 && <th key={index} scope="col" className="px-6 py-3">{header}</th>
              ))}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? roles.map((role, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{role.name}</th>
                <td className="px-6 py-4">{role.alias}</td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">{role.created_at.split("T")[0]}</td>
                <td className="px-6 py-4">{role.updated_at.split("T")[0]}</td>
                <td className="px-6 py-4 flex justify-center border-none">
                  <span onClick={() => handleUpdate(role.id)} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"><a href="#"> <BiEdit className="mx-2" /></a> </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><a href="#"><BiShow className="mx-2" /></a></span>
                  <span onClick={() => openModal(role.id)} className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"><a href="#"> <BiTrash className="mx-2 text-red-600" /></a></span>
                </td>
              </tr>
            )) : <tr><td colSpan={5}> There is no roles</td></tr>}
          </tbody>
        </table>
      )}
      {showForm && <RoleForm showInfoId={showId} isShowForm={handleChildClick} dataSaveInfo={handleChildForm} />}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal} // Close modal when "No" is clicked
        onConfirm={handleDelete} // Call API when "Yes" is clicked
        id={selectedId} // Pass the selected id to the modal
      />
     {roles.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onCurrentPageChange={handleCurrentPageChange} recordInfo={{from:from, to:to, total:total}} />}
      

    </>
  );
}