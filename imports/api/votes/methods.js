import { Votes } from '/imports/api/votes/_votes.js';
import { Characters } from '/imports/api/characters/_characters.js';
import { Random } from 'meteor/random'

Meteor.methods({
    castVote(userData) {
        console.log(userData);
        //Anti flood protection
        //search for IP in DB, max 30s between same IP

        //check data
        if (userData.nickname === '') {
            throw new Meteor.Error('incomplete-data', 'Nickname field was empty');
        } else {
            //sanitize
            userData.nickname = userData.nickname.replace(/<(?:.|\n)*?>/gm, '');
            userSlug = userData.nickname.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            //check if already exists
            existingSlugs = Votes.find({ slug: userSlug }).count();
            if (existingSlugs > 0) {
                throw new Meteor.Error('already-exists', 'Nickname already exists');
            }
        }

        //inject
        userData.slug = userSlug;
        userData.createdAt = new Date();
        userData.lastModifierAt = new Date();
        userData.IP = this.connection.clientAddress;
        userData.token = userSlug.slice(0, userSlug.length - 2) + Random.hexString(4);
        console.log(userData);
        Votes.insert(userData);

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
    getAllVotes() {
        let tabAllVotes = Votes.find({}, { fields: { 'id': 1, 'nickname': 1, 'slug': 1, 'createdAt': 1, 'tabVotes': 1 } }).fetch()
        let tabCharacters = Characters.find().fetch();

        //Todo : calculer les points
        //TODO : important de vérifier que le vote a eu lieu AVANT les episodes concernés
        tabAllVotes.forEach(element => {
            element.score = 0;
            for (var id in element.tabVotes) {
                let char = tabCharacters.filter((item) => { return (item.id === id) })[0];//get character info
                if (element.tabVotes[id] > 0 && char.isDead) {
                    element.score += 1000;
                }

                if (element.tabVotes[id] > 0 && char.deadAtEpisode === element.tabVotes[id]) {
                    element.score += 4000;
                }

                //TODO: compléter après le dernier episode (ou le coder en amont)
            }
            delete element.tabVotes;//no need to send it to the front

        });

        //Todo : mettre en cache la réponse pour 5min (augmenter si besoin)

        return tabAllVotes;
    }
})