import React from 'react';
import { Image, Header, Segment, Message, Card } from 'semantic-ui-react';
import Share from '/imports/ui/Share.jsx'
import HeaderPage from '/imports/ui/HeaderPage.jsx'

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

        if (typeof this.state.voteInfo.createdAt === 'undefined') {
            return (<em>Loading...</em>)
        }

        let shareUrl = '';
        let titleUrl = '';
        if (this.state.voteInfo) {
            shareUrl = Meteor.absoluteUrl() + 'vote/' + this.state.voteInfo.slug;
            titleUrl = 'Three Eyed Bing - discover ' + this.state.voteInfo.nickname + '\'s prediction for Game of Thrones season 8'
        }

        return (
            <div>
                <HeaderPage title={this.state.voteInfo.nickname + '\'s vision'} />

                <Segment loading={this.state.loading}>
                    <Header as='h2'>On {this.state.voteInfo.createdAt.toString().slice(0, 21)}, here's what <em>{this.state.voteInfo.nickname}</em> has predicted !</Header>
                    {(typeof this.state.voteInfo.lastModifierAt === 'object') ? <h3>Last update on {this.state.voteInfo.lastModifierAt.toString().slice(0, 21)}</h3> : ''}

                    <p style={{ textAlign: 'center' }}>
                        Share this forecast on :
                    </p>
                    <Share shareUrl={shareUrl} titleUrl={titleUrl} />

                    <Card.Group>
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
                                    <Card.Content extra>
                                        {(item.isDead && forecast > 0) ? <div>Death guessed => <strong>+1000</strong> pts</div> : ''}
                                        {(item.isDead && forecast === item.deadAtEpisode) ? <div>and exact episode => <strong>+4000</strong> pts</div> : ''}
                                        {(!item.isDead && forecast === 0) ? <div>Survival guessed => <strong>+3000</strong> pts</div> : ''}
                                    </Card.Content>
                                </Card>
                            )
                        })
                        }
                    </Card.Group>
                </Segment>
            </div>
        )
    }

}

export default Vote;
