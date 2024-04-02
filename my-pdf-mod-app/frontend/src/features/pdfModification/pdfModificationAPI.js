
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:5000/';
const ENDPOINT_API_URL = 'api/pdf/modify-pdf';

console.log("BASE_API_URL :", BASE_API_URL)
console.log("ENDPOINT_API_URL :", ENDPOINT_API_URL)

export const modifyPdf = async (formData) => {
    try {
      const response = await fetch(`${BASE_API_URL}${ENDPOINT_API_URL}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to modify PDF');
      }
      return await response.blob();
    } catch (error) {
      throw new Error('Failed to modify PDF');
    }
  };