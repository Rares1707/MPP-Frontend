import {useContext, useEffect, useState} from 'react';
import {RatingsLineChart} from './RatingsLineChart';
import {BookList} from './BookList';
import {DropdownList} from './DropdownList';
import {Button} from './Button';
import axios from 'axios';
import {GlobalContext} from './Context';
import {Navigate} from 'react-router-dom';
import { io } from 'socket.io-client'
import {BookRepository} from './BookRepository'

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

export function MainPage() {
    const repository = new BookRepository()
    const [bookTitleText, setBookTitleText] = useState('');
    const [bookRatingText, setBookRatingText] = useState('');
    const [bookIdText, setBookIdText] = useState('');
    //const [pageSize, setPageSize] = useState(3);
    //const [currentPage, setCurrentPage] = useState(1)
    const [userCreationDate, setUserCreationDate] = useState('')
    const httpRequestConfiguration = {headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }}
    const MINIMUM_PAGE = 1
    const {list, setList, fetchData, setSelectedBook, bookTitles, bookRatings, pageSize, setPageSize, currentPage, setCurrentPage} = useContext(GlobalContext);

    function configureSocket()
    {
        const URL = sessionStorage.getItem('hostAddress')
        const socket = io(URL, {
            autoConnect: false
        })
        socket.on('refresh', data => {
            try{
                fetchData()
            }
            catch (error){
                console.log(error)
            }
        })
        socket.connect()
    }

    useEffect(() => {
        configureSocket()
        fetchData()
        axios.get(sessionStorage.getItem('hostAddress') + '/userCreationDate', httpRequestConfiguration).then((response) => {
            setUserCreationDate(response.data)
        })
    }, [])

    async function fetchCurrentPage(sortBooksByRating=false){
        repository.getBooks(currentPage, pageSize, sortBooksByRating).then((response) => {
            setList(response)
            setSelectedBook(response[0])
        })
    }

    async function fetchNextPage(sortBooksByRating=false){
        repository.getBooks(currentPage + 1, pageSize, sortBooksByRating).then((response) => {
            setList(response)
            setSelectedBook(response[0])
        })
    }

    async function fetchPreviousPage(sortBooksByRating=false){
        repository.getBooks(currentPage - 1, pageSize, sortBooksByRating).then((response) => {
            setList(response)
            setSelectedBook(response[0])
        })
    }

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
        repository.addBook(newBook).then((response) => {
            console.log(response)
            fetchData()
        })
    }

    async function handleClickRemove() {
        if (list.length === 0) return;
        if (bookIdText === '') return;
        if (bookIdText.valueOf() < 0) return;

        repository.removeBook(bookIdText).then((response) => {
            console.log(response)
            fetchData()
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

        repository.updateBook(bookIdText, {
            title: bookTitleText,
            rating: bookRatingText
        }).then((response) => {
            console.log(response)
            fetchData()
        })

    }

    function handleClickSort()// this is weird now. Look in the backend. It probably only sorts the current page
    {
        fetchCurrentPage(true)
    }

    function handleClickPreviousPage()
    {
        if (currentPage > 1) {
            fetchPreviousPage()
            setCurrentPage(currentPage - 1)
        }
    }

    function handleClickNextPage()
    {
        console.log('first' + currentPage)
        //if (pageSize*(currentPage+1) < list.length)
        //    setCurrentPage(currentPage+1)
        fetchNextPage()
        setCurrentPage(currentPage + 1)
    }

    function changePageSize(newPageSize)
    {
        setPageSize(newPageSize)
        setCurrentPage(MINIMUM_PAGE)
        fetchPageOfSize(MINIMUM_PAGE, newPageSize)
    }

    function fetchPageOfSize(page, pageSize)
    {
        repository.getBooks(page, pageSize).then((response) => {
            setList(response)
            setSelectedBook(response[0])
        })
    }

    if (sessionStorage.getItem("access_token") === null) {
        return (
            <Navigate to="/" />
        );
    }
    return (
        <header className='App-header'>
            <section>
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
            <DropdownList changePageSize={changePageSize}/>
        </header>
    );
}
