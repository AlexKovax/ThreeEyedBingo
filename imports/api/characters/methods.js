import { Characters } from '/imports/api/characters/_characters.js';

Meteor.methods({
    getAllCharacters() {
        return Characters.find().fetch();
    }
})