/* src/App.jsx */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import PrivateRoute from './components/Auth/PrivateRoute';
import SavedBooks from './pages/SavedBooks/SavedBooks'; // Import the SavedBooks component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={currentUser ? <Home /> : <LandingPage />}>
          <Route path="book" element={<PrivateRoute><BookList /></PrivateRoute>} />
          <Route path="book/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
          <Route path="saved-books" element={<PrivateRoute><SavedBooks /></PrivateRoute>} /> {/* Add this line */}
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
