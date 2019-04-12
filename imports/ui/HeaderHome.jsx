import React from 'react';
import BurgerMenu from '/imports/ui/BurgerMenu.jsx'


class HeaderHome extends React.Component {

    scrollto(anchor) {
        //TODO : get rid of Jquery ;)
        jQuery('html, body').animate({
            'scrollTop': jQuery(anchor).offset().top
        }, 1000);
    }

    render() {
        return (
            <div>
                <BurgerMenu />
                <div className='headerHome'>
                    <a href='/' className='logoHeader'></a>
                    <div className='introHome'>
                        Welcome to the Three Eyed Bingo where you can try to predict the many deaths of the season 8 of Game of Thrones.
                        <br />
                        Ready to be a warg?
                    </div>
                    <div className='arrowHome' onClick={this.scrollto.bind(this, '#rules')}>
                        <span>Rules</span>
                    </div>
                </div>

                <div className='rulesHome' id='rules'>
                    <div className='titleRulesHome'>
                        Rules are simple
                        <span>You get</span>
                    </div>
                    <ul>
                        <li>
                            <span>1000</span>
                            pts
                            <p>for an accurate<strong> vision of death</strong></p>
                        </li>
                        <li>
                            <span>3000</span>
                            pts
                            <p>for a correct <strong>survival forecast</strong></p>
                        </li>
                        <li>
                            <span>4000 bonus</span>
                            pts
                            <p>if you guessed the exact<strong>episode of death</strong></p>
                        </li>
                    </ul>
                    <div className='arrowHome' onClick={this.scrollto.bind(this, '#predict')}>
                        <span>Predict</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default HeaderHome;
