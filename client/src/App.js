import logo from './logo.svg';
import './App.css';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div>
            <h1 className="text-center mt-4">OCR Handwriting to Text</h1>
            <UploadForm />
        </div>
  );
}

export default App;
