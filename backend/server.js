const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "vocabulary.json");

app.use(cors());
app.use(bodyParser.json());

// Helper to read vocabulary from file
function readVocabulary() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
}

// Helper to write vocabulary to file
function writeVocabulary(vocabList) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(vocabList, null, 2), "utf8");
}

// Add 'meaning' to the POST endpoint
app.post("/api/vocabulary", (req, res) => {
  const { word, exampleSentence, translatedSentence, meaning } = req.body;
  if (!word || !exampleSentence || !translatedSentence || !meaning) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const vocabList = readVocabulary();
  vocabList.push({
    word,
    exampleSentence,
    translatedSentence,
    meaning,
    isRevised: false,
  });
  writeVocabulary(vocabList);
  res.status(201).json({ message: "Vocabulary added." });
});

// Get all vocabulary items
app.get("/api/vocabulary", (req, res) => {
  const vocabList = readVocabulary();
  res.json(vocabList);
});

// Get a random vocabulary item
app.get("/api/vocabulary/random", (req, res) => {
  const vocabList = readVocabulary().filter((item) => !item.isRevised);
  if (vocabList.length === 0) {
    return res.status(404).json({ error: "No vocabulary found." });
  }
  const randomIndex = Math.floor(Math.random() * vocabList.length);
  res.json(vocabList[randomIndex]);
});

// Add reset endpoint
app.post("/api/vocabulary/reset", (req, res) => {
  const vocabList = readVocabulary().map((item) => ({
    ...item,
    isRevised: false,
  }));
  writeVocabulary(vocabList);
  res.json({ message: "All vocabulary reset." });
});

// Add PATCH endpoint to mark a word as revised
app.patch("/api/vocabulary/revised", (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required." });
  const vocabList = readVocabulary();
  let updated = false;
  for (const item of vocabList) {
    if (item.word === word) {
      item.isRevised = true;
      updated = true;
    }
  }
  if (updated) {
    writeVocabulary(vocabList);
    res.json({ message: "Word marked as revised." });
  } else {
    res.status(404).json({ error: "Word not found." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
