import React, {createContext, useContext, useReducer} from 'react'

export const initialState = {
    page: 1,
    limit: 10,
    queryParams: {
        abv_gt: 0,
        abv_lt: 60,
        ibu_gt: 0,
        ibu_lt: 95,
        ebc_gt: 0,
        ebc_lt: 120,
        // beer_name: null,
        // yeast: null,
        // brewed_before: null,
        // brewed_after: null,
        // hops: null,
        // malt: null,
        // food: null,
        // ids: null,
    }
}

export const pageQueriesReducer = (state, action) => {
    const { type, payload } = action;
    const queryParamsType = type.split('queryParams.')
    if (queryParamsType[1]) return {
        ...state,
        queryParams: {
            ...state.queryParams,
            [queryParamsType[1]]: payload
        }
    }
    return { ...state, [type]: payload }
}


const PageQueriesStateContext = createContext({});
const PageQueriesDispatchContext = createContext({});

export const PageQueriesProvider = ({children}) => {
    const [state,dispatch] = useReducer(pageQueriesReducer,initialState)
    return (
        <PageQueriesStateContext.Provider value={state}>
            <PageQueriesDispatchContext.Provider value={dispatch}>
                {children}
            </PageQueriesDispatchContext.Provider>
        </PageQueriesStateContext.Provider>
    )
}

export const usePageQueriesState = () => {
    const context = useContext(PageQueriesStateContext)
    if (context === undefined) {
        throw new Error('usePageQueriesState must be used within a PageQueriesProvider')
    }
    return context
}

export const usePageQueriesDispatch = () => {
    const context = useContext(PageQueriesDispatchContext)
    if (context === undefined) {
        throw new Error('usePageQueriesDispatch must be used within a PageQueriesProvider')
    }
    return context
}