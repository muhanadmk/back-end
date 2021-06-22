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

exports.likeSauce = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
 .then(sauce => {
     switch (req.body.like) {
       // le cas de dislike
         case -1:
             Thing.updateOne({ _id: req.params.id }, {
               //ajouetr dilike qui singfi -1  et le user qui fait au usersDisliked
                 $inc: {dislikes:1},
                 $push: {usersDisliked: req.body.userId},
                 _id: req.params.id
             })
                 .then(() => res.status(201).json({ message: 'Dislike ajouté !'}))
                 .catch( error => res.status(400).json({ error }))
             break;
             //le cas d'annulation pour un like ou pour un dislike
         case 0:
         //si on trouve l’user dans le usersLiked on va le supprimer et supprimer le like egalment
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
              Thing.updateOne({ _id : req.params.id }, {
                  $inc: {likes:-1},
                  $pull: {usersLiked: req.body.userId},
                  _id: req.params.id
              })
              .then(() => res.status(201).json({message: ' Like retiré !'}))
              .catch( error => res.status(400).json({ error }))
             }
          //si on trouve l’user dans le usersDisliked on va le supprimer et supprimer le dislike egalment
             if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                 Thing.updateOne({ _id : req.params.id }, {
                     $inc: {dislikes:-1},
                     $pull: {usersDisliked: req.body.userId},
                     _id: req.params.id
                 })
                .then(() => res.status(201).json({message: ' Dislike retiré !'}))
                .catch( error => res.status(400).json({ error }));
             }
             break;
             //si le cas d'un like
         case 1:
             Thing.updateOne({ _id: req.params.id }, {
               //ajouetr like qui singfi +1  et le user qui fait au usersliked
                 $inc: { likes:1},
                 $push: { usersLiked: req.body.userId},
                 _id: req.params.id
             })
              .then(() => res.status(201).json({ message: 'Like ajouté !'}))
              .catch( error => res.status(400).json({ error }));
             break;
         default:
             return res.status(500).json({ error });
     }
 })
 .catch(error => res.status(500).json({ error }))
};