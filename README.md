# Handwritten Text Converter

## Overview
This is a React-based application that allows users to upload handwritten images, extract text using OCR (Optical Character Recognition) via Google Cloud Vision API, and utilize Text-to-Speech (TTS) to read the extracted text aloud. The application also provides options for downloading the extracted text and toggling dark mode.

## Features
- Upload handwritten images for text extraction
- Select OCR language (English, Spanish, French, German, Italian)
- Convert extracted text to speech using the browser's SpeechSynthesis API
- Pause and resume text-to-speech functionality
- Download extracted text as a `.txt` file
- Dark mode toggle for better UI experience
- Error handling and loading indicators for smooth user experience

## Technologies Used
- React.js
- Axios (for API calls)
- Bootstrap (for UI styling)
- React Icons (for UI icons)
- Google Cloud Vision API (for OCR processing)
- SpeechSynthesis API (for text-to-speech functionality)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Kruthikmanubolu/OCR-Handwriting-to-Text.git
   cd your-repository-folder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```

## Backend Setup
This app requires a backend server to handle OCR processing using Google Cloud Vision API. The backend should have an endpoint `/upload` to accept image files and return extracted text. An example backend setup could be:
- Node.js with Express and Google Cloud Vision API
- Python Flask with Google Cloud Vision API

## Google Cloud Vision API Setup
1. Create a Google Cloud project and enable the Vision API.
2. Generate and download a service account key in JSON format.
3. Set up authentication:
   ```sh
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your-service-account-key.json"
   ```
4. Use the API in the backend to extract text from images.

## Usage
1. Select an OCR language from the dropdown.
2. Upload a handwritten image.
3. Click on "Convert to Text" to extract text using Google Cloud Vision API.
4. Use "Read Aloud" to listen to the extracted text.
5. Pause or Resume speech as needed.
6. Download the extracted text as a `.txt` file if required.
7. Toggle dark mode for a different UI appearance.

## Error Handling
- If the OCR process fails, an error message is displayed.
- If no text is available for TTS or download, an error is shown.
- Loading indicators provide feedback while processing.

## Future Enhancements
- Support for additional OCR languages.
- Improved handwriting recognition with AI models.
- Option to edit extracted text before downloading.
- User authentication for saving extracted text.

## License
This project is licensed under the MIT License.
