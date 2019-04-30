import React from 'react';
import { Image, Container, Input, Button, Header, Select, Icon, Segment, Message, Card } from 'semantic-ui-react';
import HeaderPage from '/imports/ui/HeaderPage.jsx'

class Cast extends React.Component {

    constructor() {
        super();
        this.state = {
            voteInfo: {},
            loading: true,
            tabCharacters: [],
            tabUserVotes: {},
            voteDone: false,
            needToken: false,
            token: ''
        };
    }

    componentWillMount() {
        //Chercher info avec le token SI dans la session ou sinon proposer
        if (Session.get('wdmSlug') && Session.get('wdmToken')) {
            Meteor.call('getVoteFromToken', Session.get('wdmToken'), (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({ voteInfo: res })

                    //get characters
                    Meteor.call('getAllCharacters', (err, res) => {
                        if (res) {
                            this.setState({ tabCharacters: res, loading: false, token: Session.get('wdmToken') })
                        } else {
                            console.log('Error');
                        }
                    })
                }
            })
        } else {
            this.setState({ needToken: true })
        }

    }

    //Handle select changes
    handleChange = (e, { name, value }) => {
        this.setState({ tabUserVotes: { ...this.state.tabUserVotes, [name]: value } })
    }

    handleInput = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleFind() {
        if (this.state.token !== '') {
            Meteor.call('getVoteFromToken', this.state.token, (err, res) => {
                if (err) {
                    console.log(err);
                } else if (res) {
                    this.setState({ voteInfo: res })

                    //get characters
                    Meteor.call('getAllCharacters', (err, res) => {
                        if (res) {
                            this.setState({ tabCharacters: res, loading: false, needToken: false })
                        } else {
                            console.log('Error');
                        }
                    })
                }
            })
        }
    }

    handleSubmission() {
        let finalVote = { ...this.state.voteInfo.tabVotes, ...this.state.tabUserVotes };
        Meteor.call('updateVote', this.state.token, finalVote, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                this.setState({ voteDone: true })
            }
        })
    }

    render() {

        if (this.state.voteDone) {
            return (
                <div>
                    <HeaderPage title='Make your prediction' />
                    <Container>
                        <Segment style={{ marginTop: '20px' }}>
                            <h2>Well done !</h2>
                            <p>Refresh the page to update again or go checkout the <a href='/leaderboard'>leaderboard</a></p>
                        </Segment>
                    </Container>
                </div>
            )
        }

        if (this.state.needToken) {
            return (
                <div>
                    <HeaderPage title='Make your prediction' />
                    <Container>
                        <Segment style={{ marginTop: '20px' }}>
                            <h2>Enter your token to update your visions</h2>
                            <Input name='token' placeholder='xxxx' onChange={this.handleInput} />
                            <Button onClick={this.handleFind.bind(this)}>Find my visions</Button>
                        </Segment>
                    </Container>
                </div>
            )
        }

        let deathOptions = [];

        for (let i = 1; i < 7; i++) {
            deathOptions.push({ key: 'dies' + i, text: 'Dies at episode ' + i, value: i });
        }
        deathOptions.push({ key: 'neverdies', text: 'Never dies', value: 0 })

        return (
            <div>
                <HeaderPage title='Make your prediction' />

                <Container>
                    <Segment loading={this.state.loading} hidden={this.state.mainSegmentHidden} style={{ marginTop: '20px' }}>
                        <h2>Update your visions</h2>

                        <p className='descVoteHome'>You can update your prediction but be careful, we'll take in account the time of prediction for bonuses (and to prevent cheating...)</p>

                        <Card.Group centered>
                            {this.state.tabCharacters.map((item) => {
                                return (
                                    <Card key={item.id}>
                                        <Image src={'https://static.whodieswhen.com/' + item.id + '.jpeg'} />
                                        <Card.Content>
                                            <Card.Header>{item.name}</Card.Header>
                                            <Card.Meta>{(!item.isDead) ? 'Still alive !' : 'Dead...'}</Card.Meta>
                                            <Card.Description>{item.info}</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            {(!item.isDead) ?
                                                <div>
                                                    <Icon name='bullseye' />
                                                    Your forecast ?
                                                    <Select
                                                        placeholder='Choose from below'
                                                        name={item.id}
                                                        options={deathOptions}
                                                        fluid
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.voteInfo.tabVotes[item.id]}
                                                    />
                                                </div>
                                                : <p>Too late... Died at episode {item.deadAtEpisode}</p>
                                            }

                                        </Card.Content>
                                    </Card>
                                )
                            })
                            }
                        </Card.Group>

                    </Segment>

                    <Button style={{ marginBottom: '50px' }} color='black' fluid size='massive' onClick={this.handleSubmission.bind(this)} >Update my prediction !</Button>
                </Container>
            </div>
        )
    }

}

export default Cast;
