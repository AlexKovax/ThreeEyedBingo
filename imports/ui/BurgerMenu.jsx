import React from 'react';
import { slide as Menu } from 'react-burger-menu'

class BurgerMenu extends React.Component {


    render() {
        return (
            <Menu right>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="contact" className="menu-item" href="/leaderboard">Leaderboard</a>
                <a id="contact" className="menu-item" href="/stats">Stats</a>
                <a id="about" className="menu-item" href="/about">About</a>
            </Menu>
        );
    }
}

export default BurgerMenu;
