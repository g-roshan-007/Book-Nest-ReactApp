/* src/components/SearchForm/SearchForm.jsx */
import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.css';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const { currentUser } = useAuth();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Register to search for books...", {
        toastId: 'searchToast'
      });
      return;
    }
    let tempSearchTerm = searchText.current.value.trim();
    if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
      setSearchTerm("the lost world");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(searchText.current.value);
    }
    navigate("/home/book");
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input type='text' className='form-control' placeholder='Search for books...' ref={searchText} />
              <button type='submit' className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-purple' size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
