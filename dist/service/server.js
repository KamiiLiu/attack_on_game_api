'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = __importDefault(require('../app'));
const connectDB_1 = __importDefault(require('../utils/connectDB'));
const routers_1 = __importDefault(require('../routers'));
const passport_1 = __importDefault(require('passport'));
const PORT = process.env.PORT || 3000;
(0, connectDB_1.default)().then(() => {
  app_1.default.use(passport_1.default.initialize());
  app_1.default.use('/api/v1', routers_1.default);
  app_1.default.listen(PORT, () => {
    console.log(`你現在收看的是http://localhost:${PORT}`);
  });
  app_1.default.get('/', (req, res) => {
    res.status(200).json({ message: '莎莎給油!' });
  });
});
//# sourceMappingURL=server.js.map
