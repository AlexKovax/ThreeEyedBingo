import React from 'react';
import { Container, Header } from 'semantic-ui-react';


class Layout extends React.Component {

    render() {

        return (
            <Container style={{ paddingBottom: '50px' }} className="main-layout">
                <Header as='h1'>Who dies when in Game of Thrones season 8 ?</Header>

                {this.props.content}
            </Container>
        )
    }

}

export default Layout;
