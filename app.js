var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
//var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var port = process.env.PORT || 3042;
var server = app.listen(port);
var io = require("socket.io").listen(server);

// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
//var indexRouter = require('./routes/index');
//var usersRouter = require("./routes/chat");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// var vaildHeader = function(req, res, next) {
//   var authorController = require("./controllers/authorController");
//       authorController.checkValidUser(req, res, next);
// };
//app.use(vaildHeader);
io.on("connection", function(socket) {
  console.log("Client connected...");
  socket.on("send message", function(sent_msg, callback) {
    console.log("message: " + JSON.stringify(sent_msg));
    // var results = sql.query("SELECT * from apiyh_keys where ak_api_key = ?",[headerData.accesskey],function(error, results, fields) {

    // });
    //socket.join('room1');
    io.sockets.emit("room" + sent_msg.chatid, sent_msg.username, sent_msg.msg);
    //sql.query('INSERT INTO notes (note) VALUES (?)', data.note);
  });

  socket.on("sender", function(data) {
    socket.emit("typing" + data.chatid, data);
    socket.broadcast.emit("typing" + data.chatid, data); //Broadcast the user typing to
    //all the other users over the network
  });
});
//app.use('/', indexRouter);
//app.use("/chat", usersRouter);

//app.listen(port);
console.log("The magic happens on port " + port);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
