const Player = require('../models/Player');

exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.status(200).json(players);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.update(req.body);
      res.status(200).json(player);
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.destroy();
      res.status(200).json({ message: 'Player deleted' });
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
