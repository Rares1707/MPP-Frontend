import './App.css';
import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {View} from './View';
import {Service} from './Service';

let books = [
    {title: 'The Sword of Kaigen', id: 1, rating: 4.8},
    {title: 'Martin Eden', id: 2, rating: 4.7},
    {title: 'The Dark Forest', id: 3, rating: 4.9},
];

function App() {
    const [list, setList] = useState(books);
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
                                setList={setList}
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
