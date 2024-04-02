// controllers/pdfController.js
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

export const modifyPdf = async (req, res) => {
  try {
    const { search, replace } = req.body;
    
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const pageCount = pdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      const text = await page.getText();
      const modifiedText = text.replace(new RegExp(search, 'g'), replace);
      page.setText(modifiedText);
    }
    
    const modifiedPdfBytes = await pdfDoc.save();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=modified.pdf');
    res.send({
      pdfBytes: modifiedPdfBytes,
      message: `PDF modified successfully. Search string "${search}" replaced with "${replace}".`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
};
