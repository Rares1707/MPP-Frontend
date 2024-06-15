import {useState} from 'react';
import {Button} from './Button';

export function DropdownList({setPageSize, setCurrentPage, fetchCurrentPage}) {
    const [isOpen, setIsOpen] = useState(false);
    function handleClickSelectPageSize(selectedPageSize){
        setPageSize(selectedPageSize);
        setCurrentPage(1);
        setIsOpen(!isOpen);
        fetchCurrentPage();
    }

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Select page size</button>
            {isOpen && (
                <section>
                    <Button
                        prompt={'3'}
                        onClick={() => {handleClickSelectPageSize(3)}}
                    />
                    <br/>
                    <Button
                        prompt={'6'}
                        onClick={() => {handleClickSelectPageSize(6)}}
                    />
                    <br/>
                    <Button
                        prompt={'9'}
                        onClick={() => {handleClickSelectPageSize(9)}}
                    />
                </section>
            )}
        </div>
    );
}
