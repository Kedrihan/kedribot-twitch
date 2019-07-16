let connection = require("./dbHandler.js");

module.exports = {
    addToDb: function(message, context) {
        let sql = "INSERT INTO messages (auteur, message) VALUES (?, ?)";
        connection.query(sql, [context.username, message], (err) => {
      if (err) console.log(err);
    });
    },
}