import React from 'react';
import { Container } from 'semantic-ui-react';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            access: 'loading'
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <Container>
                Hello World!!
            </Container>
        )
    }

}

export default Home;
