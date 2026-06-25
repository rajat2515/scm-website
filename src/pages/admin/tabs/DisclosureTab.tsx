import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { UploadCloud, Loader2, CheckCircle, Trash2 } from 'lucide-react';

const documentOptions = [
  { id: 'affiliation', title: 'Copy of CBSE Affiliation / Up-Gradation / Recent Extension Letter' },
  { id: 'society', title: 'Copy of Society / Trust / Company Registration / Renewal' },
  { id: 'noc', title: 'Copy of No-Objection-Certificate (NOC) by State Government / UT' },
  { id: 'recognition', title: 'Copy of Recognition Certificate Under RTE Act 2009 / Renewal' },
  { id: 'building', title: 'Copy of Building Safety Certificate as per National Building Code' },
  { id: 'fire', title: 'Copy of Fire Safety Certificate' },
  { id: 'deo', title: 'Copy of DEO Certificate / Self Certification by School' },
  { id: 'sanitation', title: 'Copy of Water, Health and Sanitation Certificate' },
  { id: 'fees_structure', title: 'School Fees Structure' },
  { id: 'calendar', title: 'Annual Academic Calendar' },
  { id: 'smc', title: 'School Management Committee (SMC)' },
  { id: 'pta', title: 'Parent Teacher Association (PTA) of School' },
  { id: 'brochure', title: 'School Brochure' },
  { id: 'cbse_results_3_years', title: 'CBSE BOARD RESULT OF LAST 3-YEARS' },
];

const DisclosureTab: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState('affiliation');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [docUrls, setDocUrls] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'mandatory_disclosure'), (docSnap) => {
      if (docSnap.exists()) {
        setDocUrls(docSnap.data() || {});
      }
    });
    return () => unsub();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }
    setError('');
    setSuccess('');
    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `documents/${selectedDocId}_${Date.now()}.pdf`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        setError('Upload failed: ' + err.message);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await setDoc(doc(db, 'settings', 'mandatory_disclosure'), {
            [selectedDocId]: downloadURL,
          }, { merge: true });
          setSuccess('Document updated successfully!');
        } catch (err: any) {
          setError('Failed to update database: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
          e.target.value = '';
        }
      }
    );
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to remove the custom PDF for this document? It will revert to the default link.')) return;
    try {
      await updateDoc(doc(db, 'settings', 'mandatory_disclosure'), {
        [selectedDocId]: deleteField()
      });
      setSuccess('Custom document link removed.');
    } catch (err: any) {
      setError('Failed to remove document: ' + err.message);
    }
  };

  const currentUrl = docUrls[selectedDocId];

  return (
    <div className="tab-pane">
      <h3>Manage Mandatory Disclosure & Brochure</h3>
      <p>Select a document to update and upload a new PDF.</p>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message" style={{ color: 'green', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={18}/> {success}</div>}
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Select Document to Update:</label>
        <select 
          value={selectedDocId} 
          onChange={(e) => setSelectedDocId(e.target.value)}
          className="form-input"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
        >
          {documentOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.title}</option>
          ))}
        </select>
      </div>

      <div className="current-doc" style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Current Document PDF: </strong>
          {currentUrl ? <a href={currentUrl} target="_blank" rel="noopener noreferrer">View Current PDF</a> : <span>None (using default website link)</span>}
        </div>
        {currentUrl && (
          <button onClick={handleDelete} className="action-btn delete-btn" style={{ padding: '0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--secondary-color)' }} title="Remove Custom PDF">
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <div className="upload-dropzone">
        <input 
          type="file" 
          id="fees-upload" 
          className="file-input"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        <label htmlFor="fees-upload" className="upload-label">
          {uploading ? (
            <>
              <Loader2 size={32} className="spinning" />
              <span>Uploading... {Math.round(progress)}%</span>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
            </>
          ) : (
            <>
              <UploadCloud size={40} className="upload-icon" />
              <span>Click to browse or drag and drop new PDF</span>
              <span className="upload-hint">Supported: PDF only</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default DisclosureTab;
