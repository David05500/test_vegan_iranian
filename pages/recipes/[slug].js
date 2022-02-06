import React, { useEffect, useState, useRef, useContext } from 'react';
import getContentfulContent from '../../lib/getContentfulContent';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GrInstagram } from "react-icons/gr";
import { AppDataContext } from '../../components/AppDataContext';
import Image from 'next/image';
import { cloneDeep, map } from 'lodash';
import contentfulClient from '../../lib/contentful';
import Meta from '../../components/shared/SeoMeta.js'
import { slugStructureData, options } from "../../helpers"

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

const BlogPost = ({ blogPost }) => {
    const { isEnglish } = useContext(AppDataContext);
    const [post, setPost] = useState(null);
    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);

    // Formatting recipe
    useEffect(() => {
        const bruv = cloneDeep(blogPost);
        let stepHowToCount = 1;
        map(bruv.instructions, (value, key) => {
            if (key == 'data') {
                bruv.instructions[key] = { type: 'instructions' }
                map(bruv.instructions.content, ol => {
                    if (ol.nodeType == "ordered-list") {
                        map(ol.content, iol => {
                            map(iol, (value, key) => {
                                if (key == 'data') {
                                    iol[key] = {
                                        type: 'instructions',
                                        id: `step${stepHowToCount}`
                                    }
                                    stepHowToCount++
                                }
                            })
                        })
                    }
                })
            }
        })
        setPost(bruv);
    }, []);

    if (post == null) {
        return <p>Loading...</p>
    } else {
        return (
            <div>
                <Meta
                    title={post.title}
                    description={post.shortDescription.content[0].content[0].value}
                />
                <div className='m-auto text-2xl bg-gray-primary '>
                    <div className='max-width-735 px-4 mx-auto mt-10 lg:mt-20'>

                        <h1 className='mb-10 text-center transform ease-in text-xl lg:text-2xl duration-100'>{isEnglish ? post.title : post.farsiTitle}</h1>
                        {post.blogPostImage != undefined ? <Image height="20" width="20" src={post.blogPostImage.fields.file.url} className='mb-8 w-5/6 m-auto'></Image> : ''}
                        {post.blogPostImage2 != undefined ? <Image height="20" width="20" src={post.blogPostImage2.fields.file.url} className='mb-8 w-5/6 m-auto'></Image> : ''}
                        {post.blogPostImage3 != undefined ? <Image height="20" width="20" src={post.blogPostImage3.fields.file.url} className='mb-8 w-5/6 m-auto'></Image> : ''}
                        {post.blogPostImage4 != undefined ? <Image height="20" width="20" src={post.blogPostImage4.fields.file.url} className='mb-10 w-5/6 m-auto'></Image> : ''}


                        <div className='w-full flex justify-center mb-10'>
                            <button onClick={executeScroll} className='flex items-center px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base flex'>
                                <div className='w-8 text-gray-300 mr-3'>
                                    <Image height="30" width="30" alt="Jump to recipe icon" src="/cutlery.svg" />
                                </div>
                                {isEnglish ? 'JUMP TO RECIPE' : 'دسترسی به طرز تهیه'}
                            </button>
                        </div>

                        {documentToReactComponents(isEnglish ? post.recipeDescription : post.farsiRecipeDescription, options(isEnglish))}

                        {/* Recipe Card */}

                        <div ref={myRef} className='mb-8  lg:mx-16 p-2 lg:p-8 lg:mb-20 mt-48 relative shadow-md bg-white'>
                            <div className='w-48 absolute my-auto left-23 lg:left-34 top-9n h-64'>
                                <div
                                    className='clip-polygon w-full h-full absolute'
                                    style={{
                                        clipPath: 'polygon(50% 0, 100% 100%, 50% 100%, 0 50%)',
                                        backgroundSize: '62%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${blogPost.smallBlogPostImage.fields.file.url})`
                                    }}>
                                </div>
                                <Image src="/paisley.webp" width="186" height="256" alt="Paisley leaf" className=' h-64 absolute text-gray-500' />
                            </div>

                            <div className='w-full mt-24 px-4 lg:px-0'>
                                <h2 className='py-10 text-center text-2xl lg:text-3xl font-medium border-btm mb-10'>{isEnglish ? post.title : post.farsiTitle}</h2>
                                <div className='my-2 text-lg pl-4 lg:pl-0'>

                                    {isEnglish
                                        ? (
                                            <div className='flex items-center lg:justify-center w-full mb-6'>
                                                <div className='w-5 text-gray-500 mr-3'>
                                                    <Image height="20" width="20" src="/course.svg" alt='Course icon' />
                                                </div>
                                                <div className='flex'>
                                                    <h4 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Course: </h4>
                                                    <p className='text-gray-800 font-medium text-sm lg:text-base'>{post.course}</p>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className='flex items-center  justify-end lg:justify-center w-full mb-6'>
                                                <div className='flex'>
                                                    <p className='text-gray-800 font-medium text-sm lg:text-base'>{post.course}</p>
                                                    <h4 className='self-center text-gray-600 text-sm  ml-2'>:نوع وعده</h4>
                                                </div>
                                                <div className='w-5 text-gray-500 ml-3'>
                                                    <Image height="20" width="20" src="/course.svg" alt='Course icon' />
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className='flex flex-col lg:flex-row items-center justify-center lg:ml-3'>
                                        {isEnglish
                                            ? (
                                                <div className='w-1/2 flex items-center w-full lg:ml-4 mb-6'>
                                                    <div className='w-5 text-gray-500 mr-3'>
                                                        <Image height="20" width="20" src="/prep-time.svg" alt='Prep time icon' />
                                                    </div>
                                                    <div className='flex'>
                                                        <h4 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Prep Time: </h4>
                                                        <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.prepTime}</p>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className='w-full lg:w-45p flex items-center justify-end mb-6 lg:ml-3'>
                                                    <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.servings}</p>
                                                    <h4 className='self-center text-gray-600 text-sm ml-3 text-right'>:تعداد سرو</h4>
                                                    <div className='w-5 text-gray-500 ml-3'>
                                                        <Image height="20" width="20" src="/servings.svg" alt='Servings icon' />
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {isEnglish
                                            ? (
                                                <div className='w-1/2 flex items-center w-full lg:ml-4 mb-6'>
                                                    <div className='w-5 text-gray-500 mr-3'>
                                                        <Image height="20" width="20" src="/cook-time.svg" alt='Cook time icon' />
                                                    </div>
                                                    <div className='flex'>
                                                        <h4 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Cook Time: </h4>
                                                        <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.cookTime}</p>
                                                    </div>
                                                </div>
                                            )
                                            : (

                                                <div className='w-full lg:w-45p flex items-center justify-end mb-6 lg:ml-3'>
                                                    <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.prepTime}</p>
                                                    <h4 className='self-center text-gray-600 text-sm ml-3 text-right'>:آماده سازی</h4>
                                                    <div className='w-5 text-gray-500 ml-3'>
                                                        <Image height="20" width="20" src="/prep-time.svg" alt='Prep time icon' />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className='flex flex-col lg:flex-row items-center justify-center lg:mb-4 lg:ml-3'>

                                        {isEnglish
                                            ? (
                                                <div className='w-1/2 flex items-center w-full lg:ml-4 mb-6'>
                                                    <div className='w-5 text-gray-500 mr-3'>
                                                        <Image height="20" width="20" src="/total-time.svg" alt='Total time icon' />
                                                    </div>
                                                    <div className='flex'>
                                                        <h4 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Total Time: </h4>
                                                        <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.totalTime}</p>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className='w-full lg:w-55p flex items-center justify-end mb-6'>
                                                    <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.totalTime}</p>
                                                    <h4 className='self-center text-gray-600 text-sm ml-3 text-right'>:کل مدت زمان مورد نیاز</h4>
                                                    <div className='w-5 text-gray-500 ml-3'>
                                                        <Image height="20" width="20" src="/total-time.svg" alt='Total time icon' />
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {isEnglish
                                            ? (
                                                <div className='w-1/2 flex items-center w-full lg:ml-4 mb-6'>
                                                    <div className='w-5 text-gray-500 mr-3'>
                                                        <Image height="20" width="20" src="/servings.svg" alt='Servings icon' />
                                                    </div>
                                                    <div className='flex'>
                                                        <h4 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Servings: </h4>
                                                        <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.servings}</p>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className='w-full lg:w-55p flex items-center justify-end mb-6 lg:mb-0 '>
                                                    <p className='text-gray-800 font-medium text-sm lg:text-base  '>{post.cookTime}</p>
                                                    <h4 className='self-center text-gray-600 text-sm  ml-3 lg:ml-2 text-right'>:مدت زمان پخت</h4>
                                                    <div className='w-5 text-gray-500 ml-3'>
                                                        <Image height="20" width="20" src="/cook-time.svg" alt='Cook time icon' />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='px-4 lg:px-8 bg-gray-primary lg:pb-8 py-5'>
                                <div className='border-btm mb-10 mt-4 pb-8'>
                                    {isEnglish
                                        ? <h4 className="align-center text-gray-500 font-bold text-base mb-5">INGREDIENTS</h4>
                                        : <h4 className="align-center text-gray-500 font-bold text-2xl text-right mb-8">مواد لازم</h4>
                                    }
                                    {documentToReactComponents(isEnglish ? post.ingredients : post.farsiIngredients, options(isEnglish))}
                                </div>

                                <div className='border-btm mb-10 pb-8'>
                                    {isEnglish
                                        ? <h4 className="align-center text-gray-500 font-bold text-base mb-8">INSTRUCTIONS</h4>
                                        : <h4 className="align-center text-gray-500 font-bold text-2xl text-right mb-8">طرز تهیه</h4>
                                    }
                                    {documentToReactComponents(isEnglish ? post.instructions : post.farsiInstructions, options(isEnglish))}
                                </div>

                                {isEnglish
                                    ? <h4 className="align-center flex items-center text-gray-500 font-bold text-base mb-5 "><Image height="20" width="20" alt="Notes logo" src="/notes.svg" className='w-5 text-gray-500 mr-3' />NOTES</h4>
                                    : <h4 className="align-center flex items-center justify-end text-gray-500 font-bold text-2xl text-right mb-8  ">فوت و فن <Image height="20" width="20" alt="Notes logo" src="/notes.svg" className='w-5 text-gray-500 ml-3' /></h4>
                                }
                                <div className='bg-white p-4 pt-10 lg:p-8 mb-12 pb-8 cut-corrner'>
                                    {documentToReactComponents(isEnglish ? post.notes : post.farsiNotes, options(isEnglish))}
                                </div>
                            </div>

                            <div className='w-full flex bg-white p-4 lg:p-8'>
                                <div className='w-1/3 flex justify-left lg:justify-center items-center'>
                                    <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'>
                                        <GrInstagram size={60} />
                                    </a>
                                </div>
                                <div className='w-2/3'>
                                    <h4 className='text-xl mb-4'>Did you make this recipe?</h4>
                                    <h4 className='text-base'>Tag
                                        <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'>
                                            <span> @theiranianvegan </span>
                                        </a>
                                        <span>on Instagram and hashtag </span>
                                        <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'>
                                            #theiranianvegan
                                        </a></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='hidden'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={slugStructureData(post)}
                />
            </div>
        )
    }
};


export const getStaticPaths = async (params) => {
    // fetch recipes
    const res = await contentfulClient.getEntries({ content_type: 'blogPost' });
    const recipes = res.items.map(item => item.fields);

    // Get the paths we want to pre-render based on posts
    const paths = []
    recipes.map(recipe => {
        paths.push(
            { params: { slug: String(recipe.slug) } }
        )
    })
    return {
        paths,
        // If an ID is requested that isn't defined here, fallback will incrementally generate the page
        fallback: true,
    }
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const props = await getContentfulContent('blogPost', slug);
    return {
        props: { blogPost: props.blogPost },
        revalidate: 1
    }
}

export default BlogPost;


