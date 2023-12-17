// queries.js
const pool = require("./dbConfig");

const query = async (query, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(query, values, (err, rows) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      }
    });
  });
};

module.exports = { query };
