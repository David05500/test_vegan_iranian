import _ from 'lodash';
import Image from 'next/image';
import { checkout } from '../checkout.js';
import Meta from '../components/shared/SeoMeta.js'
import { GoLocation } from "react-icons/go"
import { BiTime } from "react-icons/bi"
import { AiOutlineCalendar } from "react-icons/ai"
import ShareButtons from '../components/shared/shareButtons'
import { useState } from 'react';

const addJSONLD = () => {
  return {
    __html: `[{
      "@context": "http://schema.org",
      "@type": "Restaurant",
       "image": "/restuarant-logo-with-bg.webp",
       "priceRange" : "£2.50 - £15.95",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jamboree Jazz Venue, 6 St Chad's Place, King's Cross",
        "addressLocality": "London",
        "addressRegion": "United Kingdom",
        "postalCode": "WC1X9HH"
      },
      "name": "Mana's Plant-based Persian Cuisine",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "17:00:00",
          "dayOfWeek": "https://schema.org/Sunday",
          "opens":  "14:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "21:00:00",
          "dayOfWeek": "https://schema.org/Sunday",
          "opens":  "18:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "17:00:00",
          "dayOfWeek": "https://schema.org/Saturday",
          "opens":  "14:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "21:00:00",
          "dayOfWeek": "https://schema.org/Saturday",
          "opens":  "18:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "15:00:00",
          "dayOfWeek": "https://schema.org/Wednesday",
          "opens": "12:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "21:00:00",
          "dayOfWeek": "https://schema.org/Wednesday",
          "opens": "18:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "15:00:00",
          "dayOfWeek": "https://schema.org/Thursday",
          "opens": "12:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "21:00:00",
          "dayOfWeek": "https://schema.org/Thursday",
          "opens": "18:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "15:00:00",
          "dayOfWeek": "https://schema.org/Friday",
          "opens": "12:00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "closes":  "21:00:00",
          "dayOfWeek": "https://schema.org/Friday",
          "opens": "18:00:00"
        }
      ],
      "servesCuisine": [
        "Middle Eastern",
        "Persian"
      ],
      "telephone": "02072786797",
      "url": "https://www.theiranianvegan.com/iranian-vegan-restaurant",
      "hasMap": "https://www.google.com/maps?cid=12049293455256477694"
    }]`
  }
};

const IranianVeganRestaurant = () => {
  const [privateLaunchQuantity, setPrivateLaunchQuantity] = useState(1)
  const [publicLaunchQuantity, setPublicLaunchQuantity] = useState(1)
  const optionsQuantity = 11;

  return (
    <>
      <Meta
        title="Iranian Vegan | Mana's Plant-Based Persian Cuisine - Pop-up Restaurant"
        description='One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.'
        ogUrl="https://www.theiranianvegan.com/iranian-vegan-restaurant"
        ogImage="/restuarant-logo-with-bg-256x256.webp"
        ogImageAlt="Restuarant logo"
        ogSiteName="The Iranian Vegan"
      />


      <div className='m-auto text-2xl bg-gray-primary relative'>
        <div className='max-width-735 p-6 pt-0 flex flex-col items-center lg:p-0 mx-auto lg:mb-20 lg:mb-10'>
          <Image height="500" width="500" src="/restuarant-logo.png" alt='Course icon' />

          <p className="mb-8 text-base text-justify">During the Coronavirus pandemic, I started an instagram blog (@theiranianvegan) and website, to document my cooking, share my recipes, and to prove to others that we do not have to leave our culture behind when going plant-based, or compromise on
            flavour.</p>
          <p className="mb-10 text-base text-justify">From September, I am running a pop-up restaurant on a four month residency at <span className="font-medium">Jamboree Jazz Venue, 6 St Chad's Place, King's Cross, London WC1X 9HH</span>.</p>
          <Image height="853" width="1280" src="/mana_restuarant.webp" alt='Course icon' />
          <p className="mb-6 text-base text-justify mt-10 mb-6 lg:mb-12">For Iranians, food goes beyond merely sustenance. It is first and foremost an expression of love, of warmth, of hospitality, of community, and a celebration of our rich cultural heritage. I am so grateful to have the opportunity to share this with you. Expect a selection of traditional sharing mezze, stews, clay-oven baked bread and desserts.</p>       


          <div className="flex flex-col lg:flex-row">
            <div className='flex p-1 flex-col lg:w-3/5 border-b pb-6 mb-6 lg:border-b-0 lg:border-r lg:mr-2'>
              <div className='mb-8 lg:mb-0'>
                <div className='flex items-center mb-2'>
                  <BiTime size={20} className="mr-2"/> <h3 className='text-lg font-medium underline underline-offset-3'>Opening hours:</h3>
                </div>
                <div className='text-base ml-6 lg:ml-8 lg:mb-8 lg:mt-4'>
                  <p>Weds-Fri</p>
                  <ul className="list-disc mb-4">
                    <li className="ml-4">Lunch: 12pm - 3pm</li>
                    <li className="ml-4">Dinner: 6pm - 9pm</li>
                  </ul>
                  <p>Sat & Sun</p>
                  <ul className="list-disc">
                    <li className="ml-4">Lunch: 2pm - 5pm</li>
                    <li className="ml-4">Dinner: 6pm - 9pm</li>
                  </ul>
                </div>              
              </div>
              <div className="mb-4 lg:mb-0 lg:mt-0">
                <div className='flex items-center mb-2'>
                  <GoLocation className="mr-2" size={20}/>
                  <h3 className='text-lg font-medium underline underline-offset-3'>See you here:</h3>
                </div>
                <p className='text-base ml-6 lg:ml-8'>Jamboree Venue, <br /> 6 St Chad's Place, King's Cross, London WC1X 9HH</p>
              </div>
            </div>
            <ul className="mb-6 lg:w-2/5 lg:pt-4 lg:ml-10">
              <li className='text-base mb-4 list-disc'>Find our menu <a href="/Menu_v3.pdf" target="_blank" rel="noreferrer" className="font-medium underline pointer">here</a></li>
              <li className='text-base mb-4 list-disc'>For bookings please call the venue on <span className="font-medium">02072786797</span></li>
              <li className='text-base list-disc mb-4'>For any questions, please contact <span className="font-medium">theiranianvegan@gmail.com</span></li>
              <li className='text-base list-disc'>
                <div className='flex'>
                  <span className='mr-2'>Share to:</span> <ShareButtons />
                </div>
              </li>
            </ul>
          </div>
          <div className='flex flex-col mb-8  lg:mx-16 p-2 lg:p-6  relative shadow-md bg-white w-full'>
            <h3 className="text-lg">Book a place at the Restaurant:</h3>
          </div>
          <div className='flex flex-col mb-8  lg:mx-16 p-3 lg:p-6  relative shadow-md bg-white w-full lg:w-4/5'>
            <h3 className="mb-8 text-xl font-medium">Private Launch</h3>

            <div className='lg:flex lg:mb-6'>
              <div className="lg:w-3/5">
                <div className='flex items-center mb-2'>
                  <BiTime size={20} className="mr-2"/> <h3 className='text-base lg:text-lg'>6:30 - 10pm</h3>
                </div>

                <div className='flex items-center mb-2'>
                  <AiOutlineCalendar size={20} className="mr-2"/> <h3 className='text-base lg:text-lg'>Sunday the <span className="underline underline-offset-3">11th</span> of September</h3>
                </div>
              </div>

              <div className="lg:w-2/5 mt-8 mb-2 lg:mt-4 lg:mt-0 flex flex-row justify-center lg:justify-end items-center">
                <div className="w-1/2">
                  <select value={privateLaunchQuantity} style="background:none;border:none;" onChange={(e) => setPrivateLaunchQuantity(parseInt(e.target.value))} id="countries_disabled" className="text-base mr-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-none py-1.5 px-1.5">
              
                    {[...Array(optionsQuantity)].map((e, i) => <option value={i} key={i}>{i}</option>)}
                  </select>
                </div>

                <div className="lg:w-auto flex justify-center items-center">
                  <span className='text-base ml-2'>-</span>
                  <span className="w-20 lg:w-auto ml-2 text-xl">£{privateLaunchQuantity * 30}</span>
                </div>

                <button 
                  type="button" className="w-1/2 lg:hidden px-6 py-2 border border-gray-400  font-medium text-xs leading-normal uppercase hover:bg-gray-100 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={() => {
                    checkout({
                      lineItems:[{
                          price: "price_1LT0tiEB4nr07nfa6ESzdDnC",
                          quantity: privateLaunchQuantity
                      }
                    ]
                    })
                  }}
                >Book</button>
              </div>
            </div>
            
            <button 
              type="button" className="hidden lg:block self-end inline-block px-6 py-2 border border-gray-400  font-medium text-xs leading-normal uppercase rounded hover:bg-gray-100 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={() => {
                checkout({
                  lineItems:[{
                      price: "price_1LT0tiEB4nr07nfa6ESzdDnC",
                      quantity: privateLaunchQuantity
                  }
                ]
                })
              }}
            >Book</button>
          </div>

          <div className='flex flex-col mb-8  lg:mx-16 p-3 lg:p-6  relative shadow-md bg-white w-full lg:w-4/5'>
            <h3 className="mb-8 text-xl font-medium">Public Launch</h3>

            <div className='lg:flex lg:mb-6'>
              <div className="lg:w-3/5">
                <div className='flex items-center mb-2'>
                  <BiTime size={20} className="mr-2"/> <h3 className='text-base lg:text-lg'>6:30 - 10pm</h3>
                </div>

                <div className='flex items-center mb-2'>
                  <AiOutlineCalendar size={20} className="mr-2"/> <h3 className='text-base lg:text-lg'>Sunday the <span className="underline underline-offset-3">18th</span> of September</h3>
                </div>
              </div>

              <div className="lg:w-2/5 mt-8 mb-2 lg:mt-4 lg:mt-0 flex flex-row justify-center lg:justify-end items-center">
                <div className="w-1/2">
                  <select value={publicLaunchQuantity} onChange={(e) => setPublicLaunchQuantity(parseInt(e.target.value))} id="countries_disabled" className="text-base mr-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-none py-1.5 px-1.5">
              
                    {[...Array(optionsQuantity)].map((e, i) => <option value={i} key={i}>{i}</option>)}
                  </select>
                </div>

                <div className="lg:w-auto flex justify-center items-center">
                  <span className='text-base ml-2'>-</span>
                  <span className="w-20 lg:w-auto ml-2 text-xl">£{publicLaunchQuantity * 15}</span>
                </div>

                <button 
                  type="button" className="w-1/2 lg:hidden px-6 py-2 border border-gray-400  font-medium text-xs leading-normal uppercase hover:bg-gray-100 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={() => {
                    checkout({
                      lineItems:[{
                          price: "price_1LT0tiEB4nr07nfa6ESzdDnC",
                          quantity: publicLaunchQuantity
                      }
                    ]
                    })
                  }}
                >Book</button>
              </div>
            </div>
            
            <button 
              type="button" className="hidden lg:block self-end inline-block px-6 py-2 border border-gray-400  font-medium text-xs leading-normal uppercase rounded hover:bg-gray-100 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={() => {
                checkout({
                  lineItems:[{
                      price: "price_1LT0tiEB4nr07nfa6ESzdDnC",
                      quantity: privateLaunchQuantity
                  }
                ]
                })
              }}
            >Book</button>
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

export default IranianVeganRestaurant;
