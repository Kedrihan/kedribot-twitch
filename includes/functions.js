let connection = require("./dbHandler.js");

module.exports = {
    addToDb: function(message, context) {
        let sql = "INSERT INTO messages (auteur, message, date_heure) VALUES (?, ?, ?)";
        connection.query(sql, [context.username, message, Date.now()], (err) => {
      if (err) console.log(err);
    });
    },
}