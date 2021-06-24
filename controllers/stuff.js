const Sauce = require('../models/Sauce');
const fs = require('fs');
const { join } = require('path');
const { json } = require('body-parser');

exports.createSauce = (req, res, next) => {
  const sauces = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
        userId: sauces.userId,
        name: sauces.name,
        manufacturer: sauces.manufacturer,
        description: sauces.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        mainPepper: sauces.mainPepper,
        heat: sauces.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
  });
  sauce.save().then(() => {
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

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const SauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...SauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
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
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
     switch (req.body.like) {
       // le cas de dislike
         case -1:
          Sauce.updateOne({ _id: req.params.id }, {
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
              Sauce.updateOne({ _id : req.params.id }, {
                  $inc: {likes:-1},
                  $pull: {usersLiked: req.body.userId},
                  _id: req.params.id
              })
              .then(() => res.status(201).json({message: ' Like retiré !'}))
              .catch( error => res.status(400).json({ error }))
             }
          //si on trouve l’user dans le usersDisliked on va le supprimer et supprimer le dislike egalment
             if (sauce.usersDisliked.find(user => user === req.body.userId)) {
              Sauce.updateOne({ _id : req.params.id }, {
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
            Sauce.updateOne({ _id: req.params.id }, {
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