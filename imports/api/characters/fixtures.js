//////////////////////////
// Characters fixtures //
////////////////////////

import { Characters } from '/imports/api/characters/_characters.js';


//Effacer
Characters.remove({});

//Init tab
let tabCharacters = [
    { id: 'jonsnow', name: 'Jon Snow', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'dany', name: 'Daenerys Targaryen', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'cersei', name: 'Cersei Lannister', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'tyrion', name: 'Tyrion Lannister', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'sansa', name: 'Sansa Stark', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'arya', name: 'Arya Stark', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'bran', name: 'Bran Stark', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'jaime', name: 'Jaime Lannister', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'brienne', name: 'Brienne of Tarth', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'theon', name: 'Theon Greyjoy', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'sam', name: 'Samwell Tarly', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'davos', name: 'Davos Seaworth', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'mountain', name: 'The Mountain', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'varys', name: 'Varys', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'jorah', name: 'Jorah Mormont', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'melisandre', name: 'Melisandre', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'euron', name: 'Euron Greyjoy', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'hound', name: 'The Hound', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'bronn', name: 'Bronn', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'tormund', name: 'Tormund Giantsbane', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'gendry', name: 'Gendry', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'yara', name: 'Yara Greyjoy', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'greyworm', name: 'Grey Worm', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'missandei', name: 'Missandei', info: '', deadAtEpisode: 4, isDead: true, dateOfDeath: new Date(('2019-05-06T03:00:00')) },
    { id: 'daario', name: 'Daario Naharis', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'jaqen', name: 'Jaqen H’ghar', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'beric', name: 'Beric Dondarrion', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'meera', name: 'Meera Reed', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'podrick', name: 'Podrick Payne', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'gilly', name: 'Gilly', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'lyanna', name: 'Lyanna Mormont', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'ellaria', name: 'Ellaria Sand', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'qyburn', name: 'Qyburn', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'robin', name: 'Robin Arryn', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'hotpie', name: 'Hot Pie', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null },
    { id: 'eddison', name: 'Eddison Tollett', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'nightking', name: 'Night King', info: '', deadAtEpisode: 3, isDead: true, dateOfDeath: new Date(('2019-04-29T03:00:00')) },
    { id: 'rhaegal', name: 'Raeghal', info: '', deadAtEpisode: 4, isDead: true, dateOfDeath: new Date(('2019-05-06T03:00:00')) },
    { id: 'drogon', name: 'Drogon', info: '', deadAtEpisode: 0, isDead: false, dateOfDeath: null }
]

//Injection in the BD
tabCharacters.forEach(element => {
    element.image = element.id + '.jpeg';
    Characters.insert(element);
});
