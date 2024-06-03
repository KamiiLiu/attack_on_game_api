'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importStar(require('mongoose'));
const EventSchema = new mongoose_1.Schema({
  storeId: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    ref: 'store',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  eventStartTime: { type: Date, required: true },
  eventEndTime: { type: Date, required: true },
  registrationStartTime: { type: Date, required: true },
  registrationEndTime: { type: Date, required: true },
  isFoodAllowed: { type: Boolean, required: true },
  maxParticipants: { type: Number, required: true },
  minParticipants: { type: Number, required: true },
  currentParticipantsCount: { type: Number, default: 0 }, //TODO:假設這個值不給外面傳入
  participationFee: { type: Number, required: true },
  eventImageUrl: { type: [String], required: true },
  isPublish: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
EventSchema.index({ title: 1, eventStartTime: 1 }, { unique: true });
const Event = mongoose_1.default.model('Event', EventSchema);
exports.default = Event;
//TODO: 檢查有些是required: false
//# sourceMappingURL=Event.js.map
