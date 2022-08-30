import { 
    FacebookShareButton, 
    TwitterShareButton, 
    LinkedinShareButton, 
    FacebookIcon, 
    LinkedinIcon, 
    TwitterIcon 
} from 'react-share';

const ShareButtons = () => {
  return (
    <div>
        <FacebookShareButton 
            url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
            quote="yoo"
            hashtag="#yoo"
        >
            <FacebookIcon style={{ opacity: '0.5'}} size={18} />
        </FacebookShareButton>

        <TwitterShareButton 
            url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
            title="Check out this iHateReading custom repository "
            hashtags={["#food"]}
        >
            <TwitterIcon style={{ opacity: '0.5'}} size={18} />
        </TwitterShareButton>

        <LinkedinShareButton 
            url="https://www.theiranianvegan.com/iranian-vegan-restaurant"
            title="Check out this iHateReading custom repository "
        >
            <LinkedinIcon style={{ opacity: '0.5'}} size={18} />
        </LinkedinShareButton>
    </div>
  )
}
export default ShareButtons