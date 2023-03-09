import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort, SortType } from '../redux/slicers/filterSlice';

type TypeList = {
  name: string;
  property: string;
  upOrDown: string;
}

export const list: TypeList[] = [
  { name: 'до популярних', property: 'rating', upOrDown: 'asc' },
  { name: 'від популярних', property: 'rating', upOrDown: 'desc' },
  { name: 'від дешевших', property: 'price', upOrDown: 'asc' },
  { name: 'від дорожчих', property: 'price', upOrDown: 'desc' },
  { name: 'від А до Я', property: 'title', upOrDown: 'asc' },
  { name: 'від Я до А', property: 'title', upOrDown: 'desc' },
];

type SortPopap = {
  sortActive: SortType;
};

const Sort: React.FC<SortPopap> = React.memo(({ sortActive }) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const popap = useRef(null);

  function sorted(obj: TypeList) {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {

    const popapClouse = (e: MouseEvent) => {
      const _event = e as MouseEvent & { path: Node[] };
      if (popap.current && !_event.path.includes(popap.current)) {
        setOpen(false);
      };
    };

    document.body.addEventListener('click', popapClouse);

    return () => document.body.removeEventListener('click', popapClouse);
  }, []);

  return (
    <div ref={popap} className="sort">
      <div className="sort__label">
        <svg
          className={open ? 'svg__active' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b onClick={() => setOpen(!open)}>Сортувати по:</b>
        <span onClick={() => setOpen(!open)}>{sortActive.name ? sortActive.name : 'обрати'}</span>
      </div>
      <div className="sort__popup">
        {
          open && <ul>
            {
              list.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => sorted(obj)}
                  className={sortActive.name === obj.name ? 'active' : ''}>
                  {obj.name}
                </li>
              ))
            }
          </ul>
        }
      </div>
    </div>
  );
})

export default Sort;