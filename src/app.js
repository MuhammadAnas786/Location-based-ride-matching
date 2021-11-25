import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import useragent from "express-useragent";
import routes from "./routes/index";
// var usersRouter = require('./routes/users');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", true);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.use(useragent.express());
app.use("/api/v1", routes, cors());
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
}
// error handler
app.use((req, res) => {
  res.status(404).json({
    message: ["Request resource not found."],
    url: req.originalUrl,
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
