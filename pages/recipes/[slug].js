import React, { useEffect, useState, useRef, useContext } from 'react';
import getContentfulContent from '../../lib/getContentfulContent';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import '../../assets/styles/main.css';
import Header from '../../components/shared/Header';
import Head from 'next/head';
import { GrInstagram } from "react-icons/gr";
import BlogDataContext from '../../components/BlogDataContext';
import Image from 'next/image';
import Link from 'next/link';
import _ from 'lodash';
import moment from 'moment'
import { timeInDecimals } from '../../helpers/helpers'
import contentfulClient from '../../lib/contentful';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

// const Bold = ({ children }) => <p className="text-6xl text-green-700">{children}</p>;
// const UlList = ({ children }) => <ul className="text-lg text-gray-700  list-disc">{children}</ul>;
// const Text = ({ children }) => <p className="text-base text-justify">{children}</p>;
// const OlList = ({ children }) => <ol className="text-lg text-red list-decimal">{children}</ol>;

const HEADING1 = ({ children }) => <p className="align-center text-gray-800 text-xl">{children}</p>;
const HEADING3 = ({ children }) => <p className="align-center text-gray-800 text-lg ">{children}</p>;
const MyLink = ({ link, children }) => <Link href={`http://${link}`}><a className=" text-gray-600 pointer hover:opacity-60 transform ease-in duration-300">{children}</a></Link>;

const ORDEREDLIST = ({ isEnglish, children }) => {
    return (
        <ol className="text-base lg:text-lg text-red  list-decimal" style={{ direction: isEnglish ? 'unset' : 'rtl', listStyle: isEnglish ? '' : 'persian', marginRight: isEnglish ? 'unset' : '1.5rem' }}>{children}</ol>
    );
};

const LISTITEM = ({ node, children }) => {
    if (!_.isEmpty(node.data) && node.data.type === 'instructions') {
        return <li id={node.data.id}>{children}</li>
    };
    return (
        <li>{children}</li>
    );
};


const addJSONLD = (recipe) => {
    let ingredientsArray = [];
    let instructionsArray = [];
    let instructionStepCount = 1;
    _.map(documentToReactComponents(recipe.instructions), r => {
        if (r.props.children.every(i => (typeof i === "string")) && r.props.children[0] !== '') {
            instructionsArray.push(
                {
                    "@type": "HowToStep",
                    "text": r.props.children[0],
                    "url": `https://www.theiranianvegan.com/recepies/${recipe.slug}#step${instructionStepCount}`
                }
            );
            instructionStepCount++;
        } else if (r.props.children[0] != '') {
            _.map(r.props.children, p => {
                if (p.props != undefined) {
                    if (p.props.children[0].props) {
                        instructionsArray.push(
                            {
                                "@type": "HowToStep",
                                "text": `"${p.props.children[0].props.children}"`,
                                "url": `"https://www.theiranianvegan.com/recepies/${recipe.slug}#step${instructionStepCount}"`
                            }

                        );
                        instructionStepCount++;
                    } else {
                        if (typeof p.props.children == 'array') {
                            instructionsArray.push(
                                {
                                    "@type": "HowToStep",
                                    "text": `"${p.props.children[0].props.children[0]}"`,
                                    "url": `"https://www.theiranianvegan.com/recepies/${recipe.slug}#step${instructionStepCount}"`
                                }
                            )
                            instructionStepCount++;
                        }

                    }
                }
            })
        }
    })
    instructionsArray = JSON.stringify(instructionsArray);
    _.map(documentToReactComponents(recipe.ingredients), i => {
        if (i.props.children.every(i => (typeof i === "string"))) {
            if (i.props.children[0] !== '') ingredientsArray.push(i.props.children[0])
        } else if (i.props.children[0] != '') {

            _.map(i.props.children, c => {
                if (c !== "\n") {
                    if (typeof c.props.children === "object") {
                        c.props.children.map(i => ingredientsArray.push(i.props.children[0]))
                    } else if (typeof c.props.children === "string") {
                        ingredientsArray.push(c.props.children);
                    } else {
                        const dataToPush = c.props.children[0].props.children[0] | c.props.children[0]
                        ingredientsArray.push(dataToPush)
                    }
                }
            })
        }
    })
    ingredientsArray = `[${ingredientsArray.map(s => `"${s}"`).join(', ')}]`;
    const keywords = recipe.slug.split('-').join(', ')

    const convertToIsoDate = (data) => {
        if (data) {
            const splitInput = data.split(" ").join("").match(/[a-z]+|[^a-z]+/gi);
            let duration = moment.duration()

            splitInput.map(i => {
                if (/^\d+$/.test(i)) {
                    let timeDefinition = (splitInput[splitInput.indexOf(i) + 1]).charAt(0);
                    switch (timeDefinition) {
                        case "h":
                            timeDefinition = "hours"
                            break;
                        case "min":
                            timeDefinition = "minutes"
                            break;
                        default:
                            break;
                    }
                    duration.add(moment.duration(parseInt(i), timeDefinition))
                }
            })
            return duration
        }
        return data
    }
    return {
        __html: `[{
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.theiranianvegan.com/recepies/${recipe.slug}"
            },  
            "name": "${recipe.title}",
            "image": {
                "@type": "ImageObject",
                "url": "${recipe.smallBlogPostImage.fields.file.url}"
            },
            "author": {
              "@type": "Person",
              "name": "Mana Rose Shamshiri-Fard"
            },
            "datePublished": "${recipe.createdAt}",
            "description": "${recipe.shortDescription ? documentToReactComponents(recipe.shortDescription)[0].props.children[0] : ""}",
            "prepTime": "${convertToIsoDate(recipe.prepTime)}",
            "cookTime": "${convertToIsoDate(recipe.cookTime)}",
            "totalTime": "${convertToIsoDate(recipe.totalTime)}",
            "keywords": "${keywords}",
            "recipeYield": "${recipe.servings}",
            "recipeCategory": "${recipe.course}",
            "recipeCuisine": "${recipe.cuisine}",
            "recipeIngredient": ${ingredientsArray},
            "recipeInstructions": ${_.isEmpty(instructionsArray) ? "[]" : `[${instructionsArray}]`}
        }]`,
    }
};
const BlogPost = ({ blogPost }) => {
    const { isEnglish } = useContext(BlogDataContext);
    const [post, setPost] = useState(null);
    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);

    useEffect(() => {
        const bruv = _.cloneDeep(blogPost);
        let stepHowToCount = 1;
        _.map(bruv.instructions, (value, key) => {
            if (key == 'data') {
                bruv.instructions[key] = { type: 'instructions' }
                _.map(bruv.instructions.content, ol => {
                    if (ol.nodeType == "ordered-list") {
                        _.map(ol.content, iol => {
                            _.map(iol, (value, key) => {
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
    const options = {
        renderText: text => {
            return text.split('\n').reduce((children, textSegment, index) => {
                return [...children, index > 0 && <br key={index} />, textSegment];
            }, []);
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <p className={`text-base mb-4 ${isEnglish ? 'lg:text-justify' : 'text-right'}`}>{children}</p>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className={`text-base lg:text-lg text-gray-700  list-disc`} style={{ direction: isEnglish ? 'unset' : 'rtl', marginRight: isEnglish ? 'unset' : '1.5rem' }}>{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ORDEREDLIST node={node} isEnglish={isEnglish}>{children}</ORDEREDLIST>,
            [BLOCKS.HEADING_1]: (node, children) => <HEADING1>{children}</HEADING1>,
            [BLOCKS.HEADING_3]: (node, children) => <HEADING3>{children}</HEADING3>,
            [BLOCKS.LIST_ITEM]: (node, children) => <LISTITEM node={node}>{children}</LISTITEM>,
            [BLOCKS.EMBEDDED_ASSET]: (node) => <img src={node.data.target.fields.file.url} className='my-10' />,
            [INLINES.HYPERLINK]: (node, children) => <MyLink link={node.data.uri}>{children}</MyLink>,
        },
    };

    if (post == null) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </Head>
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
                                    <Image height="30" width="30" src="/cutlery.svg" />
                                </div>
                                {isEnglish ? 'JUMP TO RECIPE' : 'دسترسی به طرز تهیه'}
                            </button>
                        </div>

                        {documentToReactComponents(isEnglish ? post.recipeDescription : post.farsiRecipeDescription, options)}

                        {/* Recipe Card */}

                        <div ref={myRef} className='mb-8  lg:mx-16 p-2 lg:p-8 lg:mb-20 mt-48 relative shadow-md bg-white'>
                            <div className='w-48 absolute my-auto left-23 lg:left-34 top-9n h-64'>
                                <div className='clip-polygon w-full h-full absolute' style={{ clipPath: 'polygon(50% 0, 100% 100%, 50% 100%, 0 50%)', backgroundSize: '62%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${blogPost.smallBlogPostImage.fields.file.url})` }}>
                                </div>
                                <img src="/paisley.png" className=' h-64 absolute text-gray-500' />
                            </div>

                            <div className='w-full mt-24 px-4 lg:px-0'>
                                <h1 className='py-10 text-center text-2xl lg:text-3xl font-medium border-btm mb-10'>{isEnglish ? post.title : post.farsiTitle}</h1>
                                <div className='my-2 text-lg pl-4 lg:pl-0'>

                                    {isEnglish
                                        ? (
                                            <div className='flex items-center lg:justify-center w-full mb-6'>
                                                <div className='w-5 text-gray-500 mr-3'>
                                                    <Image height="20" width="20" src="/course.svg" alt='Course icon' />
                                                </div>
                                                <div className='flex'>
                                                    <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Course: </h1>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base'>{post.course}</h1>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className='flex items-center  justify-end lg:justify-center w-full mb-6'>
                                                <div className='flex'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base'>{post.course}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm  ml-2'>:نوع وعده</h1>
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
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Prep Time: </h1>
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.prepTime}</h1>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className='w-full lg:w-45p flex items-center justify-end mb-6 lg:ml-3'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.servings}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm ml-3 text-right'>:تعداد سرو</h1>
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
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Cook Time: </h1>
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.cookTime}</h1>
                                                    </div>
                                                </div>
                                            )
                                            : (

                                                <div className='w-full lg:w-45p flex items-center justify-end mb-6 lg:ml-3'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.prepTime}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm ml-3 text-right'>:آماده سازی</h1>
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
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Total Time: </h1>
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.totalTime}</h1>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className='w-full lg:w-55p flex items-center justify-end mb-6'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.totalTime}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm ml-3 text-right'>:کل مدت زمان مورد نیاز</h1>
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
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Servings: </h1>
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.servings}</h1>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className='w-full lg:w-55p flex items-center justify-end mb-6 lg:mb-0 '>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.cookTime}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm  ml-3 lg:ml-2 text-right'>:مدت زمان پخت</h1>
                                                    <div className='w-5 text-gray-500 ml-3'>
                                                        <Image height="20" width="20" src="/cook-time.svg" alt='Cook time icon' />
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {/* <div className='w-1/2 flex items-center w-full lg:ml-4'>
                                            <Image  height="20" width="20" src="/servings.svg"  className='w-5 text-gray-500 mr-3' />
                                            <div className='flex'>
                                                {isEnglish 
                                                    ? <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Servings: </h1> 
                                                    : <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>وعده:</h1>
                                                }
                                                <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.servings}</h1>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </div>

                            <div className='px-4 lg:px-8 bg-gray-primary lg:pb-8 py-5'>

                                <div className='border-btm mb-10 mt-4 pb-8'>
                                    {isEnglish
                                        ? <h1 className="align-center text-gray-500 font-bold text-base mb-5">INGREDIENTS</h1>
                                        : <h1 className="align-center text-gray-500 font-bold text-2xl text-right mb-8">مواد لازم</h1>
                                    }
                                    {documentToReactComponents(isEnglish ? post.ingredients : post.farsiIngredients, options)}
                                </div>


                                <div className='border-btm mb-10 pb-8'>
                                    {isEnglish
                                        ? <h1 className="align-center text-gray-500 font-bold text-base mb-8">INSTRUCTIONS</h1>
                                        : <h1 className="align-center text-gray-500 font-bold text-2xl text-right mb-8">طرز تهیه</h1>
                                    }
                                    {documentToReactComponents(isEnglish ? post.instructions : post.farsiInstructions, options)}
                                </div>

                                {isEnglish
                                    ? <h1 className="align-center flex items-center text-gray-500 font-bold text-base mb-5 "><Image height="20" width="20" src="/notes.svg" className='w-5 text-gray-500 mr-3' />NOTES</h1>
                                    : <h1 className="align-center flex items-center justify-end text-gray-500 font-bold text-2xl text-right mb-8  ">فوت و فن <Image height="20" width="20" src="/notes.svg" className='w-5 text-gray-500 ml-3' /></h1>
                                }
                                <div className='bg-white p-4 pt-10 lg:p-8 mb-12 pb-8 cut-corrner'>
                                    {documentToReactComponents(isEnglish ? post.notes : post.farsiNotes, options)}
                                </div>
                            </div>

                            <div className='w-full flex bg-white p-4 lg:p-8'>
                                <div className='w-1/3 flex justify-left lg:justify-center items-center'>
                                    <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'>
                                        <GrInstagram size={60} />
                                    </a>
                                </div>
                                <div className='w-2/3'>
                                    <h1 className='text-xl mb-4'>Did you make this recipe?</h1>
                                    <h1 className='text-base'>Tag
                                        <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'>
                                            <span> @theiranianvegan </span>
                                        </a>
                                        <span>on Instagram and hashtag </span>
                                        <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'>
                                            #theiranianvegan
                                        </a></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='hidden'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addJSONLD(post)}
                />
            </div>
        )
    }
};


export const getStaticPaths = async (params) => {
    // fetch recipes
    const res = await contentfulClient.getEntries({content_type: 'blogPost'});
    const recipes = res.items.map(item => item.fields);

    // Get the paths we want to pre-render based on posts
    const paths = []
    recipes.map(recipe => {
      paths.push(
        { params: { slug: String(recipe.slug)}}
      )
    })
    return {
      paths,
      // If an ID is requested that isn't defined here, fallback will incrementally generate the page
      fallback: true,
    }
  }

export const getStaticProps = async ({params}) => {
    const { slug } = params;
    const props = await getContentfulContent('blogPost', slug);
    return { 
        props: { blogPost: props.blogPost}, 
        revalidate: 1
    }
}

export default BlogPost;


