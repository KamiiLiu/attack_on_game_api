import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '@/models/User';
import { Store } from '@/models/Store';
import { UserRole } from '@/models/User';
import { getUser } from '@/utils/help';

// Create a new store
export const createStore = async (req: Request, res: Response) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  try {
    const { name, phone, avatar, address, introduce } = req.body;
    const userId = getUser(req)._id;
    // check if user exist
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).send({ message: 'User not found' });
    }
    // check if the store exist
    const storeExist = await Store.findOne({ user: userId });
    if (storeExist) {
      return res.status(409).send({ message: 'Store already Exist!' });
    }
    // check if role of user is "store"
    const userRole = await User.findById(userId);
    if (userRole?.role !== 'store') {
      return res
        .status(404)
        .send({ message: 'The role of user is not store!' });
    }

    const store = await Store.create({
      name,
      user: userId,
      avatar,
      introduce,
      address,
      phone,
    });
    res.status(201).send({ success: true, message: '註冊成功', store });
    // console.log({ message: 'Store created successfully!!', store })
  } catch (error) {
    console.error('Error creating store', error);
    res.status(500).send({ message: 'Error creating store', error });
  }
};
// Read all stores
export const getStores = async (req: Request, res: Response) => {
  try {
    const stores = await Store.find();
    res
      .status(200)
      .send({ success: true, message: '店家列表取得成功', data: stores });
  } catch (error) {
    console.error('Error fetching stores', error);
    res.status(500).send({
      message: 'error fetching stores',
      error,
    });
  }
};

// Read store by ID
export const getStoreById = async (req: Request, res: Response) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findById(storeId);

    // if store is null or undefined
    if (!store) {
      res.status(404).send({ message: 'Store not found!' });
      return;
    }
    res.status(200).send({ status: true, data: store });
  } catch (error) {
    console.error('Error fetching store', error);
    res.status(500).send({ message: 'Error fetching store', error });
  }
};

// Update store data
export const updateStore = async (req: Request, res: Response) => {
  // check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }

  try {
    const storeId = req.params.id;
    const updateData = req.body;

    // find storeId
    const store = await Store.findById(storeId);

    if (!store) {
      res.status(404).send({ message: 'Store not found!' });
      return;
    }

    Object.assign(store, updateData);
    await store.save({ validateBeforeSave: true });

    res.status(200).send({ status: true, message: '店家', store });
  } catch (error) {
    console.error('Error updating store', error);
    res.status(500).send({ message: 'Error updating store', error });
  }
};
