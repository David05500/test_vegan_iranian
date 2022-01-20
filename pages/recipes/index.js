import { useContext, useState, useEffect } from 'react';
import '../../assets/styles/main.css';
import Link from 'next/link';
import _ from 'lodash';
import Header from '../../components/shared/Header';
import Head from 'next/head';
import BlogDataContext from '../../components/BlogDataContext';
import Meta from '../../components/shared/SeoMeta.js';
import { Waypoint } from 'react-waypoint';

const  Index = ( props ) => {
    const { isEnglish, filteredBlogs, paginatedRecipes, next } = useContext(BlogDataContext);
    const [data, setData] = useState([]);
    console.log('paginatedRecipes', paginatedRecipes)
    useEffect(() => {
        if (_.isEmpty(data)){
            setData(paginatedRecipes);
        }else{
            const aremovedDuplicates = _.uniqBy(paginatedRecipes, 'slug');
            setData(aremovedDuplicates);
        }
    }, [paginatedRecipes])

    return (
        <div>
            <Meta 
                title='Iranian Vegan | Recipes' 
                description='A superb collection of fine iranian vegan recipes and history behind each recipe.'
            />
            {data != null ? 
                (<div className='m-auto text-2xl bg-gray-primary'>
                    <div className='max-width-735 px-4 lg:px-0 mx-auto lg:flex lg:flex-wrap mt-10'>
                        {!_.isEmpty(data) ?
                            _.map(data, blog => {
                                if(blog != undefined ) {
                                    if (!isEnglish && blog.farsiTitle == null) {
                                        if (blog.farsiTitle != null){
                                            return(
                                                <div key={blog.slug} className='lg:w-1/3 mb-8'>
                                                    <Link   href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
                                                        <div className='card'>
                                                            <div className='m-auto mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px   pointer hover:opacity-60 transform ease-in duration-100 ' 
                                                                style={{backgroundSize: '50%', backgroundImage:`url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                                            </div>
                                                            <div >
                                                                <h2 className={`text-xs text-center px-4 ${isEnglish ? 'text-xs' : 'text-base'}`}>{isEnglish ? blog.title : blog.farsiTitle}</h2>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    }else{
                                        return(
                                            <div key={blog.slug} className='lg:w-1/3 mb-8'>
                                                <Link   href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
                                                    <div className='card'>
                                                        <div className='m-auto mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px   pointer hover:opacity-60 transform ease-in duration-100 ' 
                                                            style={{backgroundSize: '50%', backgroundImage:`url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                                        </div>
                                                        <div >
                                                            <h2 className={`text-xs text-center px-4 transform ease-in duration-100 ${isEnglish ? 'text-xs' : 'text-base'}`}>{isEnglish ? blog.title : blog.farsiTitle}</h2>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    }
                                }
                            })
                            : 
                            ''
                        }
                    </div>
                    <Waypoint
                        onEnter={() => next()}
                        onLeave={() => console.log('Left')}
                    />
                    <p>...Loading more...</p>
                </div>
                )
            :
                (<div>Loading</div>)
            }
        </div>
    )
};

export default Index;
