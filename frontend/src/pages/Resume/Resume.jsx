
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { uploadResume } from "../../services/resumeService";
import "./Resume.css";
import toast from "react-hot-toast";

const Resume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files?.length) setSelectedFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
if (!selectedFile) {
  return toast.error("Please select a PDF file.");
}
    try {
      setLoading(true);
      const result = await uploadResume(selectedFile);
      setAnalysis(result);
toast.success("Resume analyzed successfully!");
    } catch {
      toast.error("Resume analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Resume Analyzer</h1>
        <p>Upload your resume and get AI-powered feedback.</p>
      </div>

      <div className="upload-card">
        <h2>Upload Your Resume</h2>
        <p className="upload-subtitle">
          Upload your latest resume in PDF format for AI analysis.
        </p>

        <label
          htmlFor="resumeFile"
          className={`upload-box ${isDragging ? "drag-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            id="resumeFile"
            type="file"
            accept=".pdf"
            hidden
            onChange={handleFileChange}
          />
          <div className="upload-icon">📄</div>
          <h3>Drag & Drop Your Resume</h3>
          <p>or click to browse your computer</p>
          <small>Only PDF files are supported</small>
        </label>

        {selectedFile && (
          <div className="uploaded-file">
            <div>
              <strong>{selectedFile.name}</strong>
              <p>Ready to analyze</p>
            </div>
            <span className="file-status">Uploaded</span>
          </div>
        )}

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {analysis && (
        <div className="analysis-card">
          <div className="analysis-header">
            <div>
              <h2>Resume Analysis Report</h2>
              <p className="analysis-subtitle">
                Here's how your resume performed.
              </p>
            </div>

            <div
  className="score-circle"
  style={{
    background: `conic-gradient(
  #22c55e ${analysis.score * 36}deg,
  #e5e7eb 0deg
)`
  }}
>
  <div className="score-inner">
   <div className="score-value">
  {Math.round(analysis.score * 10)}%
</div>
    <span>ATS Score</span>
  </div>
</div>
          </div>

          <div className="analysis-grid">
            <div className="analysis-box">
              <h3>✅ Strengths</h3>
              <ul>{analysis.strengths.map((i, k) => <li key={k}>{i}</li>)}</ul>
            </div>

            <div className="analysis-box">
              <h3>⚠️ Areas to Improve</h3>
              <ul>{analysis.weaknesses.map((i, k) => <li key={k}>{i}</li>)}</ul>
            </div>

            <div className="analysis-box">
              <h3>❌ Missing Skills</h3>
              <ul>{analysis.missingSkills.map((i, k) => <li key={k}>{i}</li>)}</ul>
            </div>

            <div className="analysis-box">
              <h3>💡 Suggestions</h3>
              <ul>{analysis.suggestions.map((i, k) => <li key={k}>{i}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Resume;
