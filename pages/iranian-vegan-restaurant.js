import _ from 'lodash';
import Image from 'next/image';
// import { checkout } from '../checkout.js';
import Meta from '../components/shared/SeoMeta.js'
import { GoLocation } from "react-icons/go"
import { BiTime } from "react-icons/bi"

const addJSONLD = () => {
  return {
    __html: `[{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://theiranianvegan.com/about/#webpage",
        "url": "https://theiranianvegan.com/about/",
        "name": "Iranian Vegan | Iranian Vegan Restaurant",
        "datePublished": "2020-08-31T12:00:44+00:00",
        "inLanguage": "en-GB",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://theiranianvegan.com/#webpage",
          "url": "https://theiranianvegan.com/",
          "name": "The Iranian Vegan",
          "description": "Discover authentic iranian vegan recipes!",
          "inLanguage": "en-GB" 
        },
        "description": "One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.",
        "publisher": {
            "@type": "Person",
            "name": "Mana Rose Shamshiri-Fard"
        }
      }]`
  }
};

const IranianVeganRestaurant = () => {
  return (
    <>
      <Meta
        title="Iranian Vegan | Mana's Plant-Based Persian Cuisine - Pop-up Restaurant"
        description='One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.'
      />
      <div className='m-auto text-2xl bg-gray-primary'>

        <div className='max-width-735 p-6 lg:p-0 mx-auto my-10 lg:mb-20 lg:mb-10'>
          <h1 className="text-center mb-10"> Mana's Plant-Based Persian Cuisine - Pop-up Restaurant</h1>

          <Image height="853" width="1280" src="/mana_restuarant.webp" alt='Course icon' />


          <p className="mb-6 text-base text-justify mt-12">During the Coronavirus pandemic, I started an instagram blog (@theiranianvegan) and website, to document my cooking, share my recipes, and to prove to others that we do not have to leave our culture behind when going plant-based, or compromise on
            flavour.</p>
          <p className="mb-6 text-base text-justify">From September, I am running a pop-up restaurant on a four month residency at <span className="font-medium">Jamboree Jazz Venue, 6 St Chad's Place, King's Cross, London WC1X 9HH</span>.</p>
          <p className="mb-6 text-base text-justify mb-12">For Iranians, food goes beyond merely sustenance. It is first and foremost an expression of love, of warmth, of hospitality, of community, and a celebration of our rich cultural heritage. I am so grateful to have the opportunity to share this with you. Expect a selection of traditional sharing mezze, stews, clay-oven baked bread and desserts.</p>       

          <Image height="1025" width="722" src="/menu.webp" alt='Course icon' />

          <div className='flex p-1 flex-col lg:flex-row justify-between'>
            <div className='lg:w-1/2'>
              <div className='flex items-center mb-2'>
                <BiTime size={20} className="mr-2"/> <h3 className='text-lg font-medium underline underline-offset-3'>Opening hours:</h3>
              </div>
              <div className='text-base ml-6 lg:ml-8'>
                <p>Wednesday - Sunday</p>
                <p>Lunch - 12pm to 2pm  </p>
                <p>Dinner - 6pm to 9pm </p>
              </div>              
            </div>
            <div className="lg:w-1/2 lg:mt-0 lg:ml-24 ">
              <div className='flex items-center mb-2'>
                <GoLocation className="mr-2" size={20}/>
                <h3 className='text-lg font-medium underline underline-offset-3'>Find us here:</h3>
              </div>
              <p className='text-base ml-6 lg:ml-8'>Jamboree Venue, <br /> 6 St Chad's Place, King's Cross, London WC1X 9HH</p>
            </div>
          </div>

          <p className='text-base lg:text-center mt-4 lg:mt-8'>For any questions, please contact <span className="font-medium">theiranianvegan@gmail.com</span></p>
          <p className='text-base lg:text-center'>For bookings please call the venue on <span className="font-medium">02072786797</span></p>
         



          {/* <div className='flex flex-col mb-8  lg:mx-16 p-2 lg:p-6  relative shadow-md bg-white'>
            <h3 className="mb-8 text-lg">Book a place at the Restaurant:</h3>
            
            <div className='flex mb-6'>

            <select id="countries_disabled" className="text-base mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="option_1 ">Option 1</option>
              <option value="option_2">Option 2</option>
            </select>
              -
            <p className="w-20 ml-5">£20</p>
            </div>
            
            <button 
              type="button" className="self-end inline-block px-6 py-2 border border-gray-400  font-medium text-xs leading-normal uppercase rounded hover:bg-gray-100 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={() => {
                checkout({
                  lineItems:[{
                      price: "price_1LT0tiEB4nr07nfa6ESzdDnC",
                      quantity: 1
                  }]
                })
              }}
            >Next</button>
          </div> */}
          
          
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJSONLD()}
      />
    </>
  )
}

export default IranianVeganRestaurant;
