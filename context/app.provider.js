import React, { useRef } from "react"
import reducer from './app.reducer'
import { Provider } from '../components/AppDataContext'
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

const AppProvider = ({ children }) => {
    const [
        {
            initialRecipes,
            filteredRecipes,
            isSearching,
            userSearchQuery,
            isEnglish,
            page,
            perPage,
            paginatedRecipes,
            searchSuggestions,
            searchRef,
            recipesLoading,
        },
        dispatch
    ] = React.useReducer(reducer, {
        initialRecipes: null,
        filteredRecipes: null,
        paginatedRecipes: null,
        searchSuggestions: [],
        isSearching: false,
        userSearchQuery: { query: "" },
        isEnglish: true,
        page: 1,
        perPage: 9,
        searchRef: useRef(),
        recipesLoading: true
    })
    const router = useRouter();
    const updateSearchSuggestions = (data) => {
        let isEqual = true
        if((data.length !== searchSuggestions.length) && data !== undefined) {
            // dispatch({ type: "UPDATE_VALUE", key: searchSuggestions, value: data })
        }

        data.forEach(suggestion => {
            if (!_.find(searchSuggestions, { 'slug': suggestion.fields.slug["en-US"] })) isEqual = false
            if(!isEqual) return // dispatch({ type: "UPDATE_VALUE", key: searchSuggestions, value: data })
        })
    }
    React.useEffect(() => {
        if (initialRecipes) {
            dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value: _.orderBy(initialRecipes, ['createdAt'], ['desc']) })
        }
    }, [initialRecipes]);

    React.useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])


    React.useEffect(() => {
        if (router.query.filter) {
            dispatch({ type: "UPDATE_VALUE", key: "userSearchQuery", value:{ query: router.query.filter } })
            const newArr = _.map(searchSuggestions, hit => {
                const slug = hit.fields.slug["en-US"]
                console.log(_.find(initialRecipes, { 'slug': slug }))
                return _.find(initialRecipes, { 'slug': slug })
            })
            console.log('newArr', newArr)
            dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value: newArr })
        } else {
            dispatch({ type: "UPDATE_VALUE", key: "userSearchQuery", value:{ query: router.query.filter } })
            dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value:  _.orderBy(initialRecipes, ['createdAt'], ['desc']) })
        }
    }, [router.query, initialRecipes])

    React.useEffect(() => {
        if (filteredRecipes) {
            dispatch({ type: "UPDATE_VALUE", key: "paginatedRecipes", value: filteredRecipes.slice(0, perPage * page) })
        }
    }, [page, filteredRecipes]);


    return (
        <Provider
            value={{
                initialRecipes,
                filteredRecipes,
                isSearching,
                userSearchQuery,
                isEnglish,
                paginatedRecipes,
                searchSuggestions,
                recipesLoading,
                searchRef,
                page,
                perPage,
                router,
                next: () => dispatch({ type: "UPDATE_VALUE", key: "page", value: page + 1 }),
                updateSearchSuggestions: updateSearchSuggestions,
                setInitialRecipes: val => dispatch({ type: "UPDATE_VALUE", key: "initialRecipes", value: val }),
                setUserSearchQuery: val => dispatch({ type: "UPDATE_VALUE", key: "userSearchQuery", value: val })
            }}
        >
            {children}
        </Provider>
    )
}

export default AppProvider