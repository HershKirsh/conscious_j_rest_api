const recordingModel = require('./models/recording');
const connection = require('./data/db');

const list = [
    {
        series: 'dt',
        title: 'Introduction to Conscious Judaism',
        ytId: 'X-ueBcX8sp8',
        number: 0,
        date: '2018-12-31T14:49:56.000Z'
    },
    {
        series: 'dt',
        title: 'Positive and negative inner forces.',
        ytId: 'dOgW1ROI0Rc',
        number: 1,
        date: '2019-01-08T07:54:47.000Z'
    },
    {
        series: 'dt',
        title: 'The Torah\'s Premise and Purpose',
        ytId: 'GRj6-TtgFD8',
        number: 2,
        date: '2019-01-18T11:29:31.000Z'
    },
    {
        series: 'dt',
        title: 'Connecting to Divine Consciousness',
        ytId: 'FNJiJzMFkVc',
        number: 3,
        date: '2019-03-26T19:05:19.000Z'
    },
    {
        series: 'dt',
        title: 'Your beliefs create your reality and the reality around you',
        ytId: 'W1KR7cl3l1s',
        number: 4,
        date: '2019-01-31T14:29:07.000Z'
    },
    {
        series: 'dt',
        title: 'Recognize that you are not your thoughts & live in the present',
        ytId: 'KFgjc0ZA7Ck',
        number: 5,
        date: '2019-02-02T23:29:32.000Z'
    },
    {
        series: 'dt',
        title: 'The Ultimate Unity',
        ytId: '_DD0fQlE4FA',
        number: 6,
        date: '2019-02-06T17:28:03.000Z'
    },
    {
        series: 'dt',
        title: 'Reality is bliss, illusion is the cause for suffering',
        ytId: 'QVcJfdXaj8c',
        number: 7,
        date: '2019-03-01T12:32:24.000Z'
    },
    {
        series: 'dt',
        title: 'Your occupation as a human being',
        ytId: 'aB69Bz6O_Z4',
        number: 8,
        date: '2019-03-03T11:07:40.000Z'
    },
    {
        series: 'dt',
        title: 'The relationship between your thoughts and reality',
        ytId: 'LCfxlxLdxlk',
        number: 9,
        date: '2019-03-26T09:32:23.000Z'
    },
    {
        series: 'dt',
        title: 'Treat your soul with kindness',
        ytId: 'IaOyY0iL1tg',
        number: 10,
        date: '2019-03-31T15:56:11.000Z'
    },
    {
        series: 'dt',
        title: 'Becoming Conscious of the one who is Conscious',
        ytId: 'KqfROkL-F9U',
        number: 11,
        date: '2019-04-05T07:40:15.000Z'
    },
    {
        series: 'dt',
        title: 'How to access the wisdom of the Torah',
        ytId: 'MHeVRtol7tc',
        number: 12,
        date: '2019-05-13T15:29:03.000Z'
    },
    {
        series: 'dt',
        title: 'Understanding reality dissolves all evil',
        ytId: 'zNdMZorkzrA',
        number: 13,
        date: '2019-05-15T11:53:51.000Z'
    },
    {
        series: 'dt',
        title: 'The silence behind thought',
        ytId: 'znb_SlrveQE',
        number: 14,
        date: '2019-05-16T10:22:24.000Z'
    },
    {
        series: 'dt',
        title: 'What’s Creating my Senses',
        ytId: '-iL4NTC4JKM',
        number: 15,
        date: '2019-06-15T22:16:58.000Z'
    },
    {
        series: 'dt',
        title: 'Finding The United Spirit That is Identical In All of Us',
        ytId: 'qiVDqA0Qfs4',
        number: 16,
        date: '2019-08-14T15:04:22.000Z'
    },
    {
        series: 'dt',
        title: 'Cleanse Your Inner Essense By Identifying Your True Nature',
        ytId: 'suFbfoOkpw0',
        number: 17,
        date: '2019-08-21T16:03:16.000Z'
    },
    {
        series: 'dt',
        title: 'The Left and Right of Evil and How They Came In To Existence',
        ytId: '1Wy6-8NCfh4',
        number: 18,
        date: '2019-10-12T23:15:57.000Z'
    },
    {
        series: 'dt',
        title: 'The evolution of the spirit to taste the unity requires',
        ytId: '_RkiqlDw8sE',
        number: 19,
        date: '2019-10-27T18:13:11.000Z'
    },
    {
        series: 'dt',
        title: 'Accepting the past is our doorway to the future.',
        ytId: 'fErchlYZVfQ',
        number: 20,
        date: '2019-11-04T20:39:28.000Z'
    },
    {
        series: 'dt',
        title: 'Behaving in accordance with nature is fulfilling the will of the creator.',
        ytId: 'x6QS_IrK4DM',
        number: 21,
        date: '2019-11-18T16:53:25.000Z'
    },
    {
        series: 'dt',
        title: 'Doing the right things for the right reason',
        ytId: 'WPhr-WWZxiY',
        number: 22,
        date: '2019-11-27T19:01:27.000Z'
    },
    {
        series: 'dt',
        title: 'A full surrender requires facing all aspects of reality',
        ytId: 'srtrqCJNbfc',
        number: 23,
        date: '2019-12-12T13:58:39.000Z'
    },
    {
        series: 'dt',
        title: 'The levels of evolution of the spiritual entity residing within our bodies',
        ytId: 'Xe7QQRycqyM',
        number: 24,
        date: '2019-12-18T19:11:17.000Z'
    },
    {
        series: 'dt',
        title: 'Your manifestations are not you, learn how to adjust them to serve humanity',
        ytId: '8cIEeUXgTGA',
        number: 25,
        date: '2020-01-03T09:13:59.000Z'
    },
    {
        series: 'dme',
        title: 'Torah teaches the perfection of creation',
        ytId: '4CpFG7RXYFg',
        number: 0,
        date: '2019-02-03T21:17:11.000Z'
    },
    {
        series: 'dme',
        title: 'Returning to Consciousness',
        ytId: '2kv1gLRYhqY',
        number: 1,
        date: '2019-02-04T17:59:25.000Z'
    },
    {
        series: 'dme',
        title: 'Recognize your Divinity and find yourself in Heaven',
        ytId: '6C23Xi1u4fU',
        number: 2,
        date: '2019-02-12T13:28:23.000Z'
    },
    {
        series: 'dme',
        title: 'Aligning your mouth to reflect your heart',
        ytId: 'GHxZfd7NywQ',
        number: 3,
        date: '2019-02-15T11:28:42.000Z'
    },
    {
        series: 'dme',
        title: 'Tuning in to the signals of your essence',
        ytId: 'MoqLn88OU-Q',
        number: 4,
        date: '2019-03-25T19:24:55.000Z'
    },
    {
        series: 'dme',
        title: 'Language and word associations, how they affect our reality',
        ytId: 'UHhj0qSbLs4',
        number: 5,
        date: '2019-04-02T17:17:25.000Z'
    },
    {
        series: 'dme',
        title: 'Our words build our reality.',
        ytId: 'ZwOjsGTLKe4',
        number: 6,
        date: '2019-05-13T15:17:39.000Z'
    },
    {
        series: 'dme',
        title: 'Living Wise is Living Sacred',
        ytId: 'g9gpYIMGmpQ',
        number: 7,
        date: '2019-05-13T15:14:32.000Z'
    },
    {
        series: 'dme',
        title: 'The limitation and potential language',
        ytId: 'IOv1NdIyqBg',
        number: 8,
        date: '2019-06-03T13:03:44.000Z'
    },
    {
        series: 'dme',
        title: 'The collective conscious effect on the rational thinker',
        ytId: 'RCJrbLbFtMk',
        number: 9,
        date: '2019-06-16T14:18:03.000Z'
    },
    {
        series: 'dme',
        title: 'How To Activate Infinite Potential',
        ytId: 'MwSXqw3h3WE',
        number: 10,
        date: '2019-06-26T14:58:01.000Z'
    },
    {
        series: 'dme',
        title: 'Transforming Your Emotions by Recognizing Their Origin',
        ytId: 'NzArNyWdbP8',
        number: 11,
        date: '2019-08-14T15:04:46.000Z'
    },
    {
        series: 'dme',
        title: 'The Body And The Spirit Both Serve The Intelligence Within',
        ytId: '-fn-ReOt5yY',
        number: 12,
        date: '2019-08-21T16:06:29.000Z'
    },
    {
        series: 'dme',
        title: 'The Proper Fear of Heaven Will Eliminate All Other Fears',
        ytId: 'NUekkPR_PnU',
        number: 13,
        date: '2019-10-12T23:07:39.000Z'
    },
    {
        series: 'dme',
        title: 'The names of Hashem are his messengers',
        ytId: 'URCAeWeK-i4',
        number: 14,
        date: '2019-10-27T18:15:40.000Z'
    },
    {
        series: 'cin',
        title: 'The War between Good and Evil in our time',
        ytId: 'mp-dUydF-M4',
        number: 0,
        date: '2019-10-06T16:58:37.000Z'
    },
    {
        series: 'cin',
        title: 'Synchronizing mind and matter by returning to reality',
        ytId: 'FGbdWvu_wPw',
        number: 1,
        date: '2019-11-20T13:45:25.000Z'
    },
    {
        series: 'cin',
        title: 'Forgiveness, opening the heart to the ultimate unity',
        ytId: 'va8LbX5M1og',
        number: 2,
        date: '2019-10-06T13:14:43.000Z'
    },
    {
        series: 'cin',
        title: 'The Torah Creates The Flavors of Existence',
        ytId: 'dhtGO6X2p5s',
        number: 3,
        date: '2019-11-18T17:33:47.000Z'
    },
    {
        series: 'cin',
        title: 'Man is a microcosm of the zodiac, All forces of nature interact within him',
        ytId: '4hi9PBXkYWA',
        number: 4,
        date: '2019-12-03T19:02:08.000Z'
    },
    {
        series: 'cin',
        title: 'The Cycles of Nature Represent the Cycles of Life',
        ytId: 'kGwQYPtbZ-8',
        number: 5,
        date: '2019-12-09T15:11:09.000Z'
    },
    {
        series: 'cin',
        title: 'The descent of man caused the wisdom to be hidden from him',
        ytId: 'aeV0e3bDuls',
        number: 6,
        date: '2019-12-18T01:00:11.000Z'
    },
    {
        series: 'cin',
        title: 'The conspiracy of man to disregard human nature (2019)',
        ytId: 'D5rFdsrdrKg',
        number: 7,
        date: '2019-11-25T17:16:05.000Z'
    },
    {
        series: 'cin',
        title: 'Finding Hashem requires getting to know your spiritual nature',
        ytId: 'WEvSUradvEM',
        number: 8,
        date: '2019-12-31T18:49:34.000Z'
    },
    {
        series: 'cin',
        title: 'Exile is to learn to take the suffering & happiness we cause more seriously',
        ytId: 'EuS3Lh1kEoY',
        number: 9,
        date: '2020-01-06T17:50:29.000Z'
    },
    {
        series: 'cin',
        title: 'Finding the well of wisdom, In a desert land filled with distractions',
        ytId: 'MzmzyOOI-GI',
        number: 10,
        date: '2019-12-01T04:36:29.000Z'
    },
    {
        series: 'cin',
        title: 'Conscious in Nature EP 13',
        ytId: 'jALjDKbre7s',
        number: 11,
        date: '2019-12-08T14:23:44.000Z'
    },
    {
        series: 'heb',
        title: 'דע את עצמך, החשיבות של האדם על פי הקבלה',
        ytId: '3EwKdhq5bCQ',
        number: 0,
        date: '2019-11-29T13:04:35.000Z'
    },
    {
        series: 'heb',
        title: 'עולם המחשבה, המקור לעולם הדיבור ועולם המעשה',
        ytId: 'JRlcR6r9V2I',
        number: 1,
        date: '2019-12-06T11:43:28.000Z'
    },
    {
        series: 'heb',
        title: 'כח הדיבור, איך הלשון מייצרת את המציאות הרוחנית שלנו',
        ytId: 'QrkqZ6kpCHM',
        number: 2,
        date: '2020-01-08T10:10:49.000Z'
    },
    {
        series: 'heb',
        title: 'נשמת ישראל פרק4 עם יעקב קירש',
        ytId: 'llxOb8X59GA',
        number: 3,
        date: '2019-12-23T23:00:55.000Z'
    },
    {
        series: 'heb',
        title: 'נשמת ישראל פרק 5 עם יעקב קירש',
        ytId: 'cwPY586e4Cc',
        number: 4,
        date: '2020-01-02T14:42:02.000Z'
    },
    {
        series: 'heb',
        title: 'כח הדיבור, איך הלשון מייצרת את המציאות הרוחנית שלנו',
        ytId: 'g-01dBlAVvI',
        number: 5,
        date: '2020-01-09T16:46:48.000Z'
    }
];

recordingModel.insertMany(list)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
