import React from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    EmailIcon,
} from 'react-share';

class Share extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentWillMount() {
    }

    render() {
        let shareUrl = this.props.shareUrl;
        let titleUrl = this.props.titleUrl;

        return (
            <ul className='shareBar'>
                <li>
                    <FacebookShareButton
                        url={shareUrl}
                        quote={titleUrl}
                    >
                        <FacebookIcon
                            size={32}
                            round />
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton
                        url={shareUrl}
                        title={titleUrl}
                        className="Demo__some-network__share-button">
                        <TwitterIcon
                            size={32}
                            round />
                    </TwitterShareButton>
                </li>
                <li>
                    <TelegramShareButton
                        url={shareUrl}
                        title={titleUrl}
                        className="Demo__some-network__share-button">
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                </li>
                <li>
                    <WhatsappShareButton
                        url={shareUrl}
                        title={titleUrl}
                        separator=":: "
                        className="Demo__some-network__share-button">
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </li>
                <li>
                    <LinkedinShareButton
                        url={shareUrl}
                        title={titleUrl}
                        windowWidth={750}
                        windowHeight={600}
                        className="Demo__some-network__share-button">
                        <LinkedinIcon
                            size={32}
                            round />
                    </LinkedinShareButton>
                </li>
                <li>
                    <RedditShareButton
                        url={shareUrl}
                        title={titleUrl}
                        windowWidth={660}
                        windowHeight={460}
                        className="Demo__some-network__share-button">
                        <RedditIcon
                            size={32}
                            round />
                    </RedditShareButton>
                </li>
                <li>
                    <EmailShareButton
                        url={shareUrl}
                        subject={titleUrl}
                        body={shareUrl}
                        className="Demo__some-network__share-button">
                        <EmailIcon
                            size={32}
                            round />
                    </EmailShareButton>
                </li>
            </ul>
        )
    }

}

export default Share;
