import React from 'react';
import { Container, Button, Icon, Dropdown, Form, List, Label, Divider, Image, Header, Segment, Message, Card } from 'semantic-ui-react';

class Vote extends React.Component {

    constructor() {
        super();
        this.state = {
            voteInfo: {},
            loading: true,
            tabCharacters: []
        };
    }

    componentWillMount() {
        //Chercher info avec le slug
        Meteor.call('getVoteFromSlug', this.props.slug, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                this.setState({ voteInfo: res })

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
        })


    }

    render() {
        if (this.state.username === '' && !this.state.loading) {
            return (<Message error>Error...</Message>)
        }

        return (
            <Segment loading={this.state.loading}>
                <Header as='h2'>Here's what {this.state.voteInfo.nickname} has predicted !</Header>

                <Card.Group itemsPerRow={8}>
                    {this.state.tabCharacters.map((item) => {
                        if (typeof this.state.voteInfo.tabVotes[item.id] === 'undefined') return '';

                        let forecast = this.state.voteInfo.tabVotes[item.id];

                        return (
                            <Card key={item.id}>
                                <Image src={'https://static.whodieswhen.com/' + item.id + '.jpeg'} />
                                <Card.Content>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Meta>{(forecast === 0) ? 'will live !' : 'will die at episode ' + forecast}</Card.Meta>
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
        )
    }

}

export default Vote;
