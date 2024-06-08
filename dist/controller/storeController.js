'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createStore = void 0;
const user_1 = require('../models/user');
const store_1 = require('../models/store');
// Create 新增店家資料
const createStore = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newUser = yield user_1.User.create({
        email: 'IamWolf@222email.com',
        password: 'ww123',
        role: 'Store',
      });
      console.log('User資料新增成功', newUser);
      const newStore = yield store_1.Store.create({
        name: '狼人之家',
        user: newUser._id,
        avatar: 'path/to/avatar.png',
        introduce: '我愛狼人殺',
        address: '忠孝路一段二號',
        phone: '333-232',
      });
      console.log('Store資料新增成功', newStore);
      res.status(201).send(newStore);
    } catch (error) {
      console.log('資料新增失敗', error);
      res.status(500).send(error);
    }
  });
exports.createStore = createStore;
