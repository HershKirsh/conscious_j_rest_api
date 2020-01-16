const playlistModel = require('./models/playlists');
const connection = require('./data/db');

const playlists = [
    {
        playlistId: 'PL4liHFF6vAIoxrk89iS2QlOIvkGK5ssc8',
        series: 'dt',
        length: 26,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    },
    {
        playlistId: 'PL4liHFF6vAIozZwxJcgMTyviqET3YrRGc',
        series: 'dme',
        length: 15,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    },
    {
        playlistId: 'PL4liHFF6vAIpw4UNKcb-0N4R3IaPomzOw',
        series: 'cin',
        length: 12,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    },
    {
        playlistId: 'PL4liHFF6vAIrBICjb4vUpOBA2bSQPtkcK',
        series: 'heb',
        length: 5,
        lastUpdated: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    }
];

playlistModel.insertMany(playlists)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });