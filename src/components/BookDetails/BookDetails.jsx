/* src/components/BookDetails/BookDetails.jsx */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loader/Loader';
import coverImg from '../../images/cover_not_found.jpg';
import './BookDetails.css';
import { FaArrowLeft } from 'react-icons/fa';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes/';

const BookDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function getBookDetails() {
            try {
                const response = await axios.get(`${GOOGLE_BOOKS_API_URL}${id}`);
                const data = response.data;

                if (data) {
                    const { volumeInfo } = data;
                    const { title, description, authors, publishedDate, imageLinks } = volumeInfo;
                    const coverImage = imageLinks ? imageLinks.thumbnail?.replace('http://', 'https://').replace('&zoom=1', '&zoom=2') : coverImg;
                    const authorNames = authors ? authors.join(', ') : 'Unknown Author';
                    setBook({
                        title,
                        description: description || 'No description available',
                        authors: authorNames,
                        publishedDate: publishedDate || 'No publish date available',
                        cover_img: coverImage,
                    });
                } else {
                    setBook(null);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the book data:', error);
                setLoading(false);
            }
        }
        getBookDetails();
    }, [id]);

    if (loading) return <Loading />;

    if (!book) return <div>No book details available</div>;

    return (
        <section className='book-details'>
            <div className='container'>
                <button type='button' className='flex flex-c back-btn' onClick={() => navigate('/home/book')}>
                    <FaArrowLeft size={22} />
                    <span className='fs-18 fw-6'>Go Back</span>
                </button>

                <div className='book-details-content grid'>
                    <div className='book-details-img'>
                        <img src={book.cover_img} alt='cover img' />
                    </div>
                    <div className='book-details-info'>
                        <div className='book-details-item title'>
                            <span className='fw-6 fs-24'>{book.title}</span>
                        </div>
                        <div className='book-details-item description'>
                            <span>{book.description}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Author(s): </span>
                            <span className='text-italic'>{book.authors}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Published Date: </span>
                            <span className='text-italic'>{book.publishedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDetails;
