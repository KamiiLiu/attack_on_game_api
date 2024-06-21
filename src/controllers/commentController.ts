import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { commentContentObject } from '@/models/CommentContentObject';
import { getUser } from '@/utils/help';
import User from '@/models/User';
import EventModel from '@/models/EventModel';
import Player from '@/models/Player';

// GET 取得活動留言板資訊

// POST 建立留言

export const createComment = async (req: Request, res: Response) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  try {
    const { content } = req.body;
    const author = getUser(req)._id;
    const eventId = req.params.id;
    // check if User exist
    const userExist = await User.findById(author);
    if (!userExist) {
      return res.status(404).send({ message: 'User not found!' });
    }
    // check if Event exist
    const eventExist = await EventModel.findById(eventId);
    if (!eventExist) {
      return res.status(404).send({ message: 'Event not found!' });
    }
    // checke if role of user is "player"
    const userRole = await User.findById(author);
    if (userRole?.role !== 'player') {
      return res
        .status(404)
        .send({ message: 'The role of user is not player!' });
    }
    const comment = await commentContentObject.create({
      author,
      eventId,
      content,
      createdAt: Date.now(),
    });
    res.status(201).send({ success: true, message: '留言建立成功', comment });
  } catch (err) {
    res.status(500).send({ message: 'Error creating comment', error: err });
    console.log({ message: 'Error creating comment', error: err });
  }
};

// POST 回覆留言
