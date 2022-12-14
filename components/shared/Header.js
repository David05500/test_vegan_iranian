import React, { useEffect, useState, useRef, useContext } from 'react';
import Link from 'next/link';
import { AppDataContext } from '../AppDataContext';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from "../../helpers"

// COMPONENT
const Header = props => {
  const refy = useRef();
  const [isShrink, setIsShrink] = useState(false);
  const {
    filteredRecipes,
    router,
    isSearching,
    userSearchQuery,
    searchRef,
    isEnglish,
    setIsEnglish
  } = useContext(AppDataContext);

  const slug = router.pathname;


  useEffect(() => {
    if (router.pathname === '/recipes' && window.innerWidth > 430) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const truncate = (str, value) => {
    return str.length > 10 ? str.substring(0, `${value}`) + "..." : str;
  };
  const handleScroll = (e) => {
    const posY = refy.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    if (offset > 146 && !isShrink) {
      setIsShrink(true)
    } else if (offset < 40 && isShrink) {
      setIsShrink(false)
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  const navigate = () => {
    router.push("/iranian-vegan-restaurant/");
  }

  const updateSearchState = (query) => {
    // slug != '/recipes' ? router.push("/recipes/").then(() => {setUserSearchQuery({query});}) : setUserSearchQuery({query});
    if (query) {
      router.push({
        pathname: '/recipes',
        query: { filter: query },
      }, undefined, { shallow: true })
    } else {
      router.push({
        pathname: '/recipes',
        query: {},
      }, undefined, { shallow: true })
    }
  };

  return (
    <div className='sticky top-0 z-50'>
      <nav ref={refy} className={`max-width-1170 bg-gray-1000 border-btm  left-0 m-auto flex flex-col justify-center items-center z-150 py-4 relative`}>
        <Link href="/">
          <h1 className={`italic relative z-10 text-3xl  text-black font-bold my-4 
          ${isShrink ? 'lg:m-0 mb-4 lg:text-6xl transform ease-in duration-200' : 'lg:my-8 lg:text-65xl transform ease-in duration-200 '} 
          pointer main-logo  bg-gray-1000 bg-clip-text bg-logo-image`}
            style={{ color: 'transparent', backgroundSize: '100%', textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}
          >THE IRANIAN VEGAN</h1>
        </Link>

        <div className='flex w-11/12 lg:w-1/3 lg:ml-28p lg:mr-30p justify-around relative'  >
             
          <Link href="/iranian-vegan-restaurant">
            {isEnglish
              ? <a><h4 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100 shimmer'>RESTAURANT</h4></a>
              : <a><h4 className='pointer text-lg font-medium hover:opacity-60 transform ease-in duration-100'>???????? ???? ????</h4></a>
            }
          </Link>
          {/* <div className="dropdown">
            <Link href="/recipes" >
              {isEnglish
                ? <a><h4 className='pointer text-sm font-medium  hover:opacity-60 transform ease-in duration-100 pointer'>RECIPES</h4></a>
                : <a><h4 className='pointer text-lg font-medium  hover:opacity-60 transform ease-in duration-100 pointer'>?????? ???????? ??????????</h4></a>
              }
            </Link>
            <div className="dropdown-content">
              {isEnglish
                ? (
                  <div className='bg-white px-4 py-4 flex flex-col shadow-lg' >
                    <h4 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('Appetizer')}>Appetizers</h4>
                    <h4 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('Main Course')}>Main Course</h4>
                    <h4 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('Dessert')}>Desserts</h4>
                    <h4 className='text-sm pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('Side')}>Sides</h4>
                  </div>
                )
                : (
                  <div className='bg-white px-4 py-4 flex flex-col shadow-lg' >
                    <h4 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('?????? ??????')}>?????? ??????</h4>
                    <h4 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('???????? ????????')}>???????? ????????</h4>
                    <h4 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState('??????')}>??????</h4>
                  </div>
                )
              }
            </div>
          </div> */}

          <Link href="/about">
            {isEnglish
              ? <a><h4 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>ABOUT</h4></a>
              : <a><h4 className='pointer text-lg font-medium hover:opacity-60 transform ease-in duration-100' >???????????? ????</h4></a>
            }
          </Link>

          <Link href="/contact">
            {isEnglish
              ? <a><h4 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h4></a>
              : <a><h4 className='pointer text-lg font-medium hover:opacity-60 transform ease-in duration-100'>???????? ???? ????</h4></a>
            }
          </Link>

        </div>
        <div className='mt-4 flex justify-center items-center w-full md:w-auto  md:absolute lg:right-185px lg:bottom-12px'>
          <form noValidate action="" role="search" className="lg:mt-0 relative">
            <input
              ref={searchRef}
              
              type="search"
              value={userSearchQuery.query ? userSearchQuery.query : ""}
              // onChange={event => updateSearchState(event.currentTarget.value)}
              onChange={event => null}
              className={`search-input text-sm font-medium px-2 py-1 flex justify-center text-black items-center transform ease-in duration-100 ${isEnglish ? '' : 'text-right'}`}
              placeholder={isEnglish ? 'Search here...' : '...??????????'}
              onFocus={() => navigate()}
              // onBlur={() => setIsSearching(false)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <svg onClick={() => updateSearchState("")} role="presentation" style={{ right: isEnglish ? '6%' : 'unset', left: isEnglish ? 'unset' : '6%' }} className="i-search w-3" viewBox="5 5 30 30" fill="none" stroke="currentcolor" color='gray' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </form>
          <div style={{ zIndex: '1111111111', backdropFilter: 'saturate(150%) blur(20px)' }} className="ml-4 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded inline-flex block md:hidden">
            <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? 'text-blue-400' : ''}  px-4 py-2`} onClick={() => setIsEnglish(true)}>
              <span>En</span>
            </button>
            <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? '' : 'text-blue-400'}  px-4 py-2`} onClick={() => setIsEnglish(false)}>
              <span>Fa</span>
            </button>
          </div>
        </div>
      </nav>
      {!slug.includes('/abcdesd1235asd') ?
        ''
        :
        <div className={`max-width-850 shadow-sm bg-white left-0 m-auto flex flex-col items-center px-4 py-4 even:bg-red absolute left-0 right-0 overflow-y-scroll max-h-25rem ease-in duration-200 ${isSearching ? '' : 'transform  -translate-y-full'}`}>
          {_.map(filteredRecipes, blog => {
            return (
              <Link key={blog.slug} href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
                <div key={blog.title} className='flex pointer hover:opacity-60 transform ease-in duration-100 '>
                  <div className='mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px ' style={{ backgroundSize: '50%', backgroundImage: `url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                  </div>
                  <div className='flex flex-col p-4'>
                    <h1 className='mb-10 text-sm text-center'>{blog.title}</h1>
                    {truncate(documentToReactComponents(blog.shortDescription, options), 400)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      }
      <div style={{ top: '50px', right: '50px', zIndex: '1111111111', backdropFilter: 'saturate(150%) blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="absolute text-sm text-gray-500 leading-none border-2 border-gray-200 rounded inline-flex hidden md:block">
        <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? 'text-blue-400' : ''}  px-4 py-2`} onClick={() => setIsEnglish(true)}>
          <span className='hidden md:block'> English</span>
        </button>
        <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? '' : 'text-blue-400'}  px-4 py-2`} onClick={() => setIsEnglish(false)}>
          <span className='hidden md:block'>??????????</span>
        </button>
      </div>

    </div>
  );
}
export default Header;




