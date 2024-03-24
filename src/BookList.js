import {Link} from 'react-router-dom';

export function BookList({list, setSelectedBook, pageSize, currentPage}) {
    let displayedBooks = []
    const lowerBound = currentPage*pageSize
    for (let i= 0; (i < pageSize) && (lowerBound + i < list.length); i++)
    {
        displayedBooks.push(list[lowerBound + i])
    }
    let listOfBooks = displayedBooks.map((book) => (
        <li key={book.id}>
            <strong>
                <Link
                    to='/view'
                    onClick={() => {
                        let bookFound = displayedBooks.find(
                            (el) => book.title === el.title,
                        );
                        if (bookFound === undefined)
                            bookFound = {title: 'Sad', id: 7, rating: 3};
                        setSelectedBook(bookFound);
                    }}
                >
                    {book.title}
                </Link>
            </strong>{' '}
            (Rating: {book.rating})
        </li>
    ));
    return <ul>{listOfBooks}</ul>;
}
