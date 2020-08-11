import { useEffect, useState } from 'react';
import App from 'next/app'
import contentfulClient from '../lib/contentful';
import BlogDataContext from '../components/BlogDataContext';
import _ from 'lodash';

function MyApp(props) {
  const { Component, pageProps, router, data } = props;
  const [initialBlogs, setInitialBlogs] = useState(null)
  const [filteredBlogs, setFilteredBlogs] = useState(null)
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setInitialBlogs(_.orderBy(data, ['createdAt' ], ['desc']));
    setFilteredBlogs(_.orderBy(data, ['createdAt' ], ['desc']));
  }, []);

  const updateBlogs = data => {
    console.log(data);
    if (data && initialBlogs) {
      if (data != [] && data.length != initialBlogs.length && data.length != 0){
        setIsSearching(true);
      }else{
        setIsSearching(false);
      }
    }
    let slug = '';
    let hitData = '';
    let newArr = [];
    if (data.length != 0) {
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

  if (initialBlogs != {}) {
    return (
      <BlogDataContext.Provider value={{ blogs: initialBlogs, filteredBlogs: filteredBlogs, updateBlogs: updateBlogs, isSearching: isSearching, setIsSearching: setIsSearching }}>
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
    limit: 100,
  });
  const data = res.items.map(item => item.fields);
  return { ...appProps, data }
}

export default MyApp;