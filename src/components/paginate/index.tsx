import React from 'react'
import ReactPaginate from 'react-paginate';
import cl from './Paginate.module.scss'

const Paginate: React.FC<{ onChangePage: (page: number) => void; }> = ({ onChangePage }) => {
    return (
        <div>
            <ReactPaginate
                className={cl.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={e => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
            />
        </div>
    )
}

export default Paginate
