// Path: src/components/SingleBook/SingleBook.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleBook.css';

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the book data:', error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>No book details available</div>;
  }

  const { title, authors, description, imageLinks } = book.volumeInfo;

  return (
    <div className='single-book'>
      <h2 className='book-title'>{title}</h2>
      <p className='book-author'>{authors ? authors.join(', ') : 'Unknown Author'}</p>
      <div className='book-img'>
        <img src={imageLinks ? imageLinks.thumbnail : 'default_cover_image_url'} alt={title} />
      </div>
      <p className='book-description'>{description}</p>
    </div>
  );
};

export default SingleBook;
