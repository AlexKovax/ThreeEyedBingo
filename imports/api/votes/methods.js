import { Votes } from '/imports/api/votes/_votes.js';


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
        userData.IP = this.connection.clientAddress;
        console.log(userData);
        Votes.insert(userData);

        //return success
        return userSlug;
    },
    getVoteFromSlug(slug) {
        let tmpVote = Votes.findOne({ slug });
        if (tmpVote) {
            delete tmpVote.IP;
            delete tmpVote.email;
            return tmpVote;
        }

        return;
    }
})