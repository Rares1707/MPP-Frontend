import {Link} from 'react-router-dom';

export function BookList({list, setSelectedBook}) {
    let listOfBooks = list.map((book) => (
        <li key={book.id}>
            <strong>
                <Link
                    to='/view'
                    onClick={() => {
                        let bookFound = list.find(
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
