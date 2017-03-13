

const find = [
    findAll
];

function findAll (req, res, next) {
    res.status(200).json([
        {
            name: 'chriba',
            description: 'CHRIBA AS er et investeringsselskap med hovedvekt på næringseiendom. Selskapet har kontor i Oslo.',
            thumb: '/resource/chriba.png',
            page: 'http://chriba.no'
        },
        {
            name: 'iBok',
            description: 'iBok.no er Norges største markedsplass for kjøp og salg av brukte bøker. Tjenesten er helt gratis i bruk både for kjøp og salg',
            thumb: '/resource/ibok.png',
            page: 'https://ibok.no'
        }
    ]);
}


module.exports = { find };