const db = require("./db");

async function getUser(searchParam) {
   const query =
      "select * from users u where u.username = ?";
   return await db.searchQuery(query, [searchParam]);
}

module.exports = {
   getUser
}