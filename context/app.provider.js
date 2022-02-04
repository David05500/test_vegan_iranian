import React, { useRef } from "react"
import reducer from './app.reducer'
import { Provider } from '../components/AppDataContext'
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
// import * as gtag from '../lib/gtag';

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
        if ((data.length !== searchSuggestions.length) && data !== undefined) {
            dispatch({ type: "UPDATE_VALUE", key: searchSuggestions, value: data })
        }

        data.forEach(suggestion => {
            if (!_.find(searchSuggestions, { 'slug': suggestion.fields.slug["en-US"] })) isEqual = false
            if (!isEqual) return dispatch({ type: "UPDATE_VALUE", key: searchSuggestions, value: data })
        })
    }

    React.useEffect(() => {
        if (initialRecipes) {
            dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value: _.orderBy(initialRecipes, ['createdAt'], ['desc']) })
        }
    }, [initialRecipes]);

    // React.useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         gtag.pageview(url)
    //     }
    //     router.events.on('routeChangeComplete', handleRouteChange)
    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange)
    //     }
    // }, [router.events])

    React.useEffect(() => {
        let arr = []
        arr = initialRecipes && initialRecipes.filter(recipe => {
            if ((recipe && recipe.title.toUpperCase().includes(userSearchQuery.query ? userSearchQuery.query.toUpperCase() : userSearchQuery.query))
                || (recipe.course && recipe.course.toUpperCase().includes(userSearchQuery.query ? userSearchQuery.query.toUpperCase() : userSearchQuery.query))) return recipe
        })
        if (!arr || arr.length === 0) {
            arr = initialRecipes && initialRecipes.filter(recipe => {
                const title = recipe.title ? recipe.title.split(" ").map(name => name.toUpperCase()) : []
                const course = recipe.course ? recipe.course.split(" ").map(name => name.toUpperCase()) : []
                const searchQuery = userSearchQuery.query ? userSearchQuery.query.split(" ").map(name => name.toUpperCase()) : []
                let isPresent = []
                searchQuery && searchQuery.map(item => {
                    if (title.includes(item) || course.includes(item)) isPresent.push(true)
                })
                if (isPresent.length > 0) return recipe
            })
        }
        if (arr && arr.length > 0) dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value: _.orderBy(arr, ['createdAt'], ['desc']) })
    }, [userSearchQuery])

    React.useEffect(() => {
        if (router.query.filter) {
            dispatch({ type: "UPDATE_VALUE", key: "userSearchQuery", value: { query: router.query.filter } })
            const newArr = _.map(searchSuggestions, hit => {
                const slug = hit.fields.slug["en-US"]
                return _.find(initialRecipes, { 'slug': slug })
            })
            dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value: newArr })
        } else {
            dispatch({ type: "UPDATE_VALUE", key: "userSearchQuery", value: { query: router.query.filter } })
            dispatch({ type: "UPDATE_VALUE", key: "filteredRecipes", value: _.orderBy(initialRecipes, ['createdAt'], ['desc']) })
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
                setUserSearchQuery: val => dispatch({ type: "UPDATE_VALUE", key: "userSearchQuery", value: val }),
                setIsEnglish: val => dispatch({ type: "UPDATE_VALUE", key: "isEnglish", value: val })
            }}
        >
            {children}
        </Provider>
    )
}

export default AppProvider