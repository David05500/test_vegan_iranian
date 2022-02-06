import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import _ from 'lodash';
import { AppDataContext } from '../../components/AppDataContext';
import Meta from '../../components/shared/SeoMeta.js';
import contentfulClient from '../../lib/contentful';
// import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { recipesStructureData } from "../../helpers"

const Index = ({ recipes }) => {
    const { isEnglish, paginatedRecipes, initialRecipes, setInitialRecipes, next } = useContext(AppDataContext);
    const { ref, inView } = useInView({ threshold: 0 });

    useEffect(() => {
        if (recipes) setInitialRecipes(recipes)
    }, [recipes])

    useEffect(() => {
        if (inView) next()
    }, [inView])

    if (!paginatedRecipes || _.isEmpty(paginatedRecipes)) return <div></div>
    return (
        <div>
            <Meta
                title='Iranian Vegan | Recipes'
                description='A superb collection of fine persian vegan recipes and history behind each recipe.'
            />
            <div className='m-auto text-2xl bg-gray-primary'>
                <div className='max-width-735 px-4 lg:px-0 mx-auto lg:flex lg:flex-wrap mt-10'>
                    {_.map(paginatedRecipes, blog => {
                        if (blog != undefined) {
                            if (!isEnglish && blog.farsiTitle == null) {
                                if (blog.farsiTitle != null) {
                                    return (
                                        <div key={blog.slug} className='lg:w-1/3 mb-8'>
                                            <Link href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
                                                <div className='card'>
                                                    <div className='m-auto mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px   pointer hover:opacity-60 transform ease-in duration-100 '
                                                        style={{ backgroundSize: '50%', backgroundImage: `url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                                    </div>
                                                    <div >
                                                        <h2 className={`text-xs text-center px-4 ${isEnglish ? 'text-xs' : 'text-base'}`}>{isEnglish ? blog.title : blog.farsiTitle}</h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                            } else {
                                return (
                                    <div key={blog.slug} className='lg:w-1/3 p-2'>
                                        <Link href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
                                            {/* <a>
                                                <Image
                                                    height="345"
                                                    width="270"
                                                    objectFit='cover'
                                                    alt={`https://${blog.smallBlogPostImage.fields.description}`}
                                                    src={`https://${blog.smallBlogPostImage.fields.file.url}`}
                                                    className='m-auto mb-4 relative pointer hover:opacity-60 transform ease-in duration-100 '
                                                />
                                                <h2 className={`text-xs text-center px-4 transform ease-in duration-100 ${isEnglish ? 'text-xs' : 'text-base'}`}>{isEnglish ? blog.title : blog.farsiTitle}</h2>
                                            </a> */}
                                            <a>
                                                <div className='m-auto mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px   pointer hover:opacity-60 transform ease-in duration-100 '
                                                    style={{ backgroundSize: '50%', backgroundImage: `url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                                </div>
                                                <div >
                                                    <h2 className={`text-xs text-center px-4 transform ease-in duration-100 ${isEnglish ? 'text-xs' : 'text-base'}`}>{isEnglish ? blog.title : blog.farsiTitle}</h2>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>

            </div>
            <div ref={ref}>
                <h1 className='invisible'>loading</h1>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={recipesStructureData(recipes)}
            />
        </div>
    )
};

export const getStaticProps = async () => {
    const res = await contentfulClient.getEntries({
        content_type: 'blogPost',
    });
    const recipes = res.items.map(item => item.fields);
    return { props: { recipes }, revalidate: 1 }
}

export default Index;
