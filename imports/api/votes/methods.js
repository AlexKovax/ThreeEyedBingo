import { Votes } from '/imports/api/votes/_votes.js';
import { Characters } from '/imports/api/characters/_characters.js';
import { Random } from 'meteor/random'

Meteor.methods({
    castVote(userData) {
        //Anti flood protection
        //search for IP in DB, max 30s between same IP
        let ipAdress = this.connection.clientAddress;
        lastvoteIP = Votes.findOne({ IP: this.connection.clientAddress, createdAt: { $gte: new Date(Date.now() - 30000) } });
        if (typeof lastvoteIP !== 'undefined') {
            console.log(ipAdress + ' is flooding apparently');
            throw new Meteor.Error('flood-protection', 'Last submission from same IP is too recent. Wait 30s please.');
        }

        //check data
        if (userData.nickname === '') {
            throw new Meteor.Error('incomplete-data', 'Nickname field was empty');
        } else {
            //sanitize
            userData.nickname = userData.nickname.trim().replace(/<(?:.|\n)*?>/gm, '');
            userSlug = userData.nickname.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            //check if already exists
            existingSlugs = Votes.find({ slug: userSlug }).count();
            if (existingSlugs > 0) {
                throw new Meteor.Error('already-exists', 'Nickname already exists');
            }
        }

        //inject
        userData.slug = userSlug;
        userData.score = 0;
        userData.createdAt = new Date();
        userData.lastModifierAt = new Date();
        userData.IP = ipAdress;
        userData.token = userSlug.slice(0, userSlug.length - 2) + Random.hexString(4);
        Votes.insert(userData);

        console.log(userData.slug + 'has voted !');

        //Todo : create user account (à voir)
        let ret = {};
        ret.slug = userSlug;
        ret.token = userData.token;
        ret.nickname = userData.nickname;

        //return success
        return ret;
    },
    getVoteFromSlug(slug) {
        let tmpVote = Votes.findOne({ slug });
        if (tmpVote) {
            delete tmpVote.IP;
            delete tmpVote.email;
            return tmpVote;
        }

        return;
    },
    getVoteFromToken(token) {
        let tmpVote = Votes.findOne({ token });
        if (tmpVote) {
            delete tmpVote.IP;
            delete tmpVote.email;
            return tmpVote;
        }

        return;
    },
    updateVote(token, tabVotes) {
        if (token === '') {
            throw new Meteor.Error('no-token', 'No token given');
        } else {
            //récupération vote
            let v = Votes.findOne({ token });
            if (v) {
                //update vote
                //garder l'ancien vote dans un tableau
                Votes.update({ token }, { $set: { tabVotes, lastModifierAt: new Date() }, $push: { oldVotes: v.tabVotes } })
            } else {
                throw new Meteor.Error('no-vote', 'Vote not found');
            }
        }
    },
    //TODO : new methode 'updateScores'
    updateScores() {
        //calcul du score et injection dans la BD
        let tabAllVotes = Votes.find({}, { fields: { 'id': 1, 'nickname': 1, 'slug': 1, 'createdAt': 1, 'tabVotes': 1 } }).fetch()
        let tabCharacters = Characters.find().fetch();

        //Todo : calculer les points
        //TODO : important de vérifier que le vote a eu lieu AVANT les episodes concernés
        tabAllVotes.forEach(element => {
            element.score = 0;
            //TMP DEACTIVATED -> à réactiver avec cache
            /*for (var id in element.tabVotes) {
                let char = tabCharacters.filter((item) => { return (item.id === id) })[0];//get character info
                if (element.tabVotes[id] > 0 && char.isDead) {
                    element.score += 1000;
                }

                if (element.tabVotes[id] > 0 && char.deadAtEpisode === element.tabVotes[id]) {
                    element.score += 4000;
                }

                //TODO: compléter après le dernier episode (ou le coder en amont)
            }*/
            delete element.tabVotes;//no need to send it to the front

        });

        //Todo : mettre en cache la réponse pour 5min (augmenter si besoin)
    },
    getAllVotes() {
        let tabAllVotes = Votes.find({}, { fields: { 'id': 1, 'nickname': 1, 'slug': 1, 'createdAt': 1, 'score': 1, 'tabVotes': 1 }, sort: { 'score': -1 } }).fetch()
        return tabAllVotes;
    }
})