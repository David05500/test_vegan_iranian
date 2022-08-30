import { 
    FacebookShareButton, 
    TwitterShareButton, 
    LinkedinShareButton,
    WhatsappShareButton, 
    FacebookIcon, 
    LinkedinIcon, 
    TwitterIcon,
    WhatsappIcon
} from 'react-share';

const ShareButtons = () => {
  return (
    <div className='inline'>
            <FacebookShareButton 
                url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
                quote="yoo"
                hashtag="#manasplantbasedpersiancuisine"
                className="mr-2"
            >
                <FacebookIcon style={{ opacity: '0.8'}} size={24} />
            </FacebookShareButton>

            <WhatsappShareButton 
                url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
                title="Check out this vegan Persian restaurant "
                className="mr-2"
            >
                <WhatsappIcon style={{ opacity: '0.8'}} size={24}  />
            </WhatsappShareButton>

            <TwitterShareButton 
                url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
                title="Check out this vegan Persian restaurant "
                hashtags={["#persianfood"]}
                className="mr-2"
            >
                <TwitterIcon style={{ opacity: '0.8'}} size={24} />
            </TwitterShareButton>

            <LinkedinShareButton 
                url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
                title="Check out this vegan Persian restaurant "
                className="mr-2"
            >
                <LinkedinIcon style={{ opacity: '0.8'}} size={24} />
            </LinkedinShareButton>
    </div>
  )
}
export default ShareButtons