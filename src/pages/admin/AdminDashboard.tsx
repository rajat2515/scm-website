import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../lib/firebase';
import { LogOut, UploadCloud, FileText, Image as ImageIcon, Trash2, Link as LinkIcon, Loader2 } from 'lucide-react';
import './AdminDashboard.css';

interface FileData {
  id: string;
  name: string;
  url: string;
  path: string;
  type: string;
  createdAt: any;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'image'>('pdf');
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to files collection in real-time
    const q = query(collection(db, 'files'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filesData: FileData[] = [];
      snapshot.forEach((doc) => {
        filesData.push({ id: doc.id, ...doc.data() } as FileData);
      });
      setFiles(filesData);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';

    if (activeTab === 'pdf' && !isPDF) {
      setError('Please select a PDF file.');
      return;
    }
    if (activeTab === 'image' && !isImage) {
      setError('Please select an Image file.');
      return;
    }

    setUploading(true);
    setProgress(0);

    const folder = activeTab === 'pdf' ? 'documents' : 'images';
    const filePath = `${folder}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (err) => {
        setError('Upload failed: ' + err.message);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'files'), {
            name: file.name,
            url: downloadURL,
            path: filePath,
            type: activeTab,
            createdAt: serverTimestamp(),
          });
        } catch (err: any) {
          setError('Failed to save file info: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
          // Reset file input
          e.target.value = '';
        }
      }
    );
  };

  const handleDelete = async (fileData: FileData) => {
    if (!window.confirm(`Are you sure you want to delete ${fileData.name}?`)) return;

    try {
      // Delete from Storage
      const fileRef = ref(storage, fileData.path);
      await deleteObject(fileRef);

      // Delete from Firestore
      await deleteDoc(doc(db, 'files', fileData.id));
    } catch (err: any) {
      alert('Error deleting file: ' + err.message);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const filteredFiles = files.filter(f => f.type === activeTab);

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
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            <FileText size={18} /> PDF Documents
          </button>
          <button 
            className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
            onClick={() => setActiveTab('image')}
          >
            <ImageIcon size={18} /> Images Gallery
          </button>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <h3>Upload New {activeTab === 'pdf' ? 'Document' : 'Image'}</h3>
          {error && <div className="error-message">{error}</div>}
          
          <div className="upload-dropzone">
            <input 
              type="file" 
              id="file-upload" 
              className="file-input"
              accept={activeTab === 'pdf' ? '.pdf' : 'image/*'}
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <label htmlFor="file-upload" className="upload-label">
              {uploading ? (
                <>
                  <Loader2 size={32} className="spinning" />
                  <span>Uploading... {Math.round(progress)}%</span>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
                </>
              ) : (
                <>
                  <UploadCloud size={40} className="upload-icon" />
                  <span>Click to browse or drag and drop</span>
                  <span className="upload-hint">
                    Supported: {activeTab === 'pdf' ? 'PDF only' : 'JPG, PNG, GIF'}
                  </span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* File List */}
        <div className="file-list-section">
          <h3>Manage {activeTab === 'pdf' ? 'Documents' : 'Images'}</h3>
          
          {filteredFiles.length === 0 ? (
            <div className="empty-state">
              <p>No {activeTab === 'pdf' ? 'documents' : 'images'} uploaded yet.</p>
            </div>
          ) : (
            <div className="file-grid">
              {filteredFiles.map((file) => (
                <div key={file.id} className="file-card">
                  <div className="file-card-preview">
                    {file.type === 'image' ? (
                      <img src={file.url} alt={file.name} />
                    ) : (
                      <div className="pdf-preview">
                        <FileText size={48} />
                      </div>
                    )}
                  </div>
                  <div className="file-card-info">
                    <h4 title={file.name}>{file.name}</h4>
                    <div className="file-card-actions">
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="action-btn" title="View">
                        <FileText size={16} />
                      </a>
                      <button onClick={() => copyToClipboard(file.url)} className="action-btn" title="Copy Link">
                        <LinkIcon size={16} />
                      </button>
                      <button onClick={() => handleDelete(file)} className="action-btn delete-btn" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
