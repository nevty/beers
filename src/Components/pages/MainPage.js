import React, {useCallback, useEffect, useRef} from "react";
import {usePageQueriesDispatch, usePageQueriesState} from "../../store/pageQueries";
import {usePrevious} from "../../hooks/usePrevios";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_BEERS} from "../../query/beers";
import {debounce} from "lodash";
import Filter from "../Sider/Filter";
import {Layout, Skeleton, Space} from "antd";
import CardPagination from "../CardPagination/CardPagination";
import BeerCard from "../Beers/BeerCard";

const MainPage = () => {
    const {page, limit, queryParams} = usePageQueriesState()
    const pageQDispatch = usePageQueriesDispatch()
    const prevPaginate = usePrevious({page,limit})
    const [getBeers, {called, loading, error, data}] = useLazyQuery(GET_BEERS)

    const req = useCallback((page, limit, queryParams) => {
        getBeers({ variables: { page, limit, queryParams },
            updateQuery: ({ beers }, { fetchMoreResult }) => fetchMoreResult
        })
    },[])
    const debouncedReq = useRef(debounce((page, limit, queryParams) => {
        req(page, limit, queryParams)
        pageQDispatch({ type: 'page', payload: page})
    }, 500))

    useEffect(()=>{
        if (!called) req(page, limit, queryParams)
        if (prevPaginate) {
            if (prevPaginate.page !== page || prevPaginate.limit !== limit) {
                req(page, limit, queryParams)
            } else debouncedReq.current(1, limit, queryParams)
        }
    },[page, limit, queryParams,req])
    const Loading = new Array(18).fill(null).map((_, index) => <Skeleton.Avatar active size={200} shape="square"/>)
    return (
        <>
            <Filter pageQDispatch={pageQDispatch} queryParams={queryParams}/>
            <Layout>
                <div style={{display: 'flex', flexGrow: 1, justifyContent: 'center', padding: '15px 0 15px 15px'}}>
                    {error && <div>error</div>}
                    {(loading || !data) && <Space align="middle" size={[15,15]} wrap>{Loading}</Space>}
                    {data && <Space align="middle" size={[15,15]} wrap>
                        {data.beers.map(b => <BeerCard beer={b} key={b.id}/>)}
                    </Space>}
                </div>
                <div style={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
                    <CardPagination page={page} limit={limit} pageQDispatch={pageQDispatch}/>
                </div>
            </Layout>
        </>
    )
}

export default MainPage