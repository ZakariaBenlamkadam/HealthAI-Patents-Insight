import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaChartBar, FaChartLine, FaChartPie, FaDatabase, FaEye, FaChevronRight } from 'react-icons/fa';
import './Portfolio.css';


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('architecture');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  const userStories = [
    {
      role: 'Data Scientist',
      request: 'To analyze healthcare AI patent trends',
      value: 'Can identify emerging trends in AI healthcare technologies to inform research and development',
      criteria: 'Data visualizations of patent trends over time, categorized by technology and region',
    },
    {
      role: 'AI Researcher',
      request: 'To assess AI patent innovations in healthcare',
      value: 'Can evaluate the progress of AI technologies in healthcare, identifying gaps for innovation',
      criteria: 'A dashboard showing the number of patents per AI subfield and insights into key patent filings',
    },
    {
      role: 'Product Manager',
      request: 'To prioritize product development based on AI patent activity',
      value: 'Can align product development with the most patented AI innovations in healthcare',
      criteria: 'Time series and scatter plots showing patent filings per AI category, with links to associated products',
    },
    {
      role: 'Healthcare Innovator',
      request: 'To discover novel AI applications in healthcare patents',
      value: 'Can gain insights into AI patenting activity, identifying areas for future healthcare innovations',
      criteria: 'Interactive visualizations showing patent applications, key inventors, and geographical hotspots for healthcare AI',
    },
  ];
  
  const sections = [
    { id: 'architecture', title: 'Project Architecture', icon: <FaBuilding /> },
    { id: 'overview', title: 'Project Overview', icon: <FaChartLine /> },
    { id: 'requirements', title: 'Business Requirements', icon: <FaDatabase /> },
    { id: 'transformation', title: 'Data Analysis', icon: <FaEye /> },
    { id: 'visualizations', title: 'Visualizations', icon: <FaChartBar /> },
  ];

  const notebookUrl = "https://nbviewer.org/github/ZakariaBenlamkadam/HealthAI-Patents-Insight/raw/main/analysis_1.ipynb";


  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>Big Data Analysis of Patents for Healthcare and AI</h1>
      </header>
      <main className="portfolio-main">
        <nav className="portfolio-nav">
          <ul className="portfolio-nav-list">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
                >
                  {section.icon}
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.02 }}
          className="portfolio-content"
          onMouseMove={handleMouseMove}
            style={{
              "--x": `${mousePosition.x}px`,
              "--y": `${mousePosition.y}px`,
            }}
        >
          {activeSection === 'architecture' && (
            <div>
              
              
              <img
              className='responsive-iframe'
                alt="Sales Report_Finished"
                src="Architecture1.png"
                
              />
            </div>
          )}
          {activeSection === 'overview' && (
            <div>
              <h2>Project Overview</h2>
              <div class="project-description">
                <div class="paragraph">
                  
                  <p>
                    This project focuses on leveraging big data technologies to collect, process, and analyze patent data in the fields of Artificial Intelligence (AI) and healthcare. The solution aimed to uncover technological trends, enhance insights, and provide real-time accessibility to critical patent information through advanced visualizations and analytics.
                  </p>
                </div>
                <div class="paragraph">
                  
                  <p>
                    The system featured an automated data pipeline for scraping patent data from multiple sources, storing it efficiently in a NoSQL database, and processing it with big data tools. It also integrated Natural Language Processing (NLP) to analyze unstructured text and Spark MLlib for trend predictions and categorization. The data was visualized using Power BI dashboards for clear and actionable insights.
                  </p>
                </div>
              </div>

              <div className="overview-steps">
                {['Sourcing', 'Storage','Analysis', 'Visualisations'].map((step, index) => (
                  <div key={step} className="step-card">
                    <span className="step-index">{index + 1}</span>
                    <span>{step}</span>
                    <FaChevronRight className="icon-chevron" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 'requirements' && (
  <div>
    <h2 className="section-heading">Business Requirements & User Stories</h2>
    <div className="table-container">
      <table className="user-stories-table">
        <thead>
          <tr>
            <th>As a (role)</th>
            <th>I want (request / demand)</th>
            <th>So that I (user value)</th>
            <th>Acceptance Criteria</th>
          </tr>
        </thead>
        <tbody>
          {userStories.map((story, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{story.role}</td>
              <td>{story.request}</td>
              <td>{story.value}</td>
              <td>{story.criteria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


{activeSection === 'transformation' && (
  <div
    className="transformation-section"
    onMouseMove={handleMouseMove}
    style={{
      '--x': `${mousePosition.x}px`,
      '--y': `${mousePosition.y}px`,
    }}
  >
    <div
      className="gradient-overlay"
      style={{
        backgroundImage: `radial-gradient(circle at var(--x) var(--y), rgba(193, 237, 204, 0.3) 0%, rgba(193, 237, 204, 0) 50%)`,
      }}
    />
    <h2 className="section-title">Data Analysis using PySpark</h2>
    <p className="section-description">
      In this analysis, we leverage PySpark to process and extract insights from healthcare and AI patent data. The goal was to identify trends, categorize the data, and derive actionable insights to support decision-making in AI and healthcare.
    </p>
    <div className="cta-section">
      <p className="cta-text">
        You can explore the full analysis in the Jupyter Notebook available on GitHub:
      </p>
      <a
        href="https://github.com/ZakariaBenlamkadam/HealthAI-Patents-Insight/blob/main/analysis_1.ipynb"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-link"
      >
        HealthAI-Patents-Insight Analysis 1 (GitHub)
      </a>
    </div>
  </div>
)}



          {activeSection === 'visualizations' && (
            <div>
              <h2>Visualizations</h2>
              
              <iframe
              className='responsive-iframe1'
      title="Sales Report_Finished"
      src="https://app.powerbi.com/view?r=eyJrIjoiNzhjYzZkYTYtOWVjOS00YjE4LWJhYzItYjViOWNlNWM3Y2YyIiwidCI6ImMyNzg3OTIyLTExZDktNGNhOC1hYWRmLTVlZjdmZjMxYTEyNyJ9"
      allowFullScreen
    />
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
