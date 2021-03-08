import { useState } from "react";

export default function usePagination({ data }) {
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 3;
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return {
        pageCount,
        itemsPerPage,
        pagesVisited,
        changePage
    }
}
