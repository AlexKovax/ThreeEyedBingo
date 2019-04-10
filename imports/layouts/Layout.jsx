import React from 'react';
import { Container, Header } from 'semantic-ui-react';


class Layout extends React.Component {

    render() {

        return (
            <Container style={{ padding: ' 20px 1% 50px 1%' }} className="main-layout" fluid >
                <Header as='h1'>Who dies when in Game of Thrones season 8 ?</Header>

                {this.props.content}
            </Container>
        )
    }

}

export default Layout;
