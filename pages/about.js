import _ from 'lodash';
import Meta from '../components/shared/SeoMeta.js'

const addJSONLD = () => {
  return {
    __html: `[{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://theiranianvegan.com/about/#webpage",
        "url": "https://theiranianvegan.com/about/",
        "name": "Iranian Vegan | About",
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

const About = () => {
  return (
    <>
      <Meta
        title='Iranian Vegan | About'
        description='One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.'
      />
      <div className='m-auto text-2xl bg-gray-primary'>
        <div className='max-width-735 p-6 lg:p-0 mx-auto my-10 lg:my-20 '>
          <p className="mb-6 text-base font-medium text-justify" >I’m Mana. A young woman from the Iranian diaspora based in London. That’s all you need to know really. Apart from the fact that I’m probably a lot like you. I believe in compassion. I think we have a duty to create a world that is more ethical and just than the one in which we were raised. For me, this duty extends to all forms of life.</p>

          <p className="mb-6 text-base text-justify">One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food. Engaging with the rituals and practices of creating and eating food are ways in which we connect with and hold on to our culture. Our identities are often fragmented, confused and we feel estranged from the world outside of our homes and our families. Given our history, and the political upheaval and change that has displaced us, consuming such food offers a stability of identity and ties us to our lineage in spaces of uncertainty.</p>

          <p className="mb-6 text-base text-justify">With meat being such a huge staple in Iranian culture and diet, it often feels hard to disconnect with our culture and distance ourselves from our family, friends, social situations and identify with veganism, which is often dominated by western neoliberal narratives. Like many vegans from non-Western backgrounds, we often feel like we’re entering into a white-dominated space. Like veganism isn’t ours. This space is created to change that.</p>

          <p className="mb-6 text-base text-justify">Our vegan practices don't mean that we have to leave our culture behind. As we know, the means of meat production today are nothing like it was on the farms of our ancestors. Animals are made a commodity, mass-produced and abused, whilst they are injected with hormones and medicated, having disastrous effects on our health, not to mention our dying Earth. This space is created to engage with our heritage, origins and anthropology of our food, as a way of maintaining the thread of continuity with our ancestors whilst offering a space for growth as times change, and as we change. For me, there is so much honour in creating the foods of my ancestors and knowing there is no pain and suffering in the dish, only love.</p>

        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJSONLD()}
      />
    </>
  )
}

export default About;
