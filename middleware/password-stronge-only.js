// On importe le models du password
const passwordSchema = require('../models/password');

// On vérifie que le mot de passe respecte le schéma et on renvoie un message si c'est incorrect.
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, 'écrire un mot de passe plus fort en respectant qu`il serait entre 8 et 100 caractères et sans espace et il faut qu`il 2 chiffres."}', {
            'content-type': 'application/json'
        });
        res.end('Le format du mot de passe est incorrect.');
    } else {
        next();
    }
};