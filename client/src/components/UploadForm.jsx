import { useState } from "react";
import axios from "axios";
import { FaPlay, FaPause, FaDownload, FaFileUpload } from "react-icons/fa";

function UploadForm() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [isReading, setIsReading] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const [error, setError] = useState(""); // For error handling
    const [language, setLanguage] = useState("en"); // OCR language state
    const [voice, setVoice] = useState("Google UK English Male"); // Default voice
    const [rate, setRate] = useState(1); // Default rate for speech
    const [isLoading, setIsLoading] = useState(false); // For loading indicator

    // Handle image upload and OCR
    const handleUpload = async () => {
        try {
            setError(""); // Reset previous errors
            setIsLoading(true); // Show loading indicator
            const formData = new FormData();
            formData.append("image", image);
            formData.append("language", language); // Add selected language for OCR

            const response = await axios.post("http://localhost:5000/upload", formData);
            setText(response.data.text);
            setIsLoading(false); // Hide loading indicator
        } catch (error) {
            setError("An error occurred during the OCR process. Please try again.");
            setIsLoading(false); // Hide loading indicator
        }
    };

    // Text-to-Speech functionality
    const handleTextToSpeech = () => {
        if (text) {
            const newUtterance = new SpeechSynthesisUtterance(text);
            newUtterance.onstart = () => setIsReading(true);
            newUtterance.onend = () => setIsReading(false);
            newUtterance.voice = speechSynthesis.getVoices().find(voice => voice.name === voice);
            newUtterance.rate = rate; // Set the speech rate
            setUtterance(newUtterance);
            speechSynthesis.speak(newUtterance);
        } else {
            setError("No text available to read.");
        }
    };

    // Pause TTS
    const handlePause = () => {
        if (utterance) {
            speechSynthesis.pause();
            setIsReading(false);
        }
    };

    // Resume TTS
    const handleResume = () => {
        if (utterance) {
            speechSynthesis.resume();
            setIsReading(true);
        }
    };

    // Download text as .txt file
    const handleDownload = () => {
        if (text) {
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "extracted-text.txt";
            link.click();
        } else {
            setError("No text available to download.");
        }
    };

    // Dark mode toggle
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Handwritten Text Converter</h3>
                    
                    {/* Dark Mode Toggle */}
                    <button className="btn btn-secondary w-100" onClick={toggleDarkMode}>
                        Toggle Dark Mode
                    </button>
                    
                    {/* Language Selection */}
                    <div className="form-group mt-3">
                        <label htmlFor="language">Select OCR Language:</label>
                        <select
                            id="language"
                            className="form-control"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="it">Italian</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="form-group mt-3">
                        <label htmlFor="imageUpload">Upload Handwritten Image</label>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="imageUpload"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label className="custom-file-label" htmlFor="imageUpload">
                                Choose file
                            </label>
                        </div>
                    </div>

                    {/* OCR Button with Loading Indicator */}
                    <button
                        onClick={handleUpload}
                        className="btn btn-primary w-100 mt-3"
                        disabled={isLoading}
                    >
                        {isLoading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : "Convert to Text"}
                    </button>

                    {/* Error Message */}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    {/* Extracted Text */}
                    <div className="form-group mt-4">
                        <label htmlFor="extractedText">Extracted Text</label>
                        <textarea
                            className="form-control"
                            rows="6"
                            value={text}
                            readOnly
                            id="extractedText"
                        />
                    </div>

                    {/* TTS Controls */}
                    <div className="d-flex justify-content-between mt-3">
                        <button
                            onClick={handleTextToSpeech}
                            className="btn btn-success w-48"
                            disabled={isReading}
                        >
                            <FaPlay /> Read Aloud
                        </button>
                        <button
                            onClick={handlePause}
                            className="btn btn-warning w-48"
                            disabled={!isReading}
                        >
                            <FaPause /> Pause
                        </button>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button
                            onClick={handleResume}
                            className="btn btn-info w-48"
                            disabled={isReading}
                        >
                            Resume
                        </button>
                        <button
                            onClick={handleDownload}
                            className="btn btn-dark w-48"
                        >
                            <FaDownload /> Download Text
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;
