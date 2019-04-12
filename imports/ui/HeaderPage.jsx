import React from 'react';
import BurgerMenu from '/imports/ui/BurgerMenu.jsx'

class HeaderPage extends React.Component {
    render() {
        return (
            <div>
                <BurgerMenu />
                <div className='headerPage'>
                    <a href='/' className='logoHeader'></a>
                    <h1>{this.props.title}</h1>
                </div>
            </div>
        )
    }

}

export default HeaderPage;
