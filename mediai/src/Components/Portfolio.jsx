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
      role: 'Sales Manager',
      request: 'To get a dashboard overview of internet sales',
      value: 'Can follow better which customers and products sells the best',
      criteria: 'A Power BI dashboard which updates data once a day',
    },
    {
      role: 'Marketing Analyst',
      request: 'To analyze customer segmentation',
      value: 'Can tailor marketing campaigns to specific customer groups',
      criteria: 'Interactive visualizations showing customer segments based on demographics and purchasing behavior',
    },
    {
      role: 'Product Manager',
      request: 'To track product performance over time',
      value: 'Can identify trends and make data-driven decisions on product improvements',
      criteria: 'Time series charts showing sales, ratings, and customer feedback for each product',
    },
  ]
  const sections = [
    { id: 'architecture', title: 'Project Architecture', icon: <FaBuilding /> },
    { id: 'overview', title: 'Project Overview', icon: <FaChartLine /> },
    { id: 'requirements', title: 'Business Requirements', icon: <FaDatabase /> },
    { id: 'transformation', title: 'Data Transformation', icon: <FaEye /> },
    { id: 'visualizations', title: 'Visualizations', icon: <FaChartBar /> },
  ];

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>Data Analyst Portfolio</h1>
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
    <h2 className="section-title">Data Cleansing & Transformation (SQL)</h2>
    <p className="section-description">
      To create the necessary data model for doing analysis and fulfilling the business needs defined in the user stories, the following tables were extracted using SQL.
    </p>
    <pre className="code-block">
      <code>{`
-- Cleansed DIM_Date Table --
SELECT 
  [DateKey], 
  [FullDateAlternateKey] AS Date,
  [EnglishDayNameOfWeek] AS Day, 
  [EnglishMonthName] AS Month, 
  Left([EnglishMonthName], 3) AS MonthShort,
  [MonthNumberOfYear] AS MonthNo, 
  [CalendarQuarter] AS Quarter, 
  [CalendarYear] AS Year 
FROM 
 [AdventureWorksDW2019].[dbo].[DimDate]
WHERE 
  CalendarYear >= 2019
      `}</code>
    </pre>
  </div>
)}

          {activeSection === 'visualizations' && (
            <div>
              <h2>Visualizations</h2>
              {/*<div className="visualization-cards">
                <div className="visualization-card">
                  <h3>Sales Overview</h3>
                  <FaChartPie className="visualization-icon" />
                </div>
                <div className="visualization-card">
                  <h3>Cutomer Details</h3>
                  <FaChartLine className="visualization-icon" />
                </div>
                <div className="visualization-card">
                  <h3>Product Details</h3>
                  <FaChartBar className="visualization-icon" />
                </div>
                
              </div>*/}
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
