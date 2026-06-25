import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { UploadCloud, Loader2, Trash2 } from 'lucide-react';

interface ResultData {
  id: string;
  year: string;
  title: string;
  imageUrl: string;
  imagePath: string;
}

const ResultsTab: React.FC = () => {
  const [results, setResults] = useState<ResultData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Form State
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'results'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: ResultData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as ResultData);
      });
      setResults(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !title || !file) {
      setError('Please fill all fields and select an image.');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const imagePath = `results/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, imagePath);
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
          await addDoc(collection(db, 'results'), {
            year,
            title,
            imageUrl: downloadURL,
            imagePath,
            createdAt: serverTimestamp(),
          });
          setYear('');
          setTitle('');
          setFile(null);
          const fileInput = document.getElementById('result-img-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } catch (err: any) {
          setError('Failed to save result: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (resultData: ResultData) => {
    if (!window.confirm(`Delete result "${resultData.title}"?`)) return;
    try {
      if (resultData.imagePath) {
        await deleteObject(ref(storage, resultData.imagePath)).catch(console.error);
      }
      await deleteDoc(doc(db, 'results', resultData.id));
    } catch (err: any) {
      alert('Error deleting result: ' + err.message);
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Results</h3>
      
      <form onSubmit={handleSubmit} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem' }}>
        <h4>Add New Result</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Academic Year</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2025-2026" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Title / Description</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Class 12 Board Toppers" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Result Image / Banner</label>
            <input type="file" id="result-img-upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <><Loader2 size={16} className="spinning" /> Uploading...</> : <><UploadCloud size={16} /> Add Result</>}
        </button>
      </form>

      <h4>Current Results</h4>
      <div className="file-grid">
        {results.map((res) => (
          <div key={res.id} className="file-card">
            <div className="file-card-preview">
              <img src={res.imageUrl} alt={res.title} />
            </div>
            <div className="file-card-info">
              <h4 title={res.title}>{res.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem 0' }}>Year: {res.year}</p>
              <div className="file-card-actions">
                <button onClick={() => handleDelete(res)} className="action-btn delete-btn" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && <p>No results uploaded yet.</p>}
      </div>
    </div>
  );
};

export default ResultsTab;
