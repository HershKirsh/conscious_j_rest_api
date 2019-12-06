const https = require('https');
const recordingModel = require('./models/recording');
const connection = require('./data/db');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const YD = new YoutubeMp3Downloader({
    "ffmpegPath": "ffmpeg",
    "outputPath": "audio",
    "youtubeVideoQuality": "highest",
    "queueParallelism": 2,
    "progressTimeout": 2000
});
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './audio');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const playlists = [
    {
        id: 'PL4liHFF6vAIoxrk89iS2QlOIvkGK5ssc8',
        abbrv: 'dt'
    },
    {
        id: 'PL4liHFF6vAIozZwxJcgMTyviqET3YrRGc',
        abbrv: 'dme'
    },
    {
        id: 'PL4liHFF6vAIpw4UNKcb-0N4R3IaPomzOw',
        abbrv: 'cin'
    },
    {
        id: 'PL4liHFF6vAIrBICjb4vUpOBA2bSQPtkcK',
        abbrv: 'heb'
    }
];

playlists.forEach(playlist => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=2&playlistId=${playlist.id}&fields=items%2FcontentDetails%2FvideoId%2Citems%2Fsnippet(title%2Cposition%2CpublishedAt)&key=${process.env.GOOGLE_KEY}`;
    const req = https.get(url, res => {
        console.log(`statusCode: ${res.statusCode}`)
        let data = '';
        res.on('data', d => {
            data += d;
        })
        req.on('error', error => {
            console.error(error)
        })
        res.on('end', () => {
            let dataArray = JSON.parse(data);
            dataArray.items.forEach(item => {
                let modifiedTitle = item.snippet.title.split(/(: ?)/).pop();
                YD.download(item.contentDetails.videoId, modifiedTitle + '.mp3');
                YD.on("finished", function (err, data) {
                    console.log(JSON.stringify(data));
                    let newItem = new recordingModel({
                        series: playlist.abbrv,
                        title: modifiedTitle,
                        audioLink: `audio/${modifiedTitle}.mp3`,
                        ytLink: item.contentDetails.videoId,
                        number: item.snippet.position,
                        date: item.snippet.publishedAt
                    });
                    newItem
                        .save()
                        .then(result => {
                            console.log(result);
                            console.log('Recording Added');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
                YD.on("error", function (error) {
                    console.log(error);
                });
                YD.on("progress", function (progress) {
                    if (parseInt(progress.progress.percentage) % 10 === 0) {
                        console.log(`Video ID: ${progress.videoId} Downloaded ${parseInt(progress.progress.percentage)}%`);
                    }
                });
            });
        })
        req.end()
    })
});
