import db from "./db.js";
import User from "./User.js";
function syncDB() {
  db.sync().catch(console.error);
}

export { syncDB, User };
