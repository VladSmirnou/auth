import express from 'express';
import { authenticate } from './auth.js';
import { checkIsAuthorized } from './session-based-auth.js';

export const cardsRouter = express.Router();

const cards = [{id: 1, title: 'card1'}, {id: 2, title: 'card2'}, {id: 3, title: 'card3'}];

cardsRouter.get('/allCards', authenticate, (req, res) => {
  return res.status(200).json(cards);
});

cardsRouter.get('/session-allCards', checkIsAuthorized, (req, res) => {
  return res.status(200).json(cards);
});
