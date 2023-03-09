import React from 'react'
import { Link } from 'react-router-dom'
import EmptyImg from '../assets/img/empty-cart.png';

const cardEmty: React.FC = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Корзина пуста <>😕</></h2>
                    <p>
                        Скоріш за все ви ще не замовляли піццу.<br />
                        Для того щоб, замовити піццу перейдіть на головну сторінку.
                    </p>
                    <img src={EmptyImg} alt="Empty cart" />
                    <Link to="/" className="button button--black">
                        <span>Повернуть назад</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default cardEmty
