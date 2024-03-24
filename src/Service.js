import {useState} from 'react';
import {RatingsLineChart} from './RatingsLineChart';
import {BookList} from './BookList';

function Button({onClick, prompt}) {
    return <button onClick={onClick}>{prompt}</button>;
}

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

export function Service({list, setList, setSelectedBook}) {
    const [bookTitleText, setBookTitleText] = useState('');
    const [bookRatingText, setBookRatingText] = useState('');
    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(0)

    function handleClickAdd() {
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
        setList([...list, newBook]); // Create a new array with the updated book
    }

    function handleClickRemove() {
        if (list.length === 0) return;
        if (bookTitleText === '') return;

        const updatedList = list.filter((book) => book.title !== bookTitleText);
        if (updatedList.length <= pageSize*currentPage)
            handleClickPreviousPage()
        setList(updatedList);
    }

    function handleClickUpdate() {
        if (list.length === 0) return;
        if (bookTitleText === '') return;
        if (bookRatingText === '') return;
        if (bookRatingText.valueOf() < 0) return;
        const updatedList = list.map((book) => {
            if (book.title === bookTitleText)
                return {
                    title: bookTitleText,
                    id: book.id,
                    rating: bookRatingText,
                };
            else return book;
        });
        setList(updatedList);
    }

    function handleClickSort()
    {
        const newList = [...list];
        newList.sort((book1, book2) => book1.rating - book2.rating)
        setList(newList)
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
            </section>
            <section>
                <Button onClick={handleClickAdd} prompt={'Add'} />
                <Button onClick={handleClickRemove} prompt={'Remove'} />
                <Button onClick={handleClickUpdate} prompt={'Update'} />
                <Button onClick={handleClickSort} prompt={'Sort'} />
            </section>
        </header>
    );
}
