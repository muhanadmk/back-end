const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);

router.post('/', auth, multer, stuffCtrl.createThing);
//get une seul 
router.get('/:id', auth, stuffCtrl.getOneThing);
//modiffer sauce
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
//delete des sauce
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Like Dislake de sauce
router.post('/:id/like', auth, multer, stuffCtrl.aimeSauce);



module.exports = router;