import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { FileText, UploadCloud, Loader2, Trash2 } from 'lucide-react';

interface TCData {
  id: string;
  year: string;
  url: string;
  path: string;
}

const TCTab: React.FC = () => {
  const [tcs, setTcs] = useState<TCData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Form State
  const [year, setYear] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'tcs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: TCData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as TCData);
      });
      setTcs(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !file) {
      setError('Please provide a year and select a document.');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const filePath = `tcs/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (err) => {
        setError('Upload failed: ' + err.message);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'tcs'), {
            year,
            url: downloadURL,
            path: filePath,
            createdAt: serverTimestamp(),
          });
          setYear('');
          setFile(null);
          const fileInput = document.getElementById('tc-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } catch (err: any) {
          setError('Failed to save TC: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (tc: TCData) => {
    if (!window.confirm(`Delete TC for year "${tc.year}"?`)) return;
    try {
      if (tc.path) {
        await deleteObject(ref(storage, tc.path)).catch(console.error);
      }
      await deleteDoc(doc(db, 'tcs', tc.id));
    } catch (err: any) {
      alert('Error deleting TC: ' + err.message);
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Transfer Certificates (TC)</h3>
      
      <form onSubmit={handleSubmit} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem' }}>
        <h4>Add New TC Document</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Academic Year</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024-2025" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>TC Document (PDF/Image)</label>
            <input type="file" id="tc-upload" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <><Loader2 size={16} className="spinning" /> Uploading...</> : <><UploadCloud size={16} /> Upload TC</>}
        </button>
      </form>

      <h4>Current Uploaded TCs</h4>
      <div className="file-grid">
        {tcs.map((tc) => (
          <div key={tc.id} className="file-card" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(10,25,47,0.05)', padding: '1rem', borderRadius: '8px' }}>
                 <FileText size={32} style={{ color: 'var(--primary-color)' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>TC - Year: {tc.year}</h4>
                <a href={tc.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--secondary-color)' }}>View Document</a>
              </div>
            </div>
            <button onClick={() => handleDelete(tc)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', borderColor: '#fca5a5', color: '#ef4444' }}>
              <Trash2 size={16} /> Delete TC
            </button>
          </div>
        ))}
        {tcs.length === 0 && <p>No TCs uploaded yet.</p>}
      </div>
    </div>
  );
};

export default TCTab;
