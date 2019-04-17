import React from 'react';
import { Container, Segment, Card, Image, Icon, Select, Button, Input, Grid, Message, Header } from 'semantic-ui-react';
import { Session } from 'meteor/session'
import HeaderHome from '/imports/ui/HeaderHome.jsx'
import Share from '/imports/ui/Share.jsx'

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
            userToken: '',
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
        if (Session.get('wdmSlug') && Session.get('wdmToken')) {
            this.setState({
                mainSegmentHidden: true, loading: false,
                userHasAlreadyVoted: true, userSlug: Session.get('wdmSlug'),
                userNickname: Session.get('wdmNickname'),
                userToken: Session.get('wdmToken')
            })
        } else {
            //récupération des personnages si jamais pas de session
            Meteor.call('getAllCharacters', (err, res) => {
                if (res) {
                    this.setState({ tabCharacters: res, loading: false })
                } else {
                    console.log(err);
                    this.setState({ mainSegmentHidden: true, loading: false });
                    alert('Error on load');
                }
            })

        }

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

        //Send vote to backend
        this.setState({ loading: true })
        Meteor.call('castVote', userData, (err, res) => {
            if (err) {
                console.log(err);
                //Handle error
                let errorText = 'There was an error while sending your vote...';
                if (err.error === 'incomplete-data') {
                    errorText = 'Some fields are missing...'
                } else if (err.error === 'already-exists') {
                    errorText = 'This nickname is already taken. Please choose another one...'
                } else {
                    errorText = err.reason;
                }
                this.setState({ loading: false, showMainError: true, mainError: errorText })
            } else {
                //update UI and state
                this.setState({ mainSegmentHidden: true, loading: false, userHasAlreadyVoted: true, userSlug: res.slug, userToken: res.token })
                //Set session
                Session.setPersistent({ 'wdmSlug': res.slug, 'wdmToken': res.token, 'wdmNickname': res.nickname });
            }

        })
    }

    render() {

        let deathOptions = [];

        for (let i = 1; i < 7; i++) {
            deathOptions.push({ key: 'dies' + i, text: 'Dies at episode ' + i, value: i });
        }
        deathOptions.push({ key: 'neverdies', text: 'Never dies', value: 0 })

        let shareUrl = '';
        let titleUrl = '';
        if (this.state.userHasAlreadyVoted) {
            shareUrl = Meteor.absoluteUrl() + 'vote/' + this.state.userSlug;
            titleUrl = 'Three Eyed Bing - discover ' + this.state.userNickname + '\'s prediction for Game of Thrones season 8'
        }

        //adjust UI
        let mobileMode = false;
        if (window.innerWidth < 641) {
            mobileMode = true;
        }

        //display UI
        return (

            <div>

                <HeaderHome />

                <div id='predict' className='voteHome'>

                    {(!this.state.userHasAlreadyVoted) ?
                        <div>
                            <Segment loading={this.state.loading} hidden={this.state.mainSegmentHidden}>
                                <h2>Register your visions</h2>

                                <p className='descVoteHome'>For every character, please focus and have a vision for their lives and deaths at the end of S8</p>

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
                                                    <a>
                                                        <Icon name='bullseye' />
                                                        Your forecast ?
                                                    </a>
                                                    {/*TODO : on mobile use native select*/}
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
                            </Segment>


                            <h2 className='voteHeader' hidden={this.state.mainSegmentHidden}>Ready to set in stone your visions?</h2>

                            <Container hidden={this.state.mainSegmentHidden}>

                                <Message hidden={this.state.tabCharacters.length === Object.keys(this.state.tabUserVotes).length} >
                                    <Message.Header>Warning</Message.Header>
                                    <p>
                                        You have made a prediction for {Object.keys(this.state.tabUserVotes).length} of the {this.state.tabCharacters.length} characters.
                                    </p>
                                </Message>

                                <Grid columns={(mobileMode) ? 1 : 2} className='detailsVoteHome'>
                                    <Grid.Column key='1'>
                                        <label>Nickname</label>
                                        <Input placeholder='Nickame...' fluid onChange={this.handleInput} name='userNickname' />
                                        <p>
                                            Please input your nickname for the leaderboard (and eternal fame)
                                        </p>
                                    </Grid.Column>
                                    <Grid.Column key='2'>
                                        <label>Email</label>
                                        <Input placeholder='Email...' type='email' fluid onChange={this.handleInput} name='userEmail' />
                                        <p>
                                            Not mandatory but you can also add your email address to get news from the game. If you fill it, you accept to be contacted by us (not spammed!)
                                        </p>
                                    </Grid.Column>
                                </Grid>

                                <Message hidden={!this.state.showMainError} error>
                                    <Message.Header>Error</Message.Header>
                                    <p>
                                        {this.state.mainError}
                                    </p>
                                </Message>

                                <Button color='black' fluid size='massive' onClick={this.handleSubmission.bind(this)} >Submit my prediction !</Button>
                            </Container>

                        </div>
                        :
                        <Segment className='alreadyVotedHome'>
                            <h2>Congratulations, you are part of the wargs!</h2>
                            <p>This is your secret token: <strong>{this.state.userToken}</strong>, don't lose it! It will allow you to update your visions later on.</p>
                            <p>
                                Now you just have to sit tight and watch the rest of the season 8 to see how powerful were your visions.
                            </p>
                            <p>
                                <strong>But don't forget to check regularly check out the <a href='/leaderboard'>leaderboard</a> to see where you stand in the battle of the wargs</strong>. We will also update this regularly with new features and a better design.
                            </p>
                            <p>
                                And also here's the link to your forecast : <a href={shareUrl}>{shareUrl}</a>
                            </p>
                            <p>Share it with the world :</p>
                            <Share shareUrl={shareUrl} titleUrl={titleUrl} />

                        </Segment>
                    }
                </div>

                <div className='footer'>
                    <a href='https://hosakka-stud.io' style={{ display: 'block', marginTop: '20px' }} target='_blank'>Made with passion by Hosakkā Studio</a>
                </div>
            </div>
        )
    }

}

export default Home;
