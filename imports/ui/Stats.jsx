import React from 'react';
import { Image, Header, Segment, Card } from 'semantic-ui-react';
import HeaderPage from '/imports/ui/HeaderPage.jsx'

class Stats extends React.Component {

    constructor() {
        super();
        this.state = {
            voteInfo: {},
            loading: true,
            tabCharacters: []
        };
    }

    componentWillMount() {

        //get characters
        Meteor.call('getAllCharacters', (err, res) => {
            if (res) {
                this.setState({ tabCharacters: res, loading: false })
            } else {
                console.log('Error');
                //TODO : graceful handling
            }
        })



    }

    render() {

        return (
            <div>
                <HeaderPage title='Leaderboard' />
                <Segment loading={this.state.loading}>
                    <Header as='h2'>Statistics per character</Header>

                    <Card.Group itemsPerRow={3}>
                        {this.state.tabCharacters.map((item) => {
                            return (
                                <Card key={item.id}>
                                    <Image src={'https://static.whodieswhen.com/' + item.id + '.jpeg'} />
                                    <Card.Content>
                                        <Card.Header>{item.name}</Card.Header>
                                        <Card.Meta>
                                            Stats are coming...
                                        </Card.Meta>
                                    </Card.Content>
                                </Card>
                            )
                        })
                        }
                    </Card.Group>

                    <p>
                        Share this forecast on : twitter | facebook
                    </p>
                </Segment>
            </div>
        )
    }

}

export default Stats;
