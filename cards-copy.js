import express from 'express';
import { authenticate } from './auth.js';
import multer from 'multer';

export const cardsRouter = express.Router();

const imageComponentSrcOrigin = 'http://127.0.0.1:3001';

let data = [
  {
    id: 1,
    title: 'Card1',
    description: 'descripton1',
    src: `${imageComponentSrcOrigin}/images/firstCard.jpeg`,
  },
  {
    id: 2,
    title: 'Card2',
    description: 'descripton2',
    src: `${imageComponentSrcOrigin}/images/secondCard.jpeg`,
  },
  {
    id: 3,
    title: 'Card3',
    description: 'descripton3',
    src: `${imageComponentSrcOrigin}/images/thirdCard.jpeg`,
  },
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const cards = [{title: 'card1'}, {title: 'card2'}, {title: 'card3'}];

cardsRouter.get('/allCards', authenticate, (req, res) => {
  return res.json(cards);
});

cardsRouter.route('/cards')
.get((req, res) => {
  res.status(200).json(data);  
})
.post(upload.single('cardImage'),(req, res) => {
  const cardData = JSON.parse(req.body.card);
  const file = req.file;

  const newCard = {
    id: Math.max(data.at(-1).id + 1, data.at(0).id + 1),
    title: cardData.title,
    description: cardData.description,
    src: `${imageComponentSrcOrigin}/images/${file.originalname}`
  }
  data.unshift(newCard)

  res.status(201).json({message: 'created'});  
})

cardsRouter.route('/cards/:id')
.get((req, res) => {
    const card = data.find(card => card.id === +req.params.id)
    res.status(200).json(card)
})
.delete(async (req, res) => {
    const cardId = +req.params.id;
    
    const cardDataIndex = data.findIndex(({ id }) => id === cardId);
    if (cardDataIndex > -1) {
      const cardData = data[cardDataIndex];
      console.log(path.parse(cardData.src));

      const fileBase = path.parse(cardData.src).base;
      console.log('fileBase', fileBase);
      
      await fs.unlink(`public/images/${fileBase}`, err => {
        console.log('unlink error');

        if (err) throw err;
      })

      data.splice(cardDataIndex, 1);
      res.status(200).json({message: 'deleted'})
    } else {
      res.status(404).json({message: 'card is not found'})
    }
})