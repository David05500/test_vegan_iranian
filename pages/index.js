import { useContext } from 'react';
import '../assets/styles/main.css';
import Link from 'next/link';
import { GrInstagram } from "react-icons/gr";
import { AppDataContext } from '../components/AppDataContext';
import Meta from '../components/shared/SeoMeta.js';
import { FacebookShareButton, FacebookIcon } from "react-share"

const addJSONLD = () => {
  return {
    __html: `[{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://theiranianvegan.com/#webpage",
        "url": "https://theiranianvegan.com/",
        "keywords": "iranian, vegan, persian recipes",
        "name": "Iranian Vegan | Authentic Persian Recipes | Home",
        "datePublished": "2020-06-26T12:00:44+00:00",
        "inLanguage": "en-GB",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://theiranianvegan.com/#webpage",
          "url": "https://theiranianvegan.com/",
          "name": "The Iranian Vegan",
          "description": "Discover authentic iranian vegan recipes!",
          "inLanguage": "en-GB" 
        },
        "description": "I believe we have a duty to create a world that is more ethical than the one in which we were raised. For me, this duty extends to all forms of life.",
        "publisher": {
            "@type": "Person",
            "name": "Mana Rose Shamshiri-Fard"
        }
      }]`
  }
};

const HomePage = () => {
  const { isEnglish, setIsEnglish } = useContext(AppDataContext);
  return (
    <div>
      <Meta
        title='Iranian Vegan | Authentic Persian Recipes | Home'
        description='I believe we have a duty to create a world that is more ethical than the one in which we were raised.'
        ogUrl="https://www.theiranianvegan.com"
        ogType="website"
        ogImageAlt="persian recipes"
        ogImage="/manaHomePage__1_.webp"
        ogSiteName="The Iranian Vegan"
      />

      <div className='h-screen w-screen  bg-no-repeat bg-cover bg-center flex justify-center items-center bg-mobile-home-image md:bg-desktop-home-image' >
        <div style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1)  70%, rgba(0, 0, 0, 0.7) 100%)', width: '100vw', height: '100vh' }} >
          <div className='flex flex-col justify-between h-full pb-12 items-center h-screen pt-24 text-center'>
            <h1
              className='italic text-3xl lg:text-7xl text-white font-bold z-50 main-logo lg:text-spaceping-4'
              style={{ textShadow: '6px 6px 0px rgba(0,0,0,0.1)' }}
            >
              THE IRANIAN VEGAN
            </h1>

            <div className='flex flex-col justify-center items-center w-full'>
              <div className='flex flex-col lg:flex-col items-center text-white w-5/7 min-h-24 max-w-26 tracking-wide z-50 justify-around'>
                <Link href="/iranian-vegan-restaurant">
                  {isEnglish
                    ? <a><h4 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100 shimmer mb-6 '>NEW POP UP RESTAURANT IN LONDON</h4></a>
                    : <a><h4 className='pointer text-lg font-medium hover:opacity-60 transform ease-in duration-100'>تماس با من</h4></a>
                  }
                </Link>
                <div>
                  <Link href="/recipes">
                    {isEnglish
                      ? <a><h2 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100'>RECIPES</h2></a>
                      : <a><h2 className='checking pointer text-xl font-medium hover:opacity-60 transform ease-in duration-100'>طرز تهیه غذاها</h2></a>
                    }
                  </Link>

                  <Link href="/about">
                    {isEnglish
                      ? <a><h2 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100'>ABOUT</h2></a>
                      : <a><h2 className='checking pointer text-xl font-medium hover:opacity-60 transform ease-in duration-100'>درباره من</h2></a>
                    }
                  </Link>

                  <Link href="/contact">
                    {isEnglish
                      ? <a><h2 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h2></a>
                      : <a><h2 className='checking pointer text-xl font-medium hover:opacity-60 transform ease-in duration-100'>تماس با من</h2></a>
                    }
                  </Link>
                </div>
                
              </div>

              <a href='https://www.instagram.com/theiranianvegan/' className='text-white mt-10 z-50  hover:opacity-60 transform ease-in duration-100'>
                <GrInstagram size={30} />
              </a>
            </div>

            <div style={{ top: '50px', right: '50px', backdropFilter: 'saturate(150%) blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              className="absolute text-sm text-gray-500 leading-none rounded inline-flex">
              <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 
                  ${isEnglish ? 'text-blue-400' : 'text-white'}  px-4 py-2`} onClick={() => setIsEnglish(true)}>
                <span>English</span>
              </button>
              <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 
                  ${isEnglish ? 'text-white' : 'text-blue-400'}  px-4 py-2`} onClick={() => setIsEnglish(false)}>
                <span>فارسی</span>
              </button>
            </div>
          </div>
        </div >
      </div >
      {/* <FacebookShareButton url={`https://www.theiranianvegan.com`} >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJSONLD()}
      />
    </div >

  )
}
export default HomePage;

