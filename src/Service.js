import {useContext, useEffect, useState} from 'react';
import {RatingsLineChart} from './RatingsLineChart';
import {BookList} from './BookList';
import {DropdownList} from './DropdownList';
import {Button} from './Button';
import Axios from 'axios';
import axios from 'axios';
import async from 'async';
import {GlobalContext} from './Context';
import {CheckConnection} from './CheckConnection';

function TextBox({state, onChange, placeholder}) {
    return (
        <input
            type='text'
            placeholder={placeholder}
            value={state}
            onChange={onChange}
        />
    );
}

export function Service() {
    const [bookTitleText, setBookTitleText] = useState('');
    const [bookRatingText, setBookRatingText] = useState('');
    const [bookIdText, setBookIdText] = useState('');
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(0)

    const {list, fetchData, setSelectedBook, bookTitles, bookRatings} = useContext(GlobalContext);

    async function handleClickAdd()  {
        if (bookTitleText === '') return;
        if (bookRatingText === '') return;
        if (bookRatingText.valueOf() < 0) return;
        if (isNaN(parseFloat(bookRatingText))) return;

        const newBook = {
            title: bookTitleText,
            rating: bookRatingText,
            id: bookIdText
        };
        await axios.post(`http://localhost:5000/books/nothing`, {
            title: newBook.title,
            rating: newBook.rating,
            id: newBook.id
        }).then((response) => {
            console.log(response)
            fetchData()
        });
    }

    async function handleClickRemove() {
        if (list.length === 0) return;
        if (bookIdText === '') return;
        if (bookIdText.valueOf() < 0) return;

        await axios.delete(`http://localhost:5000/book/${bookIdText}`).then((response) => {
            console.log(response)
            fetchData();
        })
        if (list.length <= pageSize*currentPage)
            handleClickPreviousPage()
    }

    async function handleClickUpdate() {
        if (list.length === 0) return;
        if (bookIdText === '') return;
        if (bookIdText.valueOf() < 0) return;
        if (bookTitleText === '') return;
        if (bookRatingText === '') return;
        if (bookRatingText.valueOf() < 0) return;

        await axios.put(`http://localhost:5000/book/${bookIdText}`, {
            title: bookTitleText,
            rating: bookRatingText
        }).then((response) => {
            console.log(response)
            fetchData();
        })
    }

    function handleClickSort()
    {
        axios.get(`http://localhost:5000/books/sorted`).then((response) => {
            console.log(response.data);
            fetchData()
        })
    }

    function handleClickPreviousPage()
    {
        if (currentPage > 0)
            setCurrentPage(currentPage-1)
    }

    function handleClickNextPage()
    {
        if (pageSize*(currentPage+1) < list.length)
            setCurrentPage(currentPage+1)
    }

    return (
        <header className='App-header'>
            <section>
                <BookList list={list} setSelectedBook={setSelectedBook} pageSize={pageSize} currentPage={currentPage}/>
                <Button onClick={handleClickPreviousPage} prompt={'<<'}/>
                <Button onClick={handleClickNextPage} prompt={'>>'}/>
            </section>

            <section>
                <RatingsLineChart
                    bookTitles={bookTitles}
                    bookRatings={bookRatings}
                />
                <TextBox
                    state={bookTitleText}
                    onChange={(e) => setBookTitleText(e.target.value)}
                    placeholder='Book name'
                />
                <TextBox
                    state={bookRatingText}
                    onChange={(e) => setBookRatingText(e.target.value)}
                    placeholder='Rating'
                />
                <TextBox
                    state={bookIdText}
                    onChange={(e) => setBookIdText(e.target.value)}
                    placeholder='Id'
                />
            </section>
            <section>
                <Button onClick={handleClickAdd} prompt={'Add'} />
                <Button onClick={handleClickRemove} prompt={'Remove'} />
                <Button onClick={handleClickUpdate} prompt={'Update'} />
                <Button onClick={handleClickSort} prompt={'Sort'} />
            </section>
            <DropdownList setPageSize={setPageSize} setCurrentPage={setCurrentPage}/>
        </header>
    );
}
