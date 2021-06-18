const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);
// exports.likeSauce = (req, res, next) => {

//   const reqBody = req.body;
//   const like = reqBody.like;
//   const userId = reqBody.userId;

//   Thing.findOne({ _id: req.params.id })
  

//   .then(sauce => {
//       //Si le users like la sauce il se passera:
//       if (like) {
//             Thing.updateOne( //Choisir l'article en question associé au user en question et envoyé le +1 Si user aime l'article
//                   {_id: req.params.id},
//                   {$push: {userLiked: userId}, $inc: {like: +1}},
//                   console.log('Salut je suis +1')
//               )
//           .then(() => res.status(200).json({ message: "Sauce Liké !" }))
//           .catch(error => res.status(400).json({ error }));
//       }else {
//         Thing.updateOne( //Choisir l'article en question associé au user en question et envoyé le -1 si user n'aime pas l'article
//         {_id: req.params.id},
//         {$push: {userDisliked: userId}, $inc: {dislike: -1}},
//         console.log('Bonjour je suis -1')
//         )
//         .then(() => res.status(200).json({ message: "Sauce Disliké !"}))
//         .catch(error => res.status(400).json({ error }));
//       }
//       if(like = 0){
//             Thing.updateOne( //Choisir l'article en question associé au user en question et envoyé le 0 si user annule le choi qu'il a fait d'aimer ou non
//                   {_id: req.params.id},
//                   {$push: {userCancel: userId}, $inc: {cancel: 0}},
//                   console.log('Oui jannule')
//               )
//               .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
//           .catch(error => res.status(400).json({ error }));
//       } 
//   });
// };
