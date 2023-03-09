import React from 'react';

type CategoryProps = {
  value: number;
  func: (index: number) => void;
};

const categories = ['Всі', `М'ясні`, 'Вегетерианські', 'Гриль', 'Гострі', 'Закриті'];

const Categories: React.FC<CategoryProps> = React.memo(({ value, func }) => {


  return (
    <div className="categories">
      <ul>
        {
          categories.map((elem, i) =>
            <li
              key={i}
              onClick={() => func(i)}
              className={value === i ? 'active' : ''}>
              {elem}
            </li>
          )
        }
      </ul>
    </div>
  );
})

export default Categories;