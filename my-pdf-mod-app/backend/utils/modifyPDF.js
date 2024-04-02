// const { Document, Page, Text, fonts } = require('pdf-lib');

// async function modifyPDF(buffer, searchText, replaceText) {
//   const existingPdfBytes = buffer;
//   const pdfDoc = await Document.load(existingPdfBytes);

//   // Ensure fonts are registered (adjust as needed)
//   fonts.register(require('font-courier'));

//   const pages = pdfDoc.getPages();
//   for (const page of pages) {
//     try {
//       const textContent = await page.getTextContent();
//       const updatedContent = textContent.replace(new RegExp(searchText, 'g'), replaceText);
//       page.setTextContent(updatedContent);
//     } catch (error) {
//       console.error('Error extracting text from page:', error);
//       // Handle extraction error (e.g., encrypted PDF, password-protected)
//     }
//   }

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

// module.exports = modifyPDF;