import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function Pagination({ currentPage, totalPages, onCurrentPageChange, recordInfo }) {
  // const [currentPage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(0)

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      currentPage = page;
      onCurrentPageChange(currentPage)
    }
  };

const renderPageNumbers = () => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`${currentPage === i ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'relative inline-flex items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
      >
        {i}
      </button>
    );
  }
  return pages;
};
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{recordInfo.from}</span> to <span className="font-medium">{recordInfo.to}</span> of{' '}
            <span className="font-medium">{recordInfo.total}</span> results
          </p>
        </div>
        <div>
          {/* rounded-md shadow-sm */}
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px ">
            <a
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
            </a>
            {renderPageNumbers()}
            <a
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FiChevronRight aria-hidden="true" className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
    )
  }

  // Define propTypes to expect a function for onChildClick
  Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onCurrentPageChange: PropTypes.number,
    recordInfo: PropTypes.object
};