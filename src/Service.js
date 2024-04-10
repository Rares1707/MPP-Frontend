import {useEffect, useState} from 'react';
import {RatingsLineChart} from './RatingsLineChart';
import {BookList} from './BookList';
import {DropdownList} from './DropdownList';
import {Button} from './Button';
import Axios from 'axios';
import axios from 'axios';
import async from 'async';

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

export function Service({list, fetchData, setSelectedBook}) {
    const [bookTitleText, setBookTitleText] = useState('');
    const [bookRatingText, setBookRatingText] = useState('');
    const [bookIdText, setBookIdText] = useState('');
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(0)

    async function handleClickAdd()  {
        if (bookTitleText === '') return;
        if (bookRatingText === '') return;
        if (bookRatingText.valueOf() < 0) return;
        if (isNaN(parseFloat(bookRatingText))) return;
        const sortedList = list.sort(
            (oneBook, anotherBook) => oneBook.id < anotherBook.id,
        );
        const newBook = {
            title: bookTitleText,
            id: sortedList[sortedList.length - 1].id + 1,
            rating: bookRatingText,
        };

        axios.post(`http://localhost:5000/books/`, {
            title: newBook.title,
            rating: newBook.rating,
        }).then((response) => {
            //closeModal();
            //navigate(`/game/${response.data.id}/`);
            console.log(response)
            //fetchData()
        });

    }

    function handleClickRemove() {
        if (list.length === 0) return;
        if (bookIdText === '') return;
        if (bookIdText.valueOf() < 0) return;

        axios.delete(`http://localhost:5000/book/${bookIdText}`).then((response) => {
            console.log(response)
            //fetchData();
        })
        //const updatedList = list.filter((book) => book.id !== bookIdText);
        if (list.length <= pageSize*currentPage)
            handleClickPreviousPage()
    }

    function handleClickUpdate() {
        if (list.length === 0) return;
        if (bookIdText === '') return;
        if (bookIdText.valueOf() < 0) return;
        if (bookTitleText === '') return;
        if (bookRatingText === '') return;
        if (bookRatingText.valueOf() < 0) return;

        axios.put(`http://localhost:5000/book/${bookIdText}`, {
            title: bookTitleText,
            rating: bookRatingText
        }).then((response) => {
            console.log(response)
        })

        const updatedList = list.map((book) => {
            if (book.title === bookTitleText)
                return {
                    title: bookTitleText,
                    id: book.id,
                    rating: bookRatingText,
                };
            else return book;
        });
        //fetchData();
    }

    function handleClickSort()
    {
        const newList = [...list];
        newList.sort((book1, book2) => book1.rating - book2.rating)
        //fetchData(newList)
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
                <RatingsLineChart listOfBooks={list}/>
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
