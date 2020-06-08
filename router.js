const express = require('express');
const router = express.Router();
const db = require('./data/dbConfig');

router.get('/', (req, res) => {
  db('accounts')
    .then((accounts) => res.json(accounts))
    .catch((err) => res.status(500).json({ error: 'cannot get accounts' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id })
    .then((accounts) => {
      if (accounts.length) {
        res.json(accounts);
      } else {
        res.status(404).json({ message: 'sorry, could not find that id' });
      }
    })
    .catch((err) => res.status(500).json({ error: 'cannot get accounts' }));
});

router.post('/', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    const account = await db('accounts').insert(payload);
    res.json(account);
  } catch (err) {
    res.status(500).json('failed to post an account');
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db('accounts').where({ id: req.params.id }).del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
