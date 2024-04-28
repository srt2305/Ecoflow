require("dotenv").config();
const express = require("express");
const cors = require("cors");

const aiQueryRoutes = require("./routes/model-query-routes.js");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    maxAge: 3600 * 24,
  })
);

app.use("/api", aiQueryRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
