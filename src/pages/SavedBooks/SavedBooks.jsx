/* src/pages/SavedBooks/SavedBooks.jsx */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Book from '../../components/Book/Book';
import './SavedBooks.css';
import Loading from '../../components/Loader/Loader';


const SavedBooks = () => {
  const { currentUser } = useAuth();
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      if (!currentUser) return;

      const savedBooksCollection = collection(db, 'users', currentUser.uid, 'savedBooks');
      const savedBooksSnapshot = await getDocs(savedBooksCollection);
      const booksData = savedBooksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedBooks(booksData);
      setLoading(false);
    };

    fetchSavedBooks();
  }, [currentUser]);

  const handleRemoveBook = (id) => {
    setSavedBooks(savedBooks.filter(book => book.id !== id));
  };

  if (loading) return <Loading />;

  return (
    <section className='saved-books'>
      <div className='container'>
        <h2 className='section-title'>Saved Books</h2>
        <div className='booklist-content grid'>
          {savedBooks.length > 0 ? (
            savedBooks.map((book) => (
              <Book key={book.id} {...book} isSavedPage={true} onRemove={handleRemoveBook} />
            ))
          ) : (
            <p>No saved books found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedBooks;
