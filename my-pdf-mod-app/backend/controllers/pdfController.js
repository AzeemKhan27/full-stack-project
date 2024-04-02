import PDFDocument from 'pdf-lib';
import fs from 'fs';

const modifyPdfEndpoint = 'http://localhost:5000/modify-pdf';

// Modify the PDF
const modifyPdf = async (file) => {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await fetch(modifyPdfEndpoint, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

export default modifyPdf;