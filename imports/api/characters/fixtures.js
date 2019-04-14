//////////////////////////
// Characters fixtures //
////////////////////////

import { Characters } from '/imports/api/characters/_characters.js';


//Effacer
Characters.remove({});

//Init tab
let tabCharacters = [
    { id: 'jonsnow', name: 'Jon Snow', info: '' },
    { id: 'dany', name: 'Daenerys Targaryen', info: '' },
    { id: 'cersei', name: 'Cersei Lannister', info: '' },
    { id: 'tyrion', name: 'Tyrion Lannister', info: '' },
    { id: 'sansa', name: 'Sansa Stark', info: '' },
    { id: 'arya', name: 'Arya Stark', info: '' },
    { id: 'bran', name: 'Bran Stark', info: '' },
    { id: 'jaime', name: 'Jaime Lannister', info: '' },
    { id: 'brienne', name: 'Brienne of Tarth', info: '' },
    { id: 'theon', name: 'Theon Greyjoy', info: '' },
    { id: 'sam', name: 'Samwell Tarly', info: '' },
    { id: 'davos', name: 'Davos Seaworth', info: '' },
    { id: 'mountain', name: 'The Mountain', info: '' },
    { id: 'varys', name: 'Varys', info: '' },
    { id: 'jorah', name: 'Jorah Mormont', info: '' },
    { id: 'melisandre', name: 'Melisandre', info: '' },
    { id: 'euron', name: 'Euron Greyjoy', info: '' },
    { id: 'hound', name: 'The Hound', info: '' },
    { id: 'bronn', name: 'Bronn', info: '' },
    { id: 'tormund', name: 'Tormund Giantsbane', info: '' },
    { id: 'gendry', name: 'Gendry', info: '' },
    { id: 'yara', name: 'Yara Greyjoy', info: '' },
    { id: 'greyworm', name: 'Grey Worm', info: '' },
    { id: 'missandei', name: 'Missandei', info: '' },
    { id: 'daario', name: 'Daario Naharis', info: '' },
    { id: 'jaqen', name: 'Jaqen H’ghar', info: '' },
    { id: 'beric', name: 'Beric Dondarrion', info: '' },
    { id: 'meera', name: 'Meera Reed', info: '' },
    { id: 'podrick', name: 'Podrick Payne', info: '' },
    { id: 'gilly', name: 'Gilly', info: '' },
    { id: 'lyanna', name: 'Lyanna Mormont', info: '' },
    { id: 'ellaria', name: 'Ellaria Sand', info: '' },
    { id: 'qyburn', name: 'Qyburn', info: '' },
    { id: 'robin', name: 'Robin Arryn', info: '' },
    { id: 'hotpie', name: 'Hot Pie', info: '' },
    { id: 'eddison', name: 'Eddison Tollett', info: '' },
    { id: 'nightking', name: 'Night King', info: '' },
    { id: 'rhaegal', name: 'Raeghal', info: '' },
    { id: 'drogon', name: 'Drogon', info: '' }
]

//Injection in the BD
tabCharacters.forEach(element => {
    element.isDead = false;
    element.deadAtEpisode = 0;
    element.dateOfDeath = null;
    element.image = element.id + '.jpeg';
    Characters.insert(element);
});
