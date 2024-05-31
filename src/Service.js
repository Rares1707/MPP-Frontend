import {useContext, useEffect, useState} from 'react';
import {RatingsLineChart} from './RatingsLineChart';
import {BookList} from './BookList';
import {DropdownList} from './DropdownList';
import {Button} from './Button';
import axios from 'axios';
import {GlobalContext} from './Context';
import {CheckConnection} from './CheckConnection';
import {Navigate} from 'react-router-dom';

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
    const [userCreationDate, setUserCreationDate] = useState('')
    const httpRequestConfiguration = {headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }}

    const {list, fetchData, setSelectedBook, bookTitles, bookRatings} = useContext(GlobalContext);

    useEffect(() => {
        fetchData()
        axios.get(sessionStorage.getItem('hostAddress') + '/userCreationDate', httpRequestConfiguration).then((response) => {
            setUserCreationDate(response.data)
        })
    }, [])

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
        await axios.post(sessionStorage.getItem('hostAddress') + `/books/nothing`, {
            title: newBook.title,
            rating: newBook.rating,
            id: newBook.id
        }, httpRequestConfiguration).then((response) => {
            console.log(response)
            fetchData()
        });
    }

    async function handleClickRemove() {
        if (list.length === 0) return;
        if (bookIdText === '') return;
        if (bookIdText.valueOf() < 0) return;

        await axios.delete(sessionStorage.getItem('hostAddress') + `/book/${bookIdText}`, httpRequestConfiguration).then((response) => {
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

        await axios.put(sessionStorage.getItem('hostAddress') + `/book/${bookIdText}`, {
            title: bookTitleText,
            rating: bookRatingText
        }, httpRequestConfiguration).then((response) => {
            console.log(response)
            fetchData();
        })
    }

    function handleClickSort()
    {
        fetchData(true)
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

    if (sessionStorage.getItem("access_token") === null) {
        return (
            <Navigate to="/" />
        );
    }
    return (
        <header className='App-header'>
            <section>
                <CheckConnection/>
                <h1>You've been a user since {userCreationDate}</h1>
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
