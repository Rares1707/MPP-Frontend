import {render, screen} from '@testing-library/react';
import {View} from './View';
import {MainPage} from './MainPage';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {useState} from 'react';


jest.mock('react-chartjs-2', () => ({
    Line: () => null
}));



test('test book view', () => {
    render(
        <BrowserRouter>  //this is needed
            <View book={{title: 'The Sword of Kaigen', id: 1, rating: 4.8}}/>
        </BrowserRouter>
    );
    expect(screen.getByText(/back/i)).toBeInTheDocument();
    expect(screen.getByText(/Title: The Sword of Kaigen/i)).toBeInTheDocument();
    expect(screen.getByText(/id: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/rating: 4.8/i)).toBeInTheDocument();
});

test('test service rendering', () => {
    const list = [
        {title: 'The Sword of Kaigen', id: 1, rating: 4.8},
        {title: 'Martin Eden', id: 2, rating: 4.7},
        {title: 'The Dark Forest', id: 3, rating: 4.9},
    ];

    render(
        <BrowserRouter>
            <MainPage list={list}/>
        </BrowserRouter>
    );
    const serviceList = screen.getByRole('list')
    expect(serviceList).toBeInTheDocument()

    //bad design, I should have constants instead of strings for the buttons and text boxes
    expect(screen.getByText(/add/i)).toBeInTheDocument();
    expect(screen.getByText(/remove/i)).toBeInTheDocument()
    expect(screen.getByText(/update/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/book name/i))
    expect(screen.getByPlaceholderText(/rating/i))

    expect(screen.getByText(/the sword of kaigen/i)).toBeInTheDocument()
    expect(screen.getByText('(Rating: 4.8)')).toBeInTheDocument()
    expect(screen.getByText(/martin eden/i)).toBeInTheDocument()
    expect(screen.getByText('(Rating: 4.7)')).toBeInTheDocument()
    expect(screen.getByText(/the dark forest/i)).toBeInTheDocument()
    expect(screen.getByText('(Rating: 4.9)')).toBeInTheDocument()
    expect(screen.getByText(/select page size/i)).toBeInTheDocument()
});

function TestService()
{
    const books  = [
    {title: 'The Sword of Kaigen', id: 1, rating: 4.8},
    {title: 'Martin Eden', id: 2, rating: 4.7},
    {title: 'The Dark Forest', id: 3, rating: 4.9},
    {title: 'Don Quixote', id: 4, rating: 4.8},
    {title: 'Chira Chiralina', id: 5, rating: 4.7},
    {title: 'The Name of the Wind', id: 6, rating: 5},
    {title: 'Mort', id: 7, rating: 4.8},
    {title: 'Rhythm of War', id: 8, rating: 4.7}
    ];

    const [list, setList] = useState(books)
    const [selectedBook, setSelectedBook] = useState(books[0]);

    return(<BrowserRouter>
        <MainPage list={list} setList={setList} setSelectedBook={setSelectedBook}/>
    </BrowserRouter>)
}


test('test remove button', async() => {
    render(
        <TestService/>
    )
    const bookNameTextBox = screen.getByPlaceholderText(/book name/i)
    await userEvent.type(bookNameTextBox, 'Martin Eden')
    expect(bookNameTextBox.value).toBe('Martin Eden')

    await userEvent.click(screen.getByText(/remove/i))
    expect(screen.getAllByRole('listitem').length).toBe(2)
});

test('test add button', async() => {
    render(
        <TestService/>
    )
    const bookNameTextBox = screen.getByPlaceholderText(/book name/i)
    await userEvent.type(bookNameTextBox, 'Martin Edenn')
    await userEvent.type(screen.getByPlaceholderText(/rating/i), '6')
    expect(bookNameTextBox.value).toBe('Martin Edenn')
    expect(screen.getByPlaceholderText(/rating/i).value).toBe('6')

    await userEvent.click(screen.getByText(/add/i))
    expect(screen.getAllByRole('listitem').length).toBe(4)
});

test('test update button', async() => {
    render(
        <TestService/>
    )
    const bookNameTextBox = screen.getByPlaceholderText(/book name/i)
    await userEvent.type(bookNameTextBox, 'Martin Eden')
    await userEvent.type(screen.getByPlaceholderText(/rating/i), '6')
    expect(bookNameTextBox.value).toBe('Martin Eden')
    expect(screen.getByPlaceholderText(/rating/i).value).toBe('6')

    await userEvent.click(screen.getByText(/update/i))
    await userEvent.type(screen.getByPlaceholderText(/rating/i), '')
    expect(screen.getAllByText('(Rating: 6)').length).toBe(1)
});

test('test select page size', async() => {
    render(
        <TestService/>
    )

    expect(screen.getAllByRole('listitem').length).toBe(3)
    await userEvent.click(screen.getByText(/select page size/i))
    await userEvent.click(screen.getByText(/6/i))
    expect(screen.getAllByRole('listitem').length).toBe(6)

});