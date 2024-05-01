require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAUshmiSaFBPPQUfXb9Y_EK1EkbiyFrROo");
const fs = require("fs");

const aiQueryRoutes = require("./Routes/model-query-routes");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    maxAge: 3600 * 24,
  })
);

app.use("/api", aiQueryRoutes);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, file.originalname + uniqueSuffix);
  },
});

const upload = multer({ storage });

app.post("/api/handle-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = `You are an expert in categorizing waste based on the scale which recognizes the type of waste and the amount of waste. You are working in a waste management company and you are responsible for categorizing the waste. among the following categories plastic, non-renewable, renewable, wet and dry. after classifying suggest how to dispose them in an environmental friendly manner.
      based on the image given answer the following in the given order select the options provided in the parentheses which holds true the most.and give each value like scale and waste type below given value should be given in object  format
     {"Scale": Identify the scale of the waste as one of the following: (small, medium, large)
  "Waste Type": Classify the type of waste from these categories: (non-renewable, renewable)
  "Eco-Friendly Disposal": Suggest the most environmentally friendly way to dispose of this waste type.
  "Recycling Potential": Indicate if this waste type can be recycled, and if so, suggest the appropriate recycling method.}
      `;

  const imageParts = [fileToGenerativePart("./uploads/image.jpg", "image/png")];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  const data = JSON.parse(text);
  console.log("2", data);
  console.log("3", typeof data);
  res.status(200).send({ message: data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
