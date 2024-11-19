import React, { useState } from 'react';
import './AdventureWorks.css'; 

export default function AdventureWorks() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <h1 className="header">Data Analyst Portfolio - Sales Management Project</h1>
      
      <div className="tabs">
        <div className="tabs-list">
          <button 
            className={`tab-trigger ${activeTab === "overview" ? "active" : ""}`} 
            onClick={() => handleTabClick("overview")}
          >
            Project Overview
          </button>
          <button 
            className={`tab-trigger ${activeTab === "requirements" ? "active" : ""}`} 
            onClick={() => handleTabClick("requirements")}
          >
            Business Requirements
          </button>
          <button 
            className={`tab-trigger ${activeTab === "data" ? "active" : ""}`} 
            onClick={() => handleTabClick("data")}
          >
            Data Transformation
          </button>
          <button 
            className={`tab-trigger ${activeTab === "visualizations" ? "active" : ""}`} 
            onClick={() => handleTabClick("visualizations")}
          >
            Visualizations
          </button>
        </div>

        <div className={`tabs-content ${activeTab === "overview" ? "visible" : "hidden"}`}>
          <div className="card" onMouseMove={handleMouseMove}
            style={{
              "--x": `${mousePosition.x}px`,
              "--y": `${mousePosition.y}px`,
            }}>
            <div className="card-header">
              <h2 className="card-title">Project Overview</h2>
              <p className="card-description">Executive Sales Report for Sales Managers</p>
            </div>
            <div className="card-content">
              <p>This project involves creating a comprehensive sales management dashboard to provide insights into internet sales, customer behavior, and product performance. The dashboard is designed to meet specific business requirements and user stories, ensuring that sales managers and representatives have access to crucial data for decision-making.</p>
            </div>
          </div>
        </div>

        <div className={`tabs-content ${activeTab === "requirements" ? "visible" : "hidden"}`}>
          <div className="card" onMouseMove={handleMouseMove}
            style={{
              "--x": `${mousePosition.x}px`,
              "--y": `${mousePosition.y}px`,
            }}>
            <div className="card-header">
              <h2 className="card-title">Business Requirements & User Stories</h2>
            </div>
            <div className="card-content">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>As a (role)</th>
                      <th>I want (request / demand)</th>
                      <th>So that I (user value)</th>
                      <th>Acceptance Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sales Manager</td>
                      <td>To get a dashboard overview of internet sales</td>
                      <td>Can follow better which customers and products sells the best</td>
                      <td>A Power BI dashboard which updates data once a day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`tabs-content ${activeTab === "data" ? "visible" : "hidden"}`}>
          <div className="card" onMouseMove={handleMouseMove}
            style={{
              "--x": `${mousePosition.x}px`,
              "--y": `${mousePosition.y}px`,
            }}>
            <div className="card-header">
              <h2 className="card-title">Data Cleansing & Transformation (SQL)</h2>
            </div>
            <div className="card-content">
              <p>To create the necessary data model for doing analysis and fulfilling the business needs defined in the user stories, the following tables were extracted using SQL.</p>
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
          </div>
        </div>

        <div className={`tabs-content ${activeTab === "visualizations" ? "visible" : "hidden"}`}>
          <div className="card" onMouseMove={handleMouseMove}
            style={{
              "--x": `${mousePosition.x}px`,
              "--y": `${mousePosition.y}px`,
            }}>
            <div className="card-header">
              <h2 className="card-title">Data Visualizations</h2>
            </div>
            <div className="card-content">
              <div className="image-grid">
              <iframe
              className='responsive-iframe'
      title="Sales Report_Finished"
      src="https://app.powerbi.com/view?r=eyJrIjoiNTk3OTI1MjMtODNmYi00M2VhLWEyZDUtNmMyNmE0MzczZGYxIiwidCI6ImMyNzg3OTIyLTExZDktNGNhOC1hYWRmLTVlZjdmZjMxYTEyNyJ9"
      allowFullScreen
    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
