/* src/context/index.js */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios'; // Ensure axios is imported
import coverImg from '../images/cover_not_found.jpg';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultTitle, setResultTitle] = useState('');

  const fetchBooks = useCallback(async () => {
    if (searchTerm === '') {
      setBooks([]);
      setResultTitle('Please Enter a Search Term');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${GOOGLE_BOOKS_API_URL}${searchTerm}&maxResults=40`);
      const data = response.data;
      const { items } = data;

      if (items) {
        const newBooks = items.map((book) => {
          const { id, volumeInfo } = book;
          const { title, authors, publishedDate, imageLinks } = volumeInfo;
          // Use larger images if available
          const thumbnail = imageLinks?.extraLarge || imageLinks?.large || imageLinks?.medium || imageLinks?.thumbnail || coverImg;
          return {
            id,
            title,
            authors: authors ? authors.join(', ') : 'Unknown Author',
            publishedDate: publishedDate || 'No publish date available',
            thumbnail,
          };
        });

        setBooks(newBooks);

        if (newBooks.length > 0) {
          setResultTitle('Your Search Result');
        } else {
          setResultTitle('No Search Result Found!');
        }
      } else {
        setBooks([]);
        setResultTitle('No Search Result Found!');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider value={{ loading, books, setSearchTerm, resultTitle, setResultTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
