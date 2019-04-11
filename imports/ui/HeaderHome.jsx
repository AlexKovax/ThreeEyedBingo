import React from 'react';

class HeaderHome extends React.Component {

    render() {

        return (
            <div>
                <div className='headerHome'>
                    <a href='/' className='logoHeader'></a>
                    <div className='introHome'>
                        Welcome to the Three Eyed Bingo where you can try to forecast who will die in the season 8 of Game of Thrones and when !
                    </div>
                    <div className='arrowHome'>
                        <a href='#rules'>Rules !</a>
                    </div>
                </div>

                <div className='rulesHome' id='rules'>
                    <div>
                        Rules are simple
                        <span>You get</span>
                    </div>
                    <ul>
                        <li>
                            <span>1000</span>
                            pts
                            <p>When you predicted <strong>a death</strong></p>
                        </li>
                        <li>
                            <span>1000</span>
                            pts
                            <p>When you predicted <strong>a death</strong></p>
                        </li>
                        <li>
                            <span>1000</span>
                            pts
                            <p>When you predicted <strong>a death</strong></p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default HeaderHome;
