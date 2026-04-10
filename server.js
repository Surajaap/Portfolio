const express    = require("express");
const cors       = require("cors");
const path       = require("path");
const https      = require("https");
require("dotenv").config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(__dirname));

// Resume download
app.get("/resume.pdf", (req, res) => {
  const filePath = path.join(__dirname, "resume.pdf");
  const fs = require("fs");
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Resume not found.");
  }
  res.setHeader("Content-Disposition", "attachment; filename=Suraj_Patel_Resume.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.sendFile(filePath);
});

// Result download
app.get("/result.pdf", (req, res) => {
  const fp = path.join(__dirname, "result.pdf");
  const fs = require("fs");
  if (!fs.existsSync(fp)) return res.status(404).send("Result not found.");
  res.setHeader("Content-Disposition", "attachment; filename=Suraj_Patel_Result.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.sendFile(fp);
});

// Certificate download
app.get("/certificate.pdf", (req, res) => {
  const fp = path.join(__dirname, "certificate.pdf");
  const fs = require("fs");
  if (!fs.existsSync(fp)) return res.status(404).send("Certificate not found.");
  res.setHeader("Content-Disposition", "attachment; filename=Suraj_Patel_Certificate.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.sendFile(fp);
});

// Contact Form — Web3Forms
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Saari fields bharo." });

  const bodyData = JSON.stringify({
    access_key: process.env.WEB3FORMS_KEY,
    name:       name,
    email:      email,
    message:    message,
    subject:    `Portfolio Message from ${name}`,
  });

  const options = {
    hostname: "api.web3forms.com",
    path:     "/submit",
    method:   "POST",
    headers:  {
      "Content-Type":   "application/json",
      "Content-Length": Buffer.byteLength(bodyData),
    },
  };

  const apiReq = https.request(options, apiRes => {
    let data = "";
    apiRes.on("data", chunk => data += chunk);
    apiRes.on("end", () => {
      try {
        const json = JSON.parse(data);
        if (json.success) {
          res.json({ success: true });
        } else {
          res.status(500).json({ error: "Message nahi gaya. Try again." });
        }
      } catch {
        res.status(500).json({ error: "Response error." });
      }
    });
  });

  apiReq.on("error", err => {
    console.error(err);
    res.status(500).json({ error: "Connection error." });
  });

  apiReq.write(bodyData);
  apiReq.end();
});

// AI Chat — Gemini
app.post("/api/chat", (req, res) => {
  const { messages } = req.body;

  const systemPrompt = `You are an AI assistant on Suraj Patel's portfolio. Only answer questions about Suraj. Be friendly and concise.

SURAJ'S PROFILE:
- Name: Suraj Patel | Location: Varanasi, UP, India
- Email: jobmail121020@gmail.com | Phone: +91 9005624668
- LinkedIn: linkedin.com/in/suraj-patel-b6b5a0288 | GitHub: github.com/Surajaap
- Status: Fresher, seeking Data Scientist / Data Analyst roles

EDUCATION: BCA from Mahatma Gandhi Kashi Vidyapeeth, Varanasi | 2025 | CGPA: 7.3/10

SKILLS: Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn, Power BI, Excel, Jupyter, Streamlit, MySQL, Git, TMDb API

PROJECTS:
- Movie Recommendation System: 100K+ records, content-based filtering, 90% accuracy, TMDb API, Streamlit
  Live: https://movie-reco-frontend-e7fz56lsjbrusiiekbzfrk.streamlit.app/

CERTIFICATIONS: Data Science Bootcamp - Code With Harry (2024)

If asked unrelated questions say: "I can only answer questions about Suraj Patel."`;

  const contents = [
    { role: "user",  parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Understood! I'm ready to answer questions about Suraj Patel." }] },
    ...messages.map(m => ({
      role:  m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }))
  ];

  const bodyData = JSON.stringify({ contents });
  const options  = {
    hostname: "generativelanguage.googleapis.com",
    path:     `/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    method:   "POST",
    headers:  { "Content-Type": "application/json" },
  };

  const apiReq = https.request(options, apiRes => {
    let data = "";
    apiRes.on("data", chunk => data += chunk);
    apiRes.on("end", () => {
      try {
        const json  = JSON.parse(data);
        const reply = json.candidates?.[0]?.content?.parts?.[0]?.text
                      || "Sorry, I couldn't answer that.";
        res.json({ reply });
      } catch {
        res.status(500).json({ reply: "Error processing response." });
      }
    });
  });

  apiReq.on("error", () => res.status(500).json({ reply: "Connection error." }));
  apiReq.write(bodyData);
  apiReq.end();
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(PORT, () => console.log(`\n✅ Portfolio running at: http://localhost:${PORT}\n`));
