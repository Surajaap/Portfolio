const PORTFOLIO_DATA = {
  name: "Suraj Patel",
  role: "Aspiring Data Scientist & Analyst",
  tagline: "Turning Raw Data into Actionable Insights",
  email: "jobmail121020@gmail.com",
  phone: "+91 9005624668",
  location: "Varanasi, Uttar Pradesh",
  linkedin: "https://www.linkedin.com/in/suraj-patel-b6b5a0288/",
  github: "https://github.com/Surajaap",
  available: true,

  about: [
    "Results-driven BCA graduate with a strong foundation in data analysis, programming, and business intelligence from Mahatma Gandhi Kashi Vidyapeeth, Varanasi.",
    "I specialize in transforming 100K+ record datasets into actionable insights using Python, SQL, and Power BI. My expertise spans predictive modeling, content-based recommendation systems, and ML models achieving up to 90% accuracy.",
    "Passionate about solving real-world problems through data — from customer retention forecasting to automated KPI dashboards that power executive decisions."
  ],

  skills: [
    {
      category: "Programming & Data", icon: "⚙",
      items: [
        { name: "Python", pct: 90 },
        { name: "SQL", pct: 85 },
        { name: "Pandas & NumPy", pct: 88 },
        { name: "Matplotlib & Seaborn", pct: 80 },
      ]
    },
    {
      category: "Machine Learning", icon: "🤖",
      items: [
        { name: "Scikit-Learn", pct: 85 },
        { name: "Predictive Modeling", pct: 82 },
        { name: "Feature Engineering", pct: 78 },
        { name: "Content-Based Filtering", pct: 80 },
      ]
    },
    {
      category: "Business Intelligence", icon: "📊",
      items: [
        { name: "Power BI", pct: 85 },
        { name: "Dashboard Design", pct: 82 },
        { name: "Excel (Advanced)", pct: 88 },
        { name: "KPI Reporting", pct: 80 },
      ]
    },
    {
      category: "Tools & Platforms", icon: "🛠",
      tags: ["Jupyter Notebook", "Google Colab", "TMDb API", "Git & GitHub", "Streamlit", "MySQL", "VS Code", "Excel"]
    }
  ],

  projects: [
    {
      number: "01", icon: "🎬",
      name: "Movie Recommendation System",
      desc: "Analyzed user viewing patterns from 100K+ movie records using Python and Pandas. Implemented content-based filtering via Scikit-Learn achieving personalized recommendations. Integrated TMDb API for dynamic content retrieval with an interactive Streamlit interface.",
      tech: ["Python", "Pandas", "Scikit-Learn", "TMDb API", "Streamlit"],
      liveUrl: "https://movie-reco-frontend-e7fz56lsjbrusiiekbzfrk.streamlit.app/",
      githubUrl: "https://github.com/Surajaap",
    },
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      university: "Mahatma Gandhi Kashi Vidyapeeth, Varanasi",
      year: "2025",
      cgpa: "7.3 / 10",
      location: "Varanasi, Uttar Pradesh",
      resultFile: "/result.pdf",
    }
  ],

  certifications: [
  {
    icon: "📜",
    name: "Data Science Bootcamp",
    platform: "Code With Harry",
    year: "2024",
    url: "",
    certFile: "/certificate.pdf"
  }
]
};