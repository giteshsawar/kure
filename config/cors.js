const whiteListURLS = ["http://localhost:3000"];
module.exports = {
  credentials: true,
  origin: function(origin, callback) {
    console.log("origin", whiteListURLS.indexOf(origin), origin);
    if (whiteListURLS.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback("unauthorized Domain", false);
    }
  }
};
