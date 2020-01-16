const playlistModel = require('./models/playlists');
const connection = require('./data/db');

const playlists = [
    {
        id: 'PL4liHFF6vAIoxrk89iS2QlOIvkGK5ssc8',
        series: 'dt',
        length: 0,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    },
    {
        id: 'PL4liHFF6vAIozZwxJcgMTyviqET3YrRGc',
        series: 'dme',
        length: 0,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    },
    {
        id: 'PL4liHFF6vAIpw4UNKcb-0N4R3IaPomzOw',
        series: 'cin',
        length: 0,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    },
    {
        id: 'PL4liHFF6vAIrBICjb4vUpOBA2bSQPtkcK',
        series: 'heb',
        length: 0,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    }
];

playlistModel.insertMany(list)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });