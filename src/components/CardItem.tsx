import React from 'react'
import { useDispatch } from 'react-redux';
import { addItem, decrement, removeItem } from '../redux/slicers/cardSlice';

type CardItemProps = {
    id: string;
    title: string;
    price: number;
    count: number;
    imageUrl: string;
    size: number;
    cardId: string;
}

const CardItem: React.FC<CardItemProps> = ({ id, title, price, count, imageUrl, size, cardId }) => {

    const dispatch = useDispatch()
    const plus = () => {
        dispatch(addItem({ id, title, price, count, imageUrl, size, cardId }))
    }
    const minus = () => {
        dispatch(decrement({ cardId, price }))
    }
    const remove = () => {
        dispatch(removeItem({ cardId, price, count }))
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>
                    <svg
                        enableBackground="new 0 0 128 128"
                        height="14px"
                        id="Слой_1"
                        version="1.1"
                        viewBox="0 0 128 128"
                        width="14px"
                        xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M113.1826172,23.8876953l9.3525391-9.3520508l-7.0703125-7.0712891l-9.1982422,9.1987305    C95.03125,6.6201172,80.2197266,0.5,64,0.5C28.9858398,0.5,0.5,28.9858398,0.5,64    c0,16.2197266,6.1201172,31.03125,16.1630859,42.2666016l-9.1987305,9.1982422l7.0712891,7.0703125l9.3520508-9.3525391    C34.831543,122.125,48.7983398,127.5,64,127.5c35.0136719,0,63.5-28.4863281,63.5-63.5    C127.5,48.7983398,122.125,34.831543,113.1826172,23.8876953z M10.5,64c0-29.5,24-53.5,53.5-53.5    c13.4619141,0,25.7695313,5.0087891,35.1826172,13.246582L23.746582,99.1826172C15.5087891,89.7695313,10.5,77.4619141,10.5,64z     M64,117.5c-12.4433594,0-23.8979492-4.2822266-32.9956055-11.4335938l75.0620117-75.0620117    C113.2177734,40.1020508,117.5,51.5566406,117.5,64C117.5,93.5,93.5,117.5,64,117.5z" fill="#373737" /></g></svg>
                    {` ${size}`} см.
                </p>
            </div>
            <div className="cart__item-count">
                <div onClick={minus} className="button button--outline button--circle cart__item-count-minus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E" />
                        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E" />
                    </svg>

                </div>
                <b>{count}</b>
                <div onClick={plus} className="button button--outline button--circle cart__item-count-plus">

                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E" />
                        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E" />
                    </svg>

                </div>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₴</b>
            </div>
            <div onClick={remove} className="cart__item-remove">
                <div className="button button--outline button--circle">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E" />
                        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E" />
                    </svg>

                </div>
            </div>
        </div>
    )
}

export default CardItem
