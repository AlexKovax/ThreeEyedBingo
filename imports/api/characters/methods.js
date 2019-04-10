import { Characters } from '/imports/api/characters/_characters.js';

Meteor.methods({
    getAllCharacters() {
        //TODO : cache fichier json à la place
        return Characters.find().fetch();
    }
})