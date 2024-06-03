// create plyer CRUD controllers
import { Request, Response } from 'express';
import Player from '../models/Player';
import User from '../models/User';
import { validationResult } from 'express-validator';
import { getUser } from '../utils/help';

// create player
export const createPlayer = async (req: Request, res: Response) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res
        .status(400)
        .json({ status: false, message: errors.array()[0].msg });
    }
    const { name, phone, avatar, preferGame } = req.body;
    const userId = getUser(req)._id;
    const role = getUser(req).role;
    // check if the user is an player
    if (role !== 'player') {
      return res
        .status(401)
        .json({ status: false, message: 'You are not an player' });
    }

    // check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    // check if the player exists
    const playerExists = await Player.findOne({ user: userId });
    if (playerExists) {
      return res
        .status(409)
        .json({ status: false, message: 'Player already exists' });
    }
    await Player.create({
      name,
      user: userId,
      phone,
      avatar,
      preferGame,
    });
    res.status(201).json({ status: true, message: 'Player created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "It's has some error when created player data ", error: error });
  }
};

// get player by id
export const getPlayer = async (req: Request, res: Response) => {
  try {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res
        .status(400)
        .json({ status: false, message: errors.array()[0].msg });
    }

    const player = await Player.findOne({ user: req.params.id });
    // check if the player exists
    if (!player) {
      return res
        .status(404)
        .json({ status: false, message: 'Player not found' });
    }
    res.status(200).json({ status: true, data: player });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

// update player
export const updatePlayer = async (req: Request, res: Response) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res
        .status(400)
        .json({ status: false, message: errors.array()[0].msg });
    }
    // udpate player
    const player = await Player.findOneAndUpdate(
      { user: req.params.id },
      req.body,
      { new: true },
    );

    res
      .status(200)
      .json({ status: true, message: 'Player updated', data: player });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
