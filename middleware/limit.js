const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60* 60* 1000,
    max: 60,
    message: "vous avez fait beaucoup de requêtes, attendez une heure pour réessayer s'il vous plaît"
});

module.exports = limiter;