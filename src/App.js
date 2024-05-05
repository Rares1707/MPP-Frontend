import './App.css';
import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {View} from './View';
import {Service} from './Service';
import axios from 'axios';
import {useEffect} from 'react';
import {GlobalContext} from './Context';

let books = [
    {title: 'The Sword of Kaigen', id: 1, rating: 4.8},
    {title: 'Martin Eden', id: 2, rating: 4.7},
    {title: 'The Dark Forest', id: 3, rating: 4.9},
    {title: 'Don Quixote', id: 4, rating: 4.8},
    {title: 'Chira Chiralina', id: 5, rating: 4.7},
    {title: 'The Name of the Wind', id: 6, rating: 5},
    {title: 'Mort', id: 7, rating: 4.8},
    {title: 'Rhythm of War', id: 8, rating: 4.7}
];

function App() {
    const [list, setList] = useState([]);
    const [selectedBook, setSelectedBook] = useState({title: 'Title', id: 0, rating: 0});
    const [bookTitles, setBookTitles] = useState([]);
    const [bookRatings, setBookRatings] = useState([]);

    async function fetchData(sortBooksByRating=false){
        let getBooksURL = `http://localhost:5000/books/notSorted`
        if (sortBooksByRating){
            getBooksURL = `http://localhost:5000/books/sorted`
        }
        await axios.get(getBooksURL).then((response) => {
            console.log(response.data);
            setList(response.data);
            setSelectedBook(response.data[0])
            return response.data;
        })
        await axios.get(`http://localhost:5000/books/titles`).then((response) => {
            console.log(response.data);
            setBookTitles(response.data);
            return response.data;
        })
        await axios.get(`http://localhost:5000/books/ratings`).then((response) => {
            console.log(response.data);
            setBookRatings(response.data);
            return response.data;
        })
    }

    useEffect(() => {fetchData()}, [])


    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <GlobalContext.Provider value={{list, fetchData, bookTitles, bookRatings, setSelectedBook}}>
                                <Service/>
                            </GlobalContext.Provider>}
                    />
                    <Route
                        path='/view'
                        element={<View book={selectedBook} />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
