import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Comment } from '@/models/Comment';
import { getUser } from '@/utils/help';
import User from '@/models/User';
import EventModel from '@/models/EventModel';
import { Store } from '@/models/Store';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import { get } from 'lodash';
import Player from '@/models/Player';

// GET 取得活動留言板資訊 - Create comment & GET comment?

export const getComments = async (req: Request, res: Response) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  try {
    const eventId = req.params.eventId;
    const contents = await Comment.find({ eventId: eventId });
    // check if comment exist
    if (!contents || contents.length == 0) {
      return res
        .status(202)
        .send({ contents: contents, message: 'Comments not create yet!' });
    }
    // check if Event exist
    const eventExist = await EventModel.findOne({ idNumber: eventId });
    if (!eventExist) {
      return res.status(404).send({ message: 'Event not found!' });
    }

    res.status(200).send({
      success: true,
      message: '留言板資訊取得成功',
      contents: contents,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error creating comment', error: error });
    console.log({ message: 'Error creating comment', error: error });
  }
};

// POST 建立留言 （玩家）
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
    const userRole = getUser(req).role;
    const eventId = req.params.eventId;
    // check if User exist
    const userExist = await User.findById(author);
    if (!userExist) {
      return res.status(404).send({ message: 'User not found!' });
    }
    // check if Player exist
    const playerExist = await Player.findOne({ user: author });
    if (!playerExist) {
      return res.status(404).send({ message: 'Player not found!' });
    }
    // check if Event exist
    const eventExist = await EventModel.findOne({ idNumber: eventId });
    if (!eventExist) {
      return res.status(404).send({ message: 'Event not found!' });
    }
    // checke if role of user is "player"
    if (userRole !== 'player') {
      return res
        .status(404)
        .send({ message: 'The role of user is not player!' });
    }
    // generate "type" filed
    const typeValue = 'Comment';
    const massageExist = null;
    const storeId = null;
    const player = await Player.findOne({ user: author });
    const authorName = player?.name;
    const avatar = player?.avatar;
    const comment = await Comment.create({
      author,
      authorName: authorName,
      avatar: avatar,
      eventId,
      storeId: storeId,
      content,
      createdAt: dayjs().format(TIME_FORMATTER),
      type: typeValue,
      messageId: massageExist,
    });
    res.status(201).send({ success: true, message: '留言建立成功', comment });
  } catch (err) {
    res.status(500).send({ message: 'Error creating comment', error: err });
    console.log({ message: 'Error creating comment', error: err });
  }
};

// POST 回覆留言

export const createReply = async (req: Request, res: Response) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  try {
    const { content } = req.body;
    const author = getUser(req)._id;
    const eventId = req.params.eventId;
    const messageId = req.params.messageId;
    // check if User exist
    const userExist = await User.findById(author);
    if (!userExist) {
      return res.status(404).send({ message: 'User not found!' });
    }
    // check if Event exist
    const eventExist = await EventModel.findOne({ idNumber: eventId });
    if (!eventExist) {
      return res.status(404).send({ message: 'Event not found!' });
    }
    // check if Store exist
    const storeExist = await Store.findOne({ user: author });
    if (!storeExist) {
      return res.status(404).send({ message: 'Store not found!' });
    }
    // check if role of user is "store"
    const userRole = await User.findById(author);
    if (userRole?.role !== 'store') {
      return res
        .status(404)
        .send({ message: 'The role of user is not store!' });
    }
    // check if message Exist
    const messageExist = await Comment.findById(messageId);
    if (!messageExist) {
      return res.status(404).send({ message: 'Comment not exist!' });
    }
    // generate "type" filed
    const store = await Store.findOne({ user: author });
    const storeId = store?._id;
    const authorName = store?.name;
    const avatar = store?.avatar;
    const typeValue = 'reply';
    // check the event belong to store or not
    const EventBelongStore = await EventModel.find({
      storeId: storeId,
    });
    const EventBelongStoreList = EventBelongStore.map(
      (event) => event.idNumber,
    );
    if (!EventBelongStoreList.includes(eventId)) {
      return res
        .status(404)
        .send({ message: 'The event not belong to your store!' });
    }
    const comment = await Comment.create({
      author,
      authorName: authorName,
      avatar: avatar,
      eventId,
      storeId: storeId,
      content,
      createdAt: dayjs().format(TIME_FORMATTER),
      type: typeValue,
      messageId: messageId,
    });
    res.status(201).send({ success: true, message: '留言建立成功', comment });
  } catch (err) {
    res.status(500).send({ message: 'Error creating comment', error: err });
    console.log({ message: 'Error creating comment', error: err });
  }
};
