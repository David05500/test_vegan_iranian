import _ from 'lodash';
import ContactForm from '../components/contactForm';
import Meta from '../components/shared/SeoMeta.js'

const addJSONLD = () => {
  return {
    __html: `[{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressRegion": "Greater London"
        },
        "@id": "https://theiranianvegan.com/contact/#webpage",
        "url": "https://theiranianvegan.com/contact",
        "name": "Iranian Vegan | Contact Me",
        "description": "A superb collection of fine iranian vegan recipes and history behind each recipe.",
        "telephone": "07462073786",
        "openingHours": "Mo,Tu,We,Th,Fr,St,Sn 00:00-12:00",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.50878537293554",
          "longitude":"-0.1274682631419993"
        },
        "image": [
          "https://images.ctfassets.net/mucdmvfhn5wx/6SDWj4oNqwhJ9uejpjjite/487df877950108133bfcc0a63ff6bfde/manaHomePage.png"
        ],
        "sameAs": [
          "https://www.instagram.com/theiranianvegan/"
        ]
    
      }]`,
  }
};

const Contact = () => {
  return (
    <>
      <Meta
        title='Iranian Vegan | Contact Me'
        description='A superb collection of fine iranian vegan recipes and history behind each recipe.'
      />
      <div className='m-auto text-2xl bg-gray-primary'>
        <div className='max-width-920 px-4 lg:px-8 mx-auto my-20'>
          <h1 className=' mb-5 sub-title text-center text-lg text-gray-900'>CONTACT FORM</h1>
          <ContactForm />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJSONLD()}
      />
    </>
  )
}

export default Contact;
