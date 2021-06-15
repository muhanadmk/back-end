const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: Number},
  usersDisliked: { type: Number},
});

module.exports = mongoose.model('Thing', thingSchema);


//  // likes: { type: Number, required: true },
//   // dislikes: { type: Number, required: true },
//   // usersLiked: { type: Number, required: true },
//   // usersDisliked: { type: Number, required: true },


// userId: thingObject.userId,
// name: req.body.name,
// manufacturer: req.body.manufacturer,
// mainPepper: req.body.mainPepper,
// description: req.body.description,
// imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
// heat: req.body.heat,
// likes: req.body.likes,
// dislikes: req.body.dislikes,
// usersLiked: req.body.usersLiked,
// usersDisliked: req.body.usersDisliked,

// userId: things.userId,
//     name: req.things.name,
//     manufacturer: things.manufacturer,
//     mainPepper: things.mainPepper,
//     description: things.description,
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//     heat: things.heat,