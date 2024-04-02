import React , { useState } from 'react';
import FileUploadForm from './components/FileUploadForm';
import PdfModificationForm from './components/PdfModificationForm';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPdf } from './features/pdfModification/pdfModificationAPI';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [modifiedPdf, setModifiedPdf] = useState(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.pdfModification.loading);

  const handleFileUpload = (file) => {
    setPdfFile(file);
  };

  const handlePdfModification = async ({ search, replace }) => {
    if (!pdfFile) {
      setMessage('Please upload a PDF file first');
      return;
  };

  const formData = new FormData();
  formData.append('pdf', pdfFile);
  formData.append('search', search);
  formData.append('replace', replace);

  try {
    dispatch({ type: 'pdfModificationRequest' });
    const modifiedPdfBlob = await modifyPdf(formData);
    setModifiedPdf(modifiedPdfBlob);
    setMessage('PDF modified successfully');
  } catch (error) {
    setMessage('Failed to modify PDF');
  }
};

const downloadModifiedPdf = () => {
  if (modifiedPdf) {
    const url = window.URL.createObjectURL(modifiedPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified_pdf.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
};

  return (
    <div className="App">
      <h1>PDF Modification App</h1>
      <FileUploadForm onFileUpload={handleFileUpload} />
      <PdfModificationForm onSubmit={handlePdfModification} />
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {modifiedPdf && (
        <div>
          <button onClick={downloadModifiedPdf}>Download Modified PDF</button>
        </div>
      )}
    </div>
  );
}

export default App;