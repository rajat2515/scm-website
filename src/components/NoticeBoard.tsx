import React from 'react';
import { Bell } from 'lucide-react';
import './NoticeBoard.css';

const announcements = [
  "Admissions open for session 2026-27 — Nursery to Class IX. Apply Now!",
  "S.C.M. Children Academy is CBSE Affiliated (Affiliation No. 2132374). Haldaur, Bijnor.",
  "Half-Yearly Examinations schedule will be announced shortly. Check the Academic Calendar.",
  "Parent-Teacher Meeting will be held next month. Date to be announced via circular.",
  "Students excelling in sports & academics are encouraged to participate in inter-school competitions.",
];

const NoticeBoard: React.FC = () => {
  return (
    <section className="notice-board-section">
      <div className="container">
        <div className="notice-board">
          <div className="notice-header">
            <Bell size={20} className="notice-icon" />
            <span className="notice-title">Latest Updates</span>
          </div>
          <div className="notice-ticker-wrapper">
            <div className="notice-ticker">
              {announcements.map((text, index) => (
                <span key={index} className="notice-item">
                  <span className="notice-dot"></span>
                  {text}
                </span>
              ))}
              {/* Duplicate for seamless scrolling */}
              {announcements.map((text, index) => (
                <span key={`dup-${index}`} className="notice-item">
                  <span className="notice-dot"></span>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
