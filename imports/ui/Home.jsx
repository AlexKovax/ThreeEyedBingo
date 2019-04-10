import React from 'react';
import { Container, Segment, Card, Image, Icon, Select, Button, Input, Grid, Message, Header } from 'semantic-ui-react';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            voteSaved: false,
            tabCharacters: [],
            tabUserVotes: {},
            userNickname: '',
            userEmail: '',
            userHasGivenConsent: false,
            mainSegmentHidden: false,
            userHasAlreadyVoted: false,
            userSlug: '',
            showMainError: false,
            mainError: ''
        }
    }

    componentDidMount() {
        //Checker la session
        //Si déjà une session : on cache le segment et on affiche autre chose

        Meteor.call('getAllCharacters', (err, res) => {
            if (res) {
                this.setState({ tabCharacters: res, loading: false })
            } else {
                console.log('Error');
                //TODO : graceful handling
            }
        })
    }

    //Handle select changes
    handleChange = (e, { name, value }) => {
        this.setState({ tabUserVotes: { ...this.state.tabUserVotes, [name]: value } })
    }

    //Handle inputs
    handleInput = (e, { name, value }) => this.setState({ [name]: value })


    handleSubmission() {
        //Check if empty or not and validated
        if (this.state.userNickname === '') {
            return this.setState({ showMainError: true, mainError: 'Please fill the nickname field' })
        }

        if (Object.keys(this.state.tabUserVotes).length === 0) {
            return this.setState({ showMainError: true, mainError: 'Please make a forecast for one or more character...' })
        }


        //user data
        let userData = {
            nickname: this.state.userNickname,
            email: this.state.userEmail,
            tabVotes: this.state.tabUserVotes
        }

        this.setState({ loading: true })

        //TODO : loading
        Meteor.call('castVote', userData, (err, res) => {
            if (err) {

                console.log(err);
                //Handle error
                let errorText = 'There was an error while sending your vote...';
                if (err.error === 'incomplete-data') {
                    errorText = 'Some fields are missing...'
                } else if (err.error === 'already-exists') {
                    errorText = 'This nickname is already taken. Please choose another one...'
                }
                this.setState({ loading: false, showMainError: true, mainError: errorText })
            } else {
                //TODO : enlever loading, afficher succès, supprimer les characters
                console.log(res)

                //Set session
                this.setState({ mainSegmentHidden: true, loading: false, userHasAlreadyVoted: true, userSlug: res })
                //TODO : update user slug so he can get his link
            }

        })
    }

    render() {

        let deathOptions = [
            { key: 'neverdies', text: 'Never dies', value: 0 }
        ];

        for (let i = 1; i < 7; i++) {
            deathOptions.push({ key: 'dies' + i, text: 'Dies at episode ' + i, value: i });
        }

        return (

            <div>
                <Segment>
                    <p>
                        Welcome to WDM (who dies when) where you can try to forecast who will die in the season 8 of Game of Thrones and when !
                    </p>
                    <p>Rules are simple: you get 1000 points when you predicted a death, 3000 for a correct survival forecast and a bonus of 4000 if you predicted the correct episode of the death</p>
                </Segment>

                <Segment>
                    Menu : <a href='/leaderboard'>check the leaderboard</a> | <a href='/stats'>see the statistics</a> | <a href='/about'>about this</a>
                </Segment>

                {(!this.state.userHasAlreadyVoted) ?
                    <Segment loading={this.state.loading}>
                        <h2>Cast your vote!</h2>

                        <p>For every character please choose if and when they die in season 8</p>

                        <Card.Group itemsPerRow={4}>
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
                                            <a>
                                                <Icon name='bullseye' />
                                                Your forecast ?
                                            </a>
                                            {(!item.isDead) ?
                                                <Select placeholder='Choose from below' name={item.id} options={deathOptions} fluid onChange={this.handleChange} />
                                                : <p>Too late...</p>
                                            }

                                        </Card.Content>
                                    </Card>
                                )
                            })
                            }
                        </Card.Group>

                        <Segment>
                            <Header as='h2'>Ready to make your forecast?</Header>

                            <Message hidden={this.state.tabCharacters.length === Object.keys(this.state.tabUserVotes).length} >
                                <Message.Header>Warning</Message.Header>
                                <p>
                                    You have made a predictions for {Object.keys(this.state.tabUserVotes).length} of the {this.state.tabCharacters.length} characters.
                                </p>
                                <p><em>It's not mandatory but you should forecast for them all! It's your only chance...</em></p>
                            </Message>

                            <Grid columns={2} divided>
                                <Grid.Column key='1'>
                                    <p>
                                        Please input your nickname for the leaderboard (and fame)
                                    </p>
                                    <Input placeholder='Nickame...' fluid onChange={this.handleInput} name='userNickname' />
                                </Grid.Column>
                                <Grid.Column key='2'>
                                    <p>
                                        Not mandatory but you can also add your email address to get news from this
                                    </p>
                                    <Input placeholder='Email...' type='email' fluid onChange={this.handleInput} name='userEmail' />
                                    {/*Todo : si email alors mettre une case à cocher*/}
                                </Grid.Column>
                            </Grid>

                            <Message hidden={!this.state.showMainError} error>
                                <Message.Header>Error</Message.Header>
                                <p>
                                    {this.state.mainError}
                                </p>
                            </Message>
                        </Segment>

                        <Button fluid size='massive' onClick={this.handleSubmission.bind(this)} >Submit my vote !</Button>

                    </Segment>
                    :
                    <Segment>
                        <Header as='h2'>Congratulations, you have already voted!</Header>
                        <p>
                            Now you just have to sit tight and watch the rest of the season 8.
                            <strong>But don't forget to check regularly check out the <a href='/leaderboard'>leaderboard</a> to see where you stand in the battle</strong>
                        </p>
                        <p>
                            Here's the link to your forecast : <a href={Meteor.absoluteUrl() + 'vote/' + this.state.userSlug}>{Meteor.absoluteUrl() + 'vote/' + this.state.userSlug}</a>
                        </p>
                        <p>Share it with the world : twitter|facebook</p>
                    </Segment>
                }

                <a href='https://hosakka-stud.io' style={{ display: 'block', marginTop: '20px' }} target='_blank'>Made with passion by Hosakkā Studio</a>
            </div>
        )
    }

}

export default Home;
