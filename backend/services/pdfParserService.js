const fs = require("fs");
const pdfParse = require("pdf-parse");

const parsePDF = async (filePath) => {
  try {
    const pdfBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(pdfBuffer);

    return data.text;
  } catch (error) {
    console.error("PDF Parse Error:", error);
    throw error;
  }
};

module.exports = {
  parsePDF,
};