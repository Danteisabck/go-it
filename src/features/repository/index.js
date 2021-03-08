import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchData } from './repositorySlice';
import RepositoryItem from './RepositoryItem';
import styles from './styles.module.css';
import usePagination from "./usePagination";

export default function Repository() {
    const [searchValue, setSearchValue] = useState("react");
    const data = useSelector(state => state.repository.repositories)
    const loading = useSelector(state => state.repository.loading)
    const dispatch = useDispatch();
    const { itemsPerPage, pagesVisited, pageCount, changePage } = usePagination({ data });

    const handleSearchInput = (e) => {
        setSearchValue(() => {
            dispatch(fetchData(e.target.value));
            return e.target.value;
        });
    }

    useEffect(() => {
        dispatch(fetchData(searchValue));
    } , [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    placeholder={'Search'}
                    onChange={handleSearchInput}
                    type="text"
                />
            </div>
            {data
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map(r => <RepositoryItem item={r} />
            )}
            {!loading && !data.length && <div>
                По Вашому запиту не знайдено жодного репозиторія
            </div>}
            {data.length ? <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                breakLabel={null}
                containerClassName={styles.container}
                pageClassName={styles.page}
                activeLinkClassName={styles.active}
                activeClassName={styles.active}
                previousClassName={styles.previous}
                nextClassName={styles.next}
            /> : null}
        </div>
    )
}