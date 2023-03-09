import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import cl from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValueRedux } from '../../redux/slicers/filterSlice';

const Search: React.FC = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const clearInput = () => {
        setValue('');
        dispatch(setSearchValueRedux(''));
        inputRef.current?.focus();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const deb = useCallback(
        debounce((value) => {
            dispatch(setSearchValueRedux(value));
        }, 300),
        [])


    return (
        <div className={cl.root}>
            <svg
                className={cl.icon}
                id="Glyph"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">

                <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                    id="XMLID_223_" />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                    deb(e.target.value)
                }}
                className={cl.input}
                placeholder='Пошук...'
                type='text' />
            {
                value && (
                    <svg
                        className={cl.iconremove}
                        onClick={clearInput}
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z" />
                        <path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
                    </svg>
                )
            }
        </div>
    )
}

export default Search
