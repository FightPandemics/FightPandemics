const mongoose = require("mongoose");

// module.exports = {
//   connectToDatabase: function (done) {
//     mongoose.connect("mongodb://mongo/fightpandemics", function (error) {
//       if (error) console.error("Error while connecting:\n%\n", error);
//       console.log("connected");
//       done(error);
//     });
//   },

//   disconnect: function (done) {
//     mongoose.connection.close();
//     console.log("disconnected");
//     done();
//   },
// };

exports.connectToDatabase = async () => {
  mongoose.connect("mongodb://mongo/fightpandemics", function (error) {
    if (error) console.error("Error while connecting:\n%\n", error);
    console.log("connected");
    done(error);
  });
};

// exports.closeDbConnection = async () => {
//   mongoose.connection.close();
//   console.log("disconnected");
// };
