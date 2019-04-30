import React from 'react';
import { List, Container, Grid, Card, Header, Segment } from 'semantic-ui-react';
import HeaderPage from '/imports/ui/HeaderPage.jsx'

class Leaderboard extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            tabVotes: []
        };
    }

    componentWillMount() {
        //Chercher info avec le slug
        Meteor.call('getAllVotes', this.props.slug, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                this.setState({ loading: false, tabVotes: res })
            }
        })


    }

    render() {
        if (this.state.loading) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div className='leaderboard'>
                <HeaderPage title='Leaderboard' />
                <Container style={{ marginTop: '20px' }}>
                    <Grid container doubling columns={2}>
                        <Grid.Column>
                            <Card fluid>
                                <Card.Content header='How does this work?' />
                                <Card.Content extra>
                                    All the forecasts are processed after every episode. You get points for the correct deaths predicted and at the end of episode 6 you'll get the points for the characters still alive.
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        <Grid.Column>
                            <Card.Group>

                                {this.state.tabVotes.map((vote, i) => {
                                    console.log(typeof vote.lastModifierAt)
                                    return (
                                        <Card key={i} fluid>
                                            <Card.Content>
                                                <img src='https://static.three-eyed-bingo.com/jonico.png' style={{ width: '50px', background: 'white', marginLeft: '-65px', marginTop: '-50px', position: 'absolute', border: 'solid 1px black', borderRadius: '50px' }} />
                                                <Card.Header>{i + 1}. {vote.nickname} - {vote.score} points</Card.Header>
                                                <Card.Meta>
                                                    predicted on {vote.createdAt.toString().slice(0, 21)}
                                                    {(typeof vote.lastModifierAt === 'object') ? ' and updated on ' + vote.lastModifierAt.toString().slice(0, 21) : ''}
                                                </Card.Meta>
                                                <Card.Description>
                                                    <a href={Meteor.absoluteUrl() + 'vote/' + vote.slug}>See forecast</a>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )
                                }
                                )}

                            </Card.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }

}

export default Leaderboard;
