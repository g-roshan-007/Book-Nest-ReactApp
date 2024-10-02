/* src/components/Book/Book.jsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Book = ({ id, title, publishedDate, thumbnail, isSavedPage, onRemove }) => {
  const { currentUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const sanitizedId = id.replace(/\//g, '_');

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!currentUser) return;
      const docRef = doc(db, 'users', currentUser.uid, 'savedBooks', sanitizedId);
      const docSnap = await getDoc(docRef);
      setIsSaved(docSnap.exists());
    };
    checkSavedStatus();
  }, [currentUser, sanitizedId]);

  const handleSaveBook = async () => {
    if (!currentUser) {
      toast.error('Login to save books');
      return;
    }

    const bookData = { id, title, publishedDate, thumbnail };
    const docRef = doc(db, 'users', currentUser.uid, 'savedBooks', sanitizedId);

    try {
      if (isSaved) {
        await deleteDoc(docRef);
        toast.success('Book removed from saved list');
        onRemove && onRemove(sanitizedId);
      } else {
        await setDoc(docRef, bookData);
        toast.success('Book saved to your list');
      }
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error('Failed to save book');
      console.error('Error saving book: ', error);
    }
  };

  return (
    <div className='book-item flex flex-column flex-sb'>
      <Link to={`/home/book/${id}`} className='book-item-img'>
        <img src={thumbnail} alt='book cover' />
      </Link>
      <div className='book-item-info'>
        <div className='book-item-info-item title'>
          <span>{title}</span>
        </div>
        <div className='book-item-info-item publish-year'>
          <span>{publishedDate}</span>
        </div>
        {!isSavedPage && (
          <button className='save-btn' onClick={handleSaveBook}>
            <FontAwesomeIcon icon={isSaved ? solidBookmark : regularBookmark} />
          </button>
        )}
        {isSavedPage && (
          <button className='delete-btn' onClick={handleSaveBook}>
            <FontAwesomeIcon icon={solidBookmark} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Book;
