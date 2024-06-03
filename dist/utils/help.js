"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
function isRequestWithUser(req) {
    return req.user !== undefined;
}
const getUser = (req) => {
    if (!isRequestWithUser(req)) {
        throw new Error('User not found');
    }
    const user = req.user;
    return user;
};
exports.getUser = getUser;
