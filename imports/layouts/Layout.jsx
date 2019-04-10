import React from 'react';

class Layout extends React.Component {

    render() {

        return (
            <div className="main-layout">
                {this.props.content}
            </div>
        )
    }

}

export default Layout;
