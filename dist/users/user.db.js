"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDB = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const user_model_1 = require("./user.model");
const pool_1 = require("../db/pool");
exports.userDB = (0, node_postgres_1.drizzle)(pool_1.pool, { schema: { users: user_model_1.users } });
