import React from 'react';
import { Image, Header, Segment, Card } from 'semantic-ui-react';

class About extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentWillMount() {
    }

    render() {

        return (
            <Segment loading={this.state.loading}>
                <Header as='h2'>About</Header>

                <p>The about page is coming...</p>
            </Segment>
        )
    }

}

export default About;
