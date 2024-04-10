import './App.css';
import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {View} from './View';
import {Service} from './Service';
import axios from 'axios';
import {useEffect} from 'react';

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
    // useEffect(() => {
    //         async function fetchData() {
    //             await axios.get(`http://localhost:5000/games/?pageOffset=${gamePage * gamesPerPage}&pageSize=${gamesPerPage}`).then((response) => {
    //                 return response.data;
    //             }).then((data) => {
    //                 setGames(data);
    //             });
    //         }
    //         fetchData();
    //     }, [gamePage, gamesPerPage] // Things to listen for.
    // );
    const [list, setList] = useState([]);


    // useEffect(() => {
    //         async function fetchData() {
    //             await Axios.get(`http://localhost:5000/books/`).then((response) => {
    //                 return response.data;
    //             }).then((data) => {
    //                 setList(data);
    //                 console.log(data);
    //             });
    //         }
    //         fetchData();
    //     }, []
    // );

    const fetchData = () => {
        axios.get(`http://localhost:5000/books/`).then((response) => {
            setList(response.data);
            console.log(response.data);
            return response.data;
        })
    }

    fetchData()
    const das = () => {
        console.log(1)

    }
    das()
    const [selectedBook, setSelectedBook] = useState(list[0]);

    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <Service
                                list={list}
                                fetchData={fetchData} //CAREFUL HERE
                                setSelectedBook={setSelectedBook}
                            />
                        }
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
