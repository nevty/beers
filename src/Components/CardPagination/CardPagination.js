import {Pagination} from "antd";
import React from "react";

const CardPagination = ({pageQDispatch,page}) => {
    const pageChange = page => pageQDispatch({ type: 'page', payload: page})
    const sizeChange = (_,limit) => pageQDispatch({type: 'limit', payload: limit})
    return <Pagination current={page} total={235} pageSizeOptions={[10,20,50]}
                       onChange={pageChange} onShowSizeChange={sizeChange}
    />
}

export default CardPagination