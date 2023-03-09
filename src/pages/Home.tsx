import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFister, SortType } from '../redux/slicers/filterSlice';
import Categories from '../components/Categories';
import Item from '../components/item';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/item/Skeleton';
import Paginate from '../components/paginate';
import { fetchReduxPizza } from '../redux/slicers/itemSlice';
import { RootState, useAppDispatch } from '../redux/store';

type GetItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
}


const Home: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { categoryId, sort, currentPage, searchValueRedux } = useSelector((state: RootState) => state.filter);
    const { items, status } = useSelector((state: RootState) => state.itemSlice);


    const isSearch = useRef(false);
    const isFirstRender = useRef(false);


    const sortProperty = sort.property;
    const sortUpDown = sort.upOrDown;

    const onChangeCurrentPage = (num: number) => {
        dispatch(setCurrentPage(num));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cat = useCallback((id: number) => dispatch(setCategoryId(id)), [])

    const featchPizzas = async () => {

        dispatch(
            fetchReduxPizza({
                currentPage,
                categoryId,
                sortProperty,
                sortUpDown,
                searchValueRedux,
            }))
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const comparison = list.find(obj => obj.property === params.sortProperty);

            dispatch(
                setFister({
                    categoryId: Number(params.categoryId),
                    currentPage: Number(params.currentPage),
                    searchValueRedux: '',
                    sort: comparison ? {
                        name: String(comparison.name),
                        property: String(comparison.property),
                        upOrDown: String(comparison.upOrDown)
                    } : {} as SortType,
                })
            );

            isSearch.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            featchPizzas();
        };

        isSearch.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, searchValueRedux, currentPage, sortProperty, sortUpDown]);

    useEffect(() => {

        if (isFirstRender.current) {
            const queryStryng = qs.stringify({
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty,
                sortUpDown,
                currentPage,
            });

            navigate(`?${queryStryng}`);
        };

        isFirstRender.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, currentPage, sortProperty, sortUpDown]);

    const visibleItems = (status === 'done')
        ? items.map((obj: GetItem) => (
            <Item key={obj.id} {...obj} />
        ))
        : [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} func={cat} />
                <Sort sortActive={sort} />
            </div>
            <h2 className="content__title">Всі піцци</h2>
            {
                (status === 'error')
                    ? <div className='content__error-info'>
                        <h2>Виникла помилка</h2>
                        <p>Спробуйте, будь ласка, пізніше.</p>
                    </div>
                    : <div className="content__items">
                        {visibleItems}
                    </div>
            }
            <Paginate onChangePage={onChangeCurrentPage} />
        </div>
    )
}

export default Home


