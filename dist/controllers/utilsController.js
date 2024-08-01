"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventModel_1 = __importDefault(require("@/models/EventModel"));
const lodash_1 = __importDefault(require("lodash"));
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
function createDate(days, hour) {
    return (0, dayjs_1.default)()
        .add(days, 'day')
        .hour(hour)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format(TIME_FORMATTER_1.default);
}
const utilsController = {
    freshEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('sss');
                const eventList = yield EventModel_1.default.find();
                const updates = eventList.map((e) => {
                    const numbers = lodash_1.default.sortBy(lodash_1.default.sampleSize(lodash_1.default.range(1, 25), 4));
                    const registrationStartTime = createDate(-numbers[0], numbers[0]);
                    const registrationEndTime = createDate(numbers[1], numbers[1]);
                    const eventStartTime = createDate(numbers[2], numbers[2]);
                    const eventEndTime = createDate(numbers[3], numbers[3]);
                    return {
                        updateOne: {
                            filter: { _id: e._id },
                            update: {
                                registrationStartTime,
                                registrationEndTime,
                                eventStartTime,
                                eventEndTime,
                            },
                        },
                    };
                });
                yield EventModel_1.default.bulkWrite(updates);
                res.status(200).json({ status: true, menubar: '更新成功' });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = utilsController;
//# sourceMappingURL=utilsController.js.map