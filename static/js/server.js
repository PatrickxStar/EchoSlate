const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:1313' })); // Adjust to your Hugo port if needed
const upload = multer({ dest: 'uploads/' }); // Multer saves files to 'uploads/' temporarily

app.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        console.log('File upload request received.');
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Log current working directory to debug
        console.log("Current working directory:", process.cwd());

        const originalFileName = req.file.originalname;
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);

        // Generate the Markdown content
        const markdownContent = `
+++
title = "${originalFileName.replace('.pdf', '')}"
date = "${new Date().toISOString()}"
type = "resume"
draft = false
description = "Full Stack Developer Resume"
+++

## Resume Overview

Below is the extracted content from the uploaded resume:

${pdfData.text.split('\n').map(line => `> ${line}`).join('\n')}

---

## Original File Information

- **File Name**: ${originalFileName}
- **Upload Date**: ${new Date().toLocaleDateString()}
        `;

        // Ensure the 'content/en/resumes' directory exists; if not, create it
        const markdownDir = path.join(process.cwd(), 'content', 'en', 'resumes'); // Use process.cwd() to get the correct working directory

        if (!fs.existsSync(markdownDir)) {
            fs.mkdirSync(markdownDir, { recursive: true });
        }

        // Write the markdown file to the 'content/en/resumes' directory
        const markdownFileName = `${originalFileName.replace('.pdf', '')}.md`;
        const markdownFilePath = path.join(markdownDir, markdownFileName);

        fs.writeFileSync(markdownFilePath, markdownContent);
        console.log(`Markdown file written to: ${markdownFilePath}`);

        // Respond with JSON for the front-end to handle the response
        res.status(200).json({ message: 'Resume uploaded successfully!' });
    } catch (error) {
        console.error('Error processing the resume:', error);
        res.status(500).send('Error processing the resume.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
