import React from 'react';
import { Image, Header, Segment, Card } from 'semantic-ui-react';
import HeaderPage from '/imports/ui/HeaderPage.jsx'

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
            <div>
                <HeaderPage title='About the bingo' />
                <Segment loading={this.state.loading}>
                    <Header as='h2'>About</Header>

                    <p>This is a small friendly project that was created over a few days after. We wanted to launch fast so that people can make their predictions before the first episode.</p>
                    <p>This is completely work in progress and updates are going to come regularly.</p>
                    <p>For any questions, feedbacks, bugs, please get in touch with Alex on Twitter : <a href='https://twitter.com/alexkovax' target='_blank'>@alexkovax</a></p>
                </Segment>
            </div>
        )
    }

}

export default About;
