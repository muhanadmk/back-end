const Thing = require('../models/Thing');
const fs = require('fs');
const { join } = require('path');
const { json } = require('body-parser');

exports.createThing = (req, res, next) => {
  const things = JSON.parse(req.body.sauce);
  things.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  const thing = new Thing({
        userId: things.userId,
        name: things.name,
        manufacturer: things.manufacturer,
        description: things.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        mainPepper: things.mainPepper,
        heat: things.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
  });
  thing.save().then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.aimeSauce = (req, res, next) => {

  // const reqBody = req.body;
  const like = req.body.like;
  const userId = req.body.userId;

  Thing.findOne({ _id: req.params.id })
  

  .then(sauce => {
      //Si le users like la sauce il se passera:
      switch(like) {
          case +1:
            Thing.updateOne( //Choisir l'article en question associé au user en question et envoyé le +1 Si user aime l'article
                  {_id: req.params.id},
                  {$push: {userLiked: userId}, $inc: {like: +1}},
              )
          .then(() => res.status(200).json({ message: "Sauce Liké !" }))
          .catch(error => res.status(400).json({ error }));
          break;

          case -1:
            Thing.updateOne( //Choisir l'article en question associé au user en question et envoyé le -1 si user n'aime pas l'article
                  {_id: req.params.id},
                  {$push: {userDisliked: userId}, $inc: {dislike: -1}},
                  console.log('Bonjour je suis -1')
              )
          .then(() => res.status(200).json({ message: "Sauce Disliké !"}))
          .catch(error => res.status(400).json({ error }));
          break;


          case 0:
            Thing.updateOne( //Choisir l'article en question associé au user en question et envoyé le 0 si user annule le choi qu'il a fait d'aimer ou non
                  {_id: req.params.id},
                  {$push: {userCancel: userId}, $inc: {cancel: 0}},
                  console.log('Oui jannule')
              )
              .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
          .catch(error => res.status(400).json({ error }));
          break;
      }
  });
};
