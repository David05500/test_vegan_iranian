import _ from 'lodash';
import { checkout } from '../checkout.js';
import Meta from '../components/shared/SeoMeta.js'

const addJSONLD = () => {
  return {
    __html: `[{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://theiranianvegan.com/about/#webpage",
        "url": "https://theiranianvegan.com/about/",
        "name": "Iranian Vegan | Iranian Vegan Restuarant",
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

const IranianVeganRestuarant = () => {
  return (
    <>
      <Meta
        title='Iranian Vegan | Iranian Vegan Restuarant'
        description='One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.'
      />
      <div className='m-auto text-2xl bg-gray-primary'>

        <div className='max-width-735 p-6 lg:p-0 mx-auto my-10 lg:mb-20 lg:mb-10'>
          <h1 className="text-center mb-10"> Mana's Plant Based Persian Cuisine Pop-up Restaurant</h1>

          <p className="mb-6 text-base text-justify" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          
          <div className='flex flex-col mb-8  lg:mx-16 p-2 lg:p-6  relative shadow-md bg-white'>
            <h3 className="mb-8 text-lg">Book a place at the restuarant:</h3>
            
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
          </div>
          
          
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJSONLD()}
      />
    </>
  )
}

export default IranianVeganRestuarant;
