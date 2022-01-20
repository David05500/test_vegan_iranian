import { useEffect, useState, useRef } from 'react';
import App from 'next/app'
import contentfulClient from '../lib/contentful';
import BlogDataContext from '../components/BlogDataContext';
import _ from 'lodash';
import * as gtag from '../lib/gtag';
import Header from '../components/shared/Header';
import '../assets/styles/main.css';

function MyApp(props) {
  const { Component, pageProps, router, data } = props;
  const searchRef = useRef();
  
  const [initialBlogs, setInitialBlogs] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState({query: ""});
  const [isEnglish, setIsEnglish] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [paginatedRecipes, setPaginatedRecipes] = useState(null);

  
  useEffect(() => {
    setInitialBlogs(_.orderBy(data, ['createdAt' ], ['desc']));
    setFilteredBlogs(_.orderBy(data, ['createdAt' ], ['desc']));
  }, []);
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  const updateBlogs = data => {
    let slug = '';
    let hitData = '';
    let newArr = [];
    if (data.length != 0) {
      if(userSearchQuery.query == ""){
        !_.isEqual(filteredBlogs, initialBlogs) ? setFilteredBlogs(_.orderBy(initialBlogs, ['createdAt' ], ['desc'])) : '' ; 
      }else{
        _.map(data, hit => {
          slug = hit.fields.slug["en-US"];
          hitData = _.find(initialBlogs, { 'slug': slug});
          newArr.push(hitData);
        })
        newArr = _.orderBy(newArr, ['createdAt' ], ['desc'])
        if (!_.isEqual(filteredBlogs, newArr) ) {
          setFilteredBlogs(_.orderBy(newArr, ['createdAt' ], ['desc']));
        }
      }
    }
  }

  useEffect(() => {
    if (initialBlogs) setPaginatedRecipes(initialBlogs.slice(0, perPage*page))
  }, [page, initialBlogs]);

  const next = () => setPage(page+1)

  console.log('router.route', router.route)

  if (initialBlogs != {}) {
    return (
      <BlogDataContext.Provider value={{ 
        blogs: initialBlogs, 
        filteredBlogs: filteredBlogs, 
        updateBlogs: updateBlogs, 
        isSearching: isSearching, 
        setIsSearching: setIsSearching,  
        userSearchQuery: userSearchQuery, 
        setUserSearchQuery: setUserSearchQuery,
        isEnglish: isEnglish,
        setIsEnglish: setIsEnglish,
        searchRef: searchRef,
        paginatedRecipes: paginatedRecipes,
        next: next
      }}>
        {router.route !== '/' && <Header />}
        <Component {...pageProps} key={router.route}/>
      </BlogDataContext.Provider>
    )
  } else {
    return (
      <div>Loading..</div>
    )
  }  
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const res = await contentfulClient.getEntries({
    content_type: 'blogPost',
  });
  const data = res.items.map(item => item.fields);
  return { ...appProps, data }
}

export default MyApp;