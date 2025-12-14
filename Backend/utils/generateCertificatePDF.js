const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCertificatePDF(data) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 0,
    });

    const filePath = path.join(
      __dirname,
      `../certificates/${data.studentId}.pdf`
    );

    doc.pipe(fs.createWriteStream(filePath));

    const pageWidth = 842;
    const pageHeight = 595;

    doc.image(
      path.join(__dirname, "../assets/certificate.png"),
      0,
      0,
      {
        width: pageWidth,
        height: pageHeight,
      }
    );

    doc
      .font("Times-Bold")
      .fontSize(36)
      .fillColor("#000")
      .text(data.studentName, 0, 260, {
        align: "center",
      });

    doc
      .font("Times-Roman")
      .fontSize(16)
      .fillColor("#333")
      .text(
        `This certificate is proudly awarded to ${data.studentName} for participating in the ${data.quizTitle} held on ${data.date} and securing ${data.position} Place with a score of ${data.score}/${data.totalMarks}.`,
        0,
        320,
        {
          align: "center",
          width: 700,
        }
      );

    doc
      .font("Times-Bold")
      .fontSize(14)
      .fillColor("#000")
      .text(data.facultyName, 150, 450, {
        align: "center",
      });

    doc
      .font("Times-Roman")
      .fontSize(12)
      .text(
        `${data.facultyDesignation}\n${data.facultyDepartment}\nIntegral University, Lucknow`,
        150,
        470,
        { align: "center" }
      );

    doc
      .font("Times-Bold")
      .fontSize(14)
      .text(data.HODName, pageWidth - 300, 450, {
        align: "center",
      });

    doc
      .font("Times-Roman")
      .fontSize(12)
      .text(
        `${data.HODDesignation}\n${data.HODDepartment}\nIntegral University, Lucknow`,
        pageWidth - 300,
        470,
        { align: "center" }
      );

    doc
      .fontSize(12)
      .fillColor("#000")
      .text(`Date: ${data.date}`, 80, pageHeight - 80);

    doc.end();

    resolve(filePath);
  });
}

module.exports = generateCertificatePDF;
