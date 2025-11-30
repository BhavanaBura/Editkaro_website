# Editkaro_website


Editkaro — Social Media Marketing & Video Editing Website

A fully responsive portfolio website built for Editkaro, a social media marketing and video editing agency.
The project includes a homepage, portfolio showcase, about page, and contact form with Google Sheets integration.

🚀 Live Demo

👉 Live Website:
https://bhavanabura.github.io/Editkaro_website/portfolio.html

👉 GitHub Repository:


📁 Project Structure
/editkaro
 ├── index.html
 ├── portfolio.html
 ├── about.html
 ├── contact.html
 ├── css/
 │    └── styles.css
 ├── js/
 │    ├── main.js
 │    └── portfolio.js
 └── assets/

🎯 Project Features
✅ Home Page

Hero section with service introduction

Email subscription form

Emails are stored in Google Sheets

Responsive design

Services preview

✅ Portfolio Page

9 video categories:

Short Form

Long Form

Gaming

Football

eCommerce Ads

Documentary

Color Grading

Anime

Ads

Video items open in a popup modal

YouTube embedded video support

Filters to view videos category-wise

✅ About Page

Description of Editkaro

Mission and vision

Team section (placeholder images if not provided)

✅ Contact Page

Contact form (name, email, phone, message)

Submissions are automatically stored in Google Sheets

Form validation included

✅ Google Sheets Integration

Both forms use Google Apps Script to store submitted data:

email submissions → stored in "Emails" sheet

contact form submissions → stored in "Contacts" sheet

🔗 Google Apps Script Backend

Add this script inside Google Sheets →
Extensions → Apps Script → Code.gs

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID_HERE");

    var body = e.postData ? e.postData.contents : null;
    if (!body) {
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "No POST body" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(body);
    var sheetName = data.sheet || "Emails";
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      if (sheetName === "Emails") sheet.appendRow(["Timestamp", "Email", "Source"]);
      else if (sheetName === "Contacts") sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Message", "Source"]);
      else sheet.appendRow(["Timestamp", "Data"]);
    }

    var now = new Date();
    if (sheetName === "Emails") sheet.appendRow([now, data.email, data.source]);
    else if (sheetName === "Contacts") sheet.appendRow([now, data.name, data.email, data.phone, data.message, data.source]);
    else sheet.appendRow([now, JSON.stringify(data)]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


Deploy as:
📌 Deploy → New Deployment → Web App
📌 Access: Anyone
📌 Copy the Web App URL and paste into main.js

📡 Deployment Instructions
✔ GitHub Pages

Upload all files to GitHub

Go to Settings → Pages

Select branch: main

Set folder: root ( / )

Click Save → Live link appears in 10 seconds

✔ Netlify / Vercel

Import your GitHub repository

Set build = None (static site)

Deploy

🛠️ Technologies Used

HTML5

CSS3

JavaScript

Google Apps Script

YouTube Embed API

Responsive Web Design

GitHub Pages / Netlify

🧪 How to Run Locally

Clone the repository:

git clone https://github.com/your-username/editkaro.git


Open the folder in VS Code

Install the Live Server extension

Right-click index.html → Open with Live Server

Replace YOUR_WEB_APP_URL in js/main.js with your Google Script URL

📘 Report Summary (For College Submission)
✔ Work Done

Built complete 4-page responsive website

Integrated forms with Google Sheets

Added video categories and modal player

Implemented CSS styling and layout

Deployed website online

✔ Challenges

Google Sheets integration errors

Responsive layout alignment

YouTube embed modal scripting

✔ Solutions

Used Google Apps Script doPost()

Applied CSS Grid and Flexbox

Ensured correct iframe loading using JavaScript

✨ Credits

Developed by Bura Bhavana
For the Major Project – Web Development
