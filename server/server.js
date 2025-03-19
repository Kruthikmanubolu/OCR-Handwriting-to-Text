require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const vision = require("@google-cloud/vision");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const [result] = await client.textDetection(req.file.buffer);
        let extractedText = result.textAnnotations[0]?.description || "No text found";
        
        // Split the text into paragraphs based on double newlines or other patterns
        const paragraphs = extractedText.split(/\n\n+/).map(paragraph => paragraph.trim());

        res.json({ text: paragraphs.join("\n\n") });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "OCR processing failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
