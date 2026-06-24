import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { LogOut, FileText, Image as ImageIcon, BarChart3, Bell, FileCheck, Award, GraduationCap, ListPlus } from 'lucide-react';
import './AdminDashboard.css';

// Import Tabs
import DisclosureTab from './tabs/DisclosureTab';
import EventsTab from './tabs/EventsTab';
import ResultsTab from './tabs/ResultsTab';
import AnnouncementsTab from './tabs/AnnouncementsTab';
import UpdatesTab from './tabs/UpdatesTab';
import TCTab from './tabs/TCTab';
import AchieversTab from './tabs/AchieversTab';
import AlumniTab from './tabs/AlumniTab';

type TabType = 'disclosure' | 'events' | 'results' | 'announcements' | 'updates' | 'tc' | 'achievers' | 'alumni';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('disclosure');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="container dashboard-header-content">
          <div className="dashboard-title">
            <h2>Admin Dashboard</h2>
            <span className="dashboard-badge">Super Admin</span>
          </div>
          <button onClick={handleLogout} className="btn btn-outline logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="container dashboard-main">
        {/* Tabs */}
        <div className="dashboard-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          <button 
            className={`tab-btn ${activeTab === 'disclosure' ? 'active' : ''}`}
            onClick={() => setActiveTab('disclosure')}
          >
            <FileText size={18} /> Disclosure & Brochure
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tc' ? 'active' : ''}`}
            onClick={() => setActiveTab('tc')}
          >
            <FileCheck size={18} /> TCs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <ImageIcon size={18} /> Event Gallery
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievers' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievers')}
          >
            <Award size={18} /> Achievers
          </button>
          <button 
            className={`tab-btn ${activeTab === 'alumni' ? 'active' : ''}`}
            onClick={() => setActiveTab('alumni')}
          >
            <GraduationCap size={18} /> Alumni
          </button>
          <button 
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            <BarChart3 size={18} /> Results
          </button>
          <button 
            className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell size={18} /> Announcements
          </button>
          <button 
            className={`tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            <ListPlus size={18} /> Latest Updates
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content" style={{ background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          {activeTab === 'disclosure' && <DisclosureTab />}
          {activeTab === 'tc' && <TCTab />}
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'achievers' && <AchieversTab />}
          {activeTab === 'alumni' && <AlumniTab />}
          {activeTab === 'results' && <ResultsTab />}
          {activeTab === 'announcements' && <AnnouncementsTab />}
          {activeTab === 'updates' && <UpdatesTab />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
