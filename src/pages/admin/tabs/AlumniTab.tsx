import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { Loader2, Trash2, GraduationCap } from 'lucide-react';

interface AlumniData {
  id: string;
  name: string;
  work: string;
  message: string;
  year: string;
  imageUrl: string;
  imagePath: string;
}

const AlumniTab: React.FC = () => {
  const [alumni, setAlumni] = useState<AlumniData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [work, setWork] = useState('');
  const [message, setMessage] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'alumni'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: AlumniData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as AlumniData);
      });
      setAlumni(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !work || !message || !year || !file) {
      setError('Please fill all fields and select a photo.');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const imagePath = `alumni/${Date.now()}_${file.name}`;
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
          await addDoc(collection(db, 'alumni'), {
            name,
            work,
            message,
            year,
            imageUrl: downloadURL,
            imagePath,
            createdAt: serverTimestamp(),
          });
          setName('');
          setWork('');
          setMessage('');
          setYear('');
          setFile(null);
          const fileInput = document.getElementById('alumni-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } catch (err: any) {
          setError('Failed to save alumni: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (alumnus: AlumniData) => {
    if (!window.confirm(`Delete alumni "${alumnus.name}"?`)) return;
    try {
      if (alumnus.imagePath) {
        await deleteObject(ref(storage, alumnus.imagePath)).catch(console.error);
      }
      await deleteDoc(doc(db, 'alumni', alumnus.id));
    } catch (err: any) {
      alert('Error deleting alumni: ' + err.message);
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Alumni</h3>
      
      <form onSubmit={handleSubmit} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem' }}>
        <h4>Add New Alumni Profile</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Alumni Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Doe" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Current Work / Profession</label>
            <input type="text" value={work} onChange={(e) => setWork(e.target.value)} placeholder="e.g. Software Engineer at Google" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Passing Year</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2015" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Alumni Picture</label>
            <input type="file" id="alumni-upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Message / Quote</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. The school shaped my foundation..." className="form-input" style={{ width: '100%', padding: '0.75rem', minHeight: '80px', borderRadius: '8px', border: '1px solid #ccc' }}/>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <><Loader2 size={16} className="spinning" /> Uploading...</> : <><GraduationCap size={16} /> Add Alumni</>}
        </button>
      </form>

      <h4>Current Alumni Profiles</h4>
      <div className="file-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {alumni.map((al) => (
          <div key={al.id} className="file-card" style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={al.imageUrl} alt={al.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{al.name} (Batch: {al.year})</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{al.work}</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{al.message}"</p>
            <button onClick={() => handleDelete(al)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', borderColor: '#fca5a5', color: '#ef4444', padding: '0.5rem' }}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
        {alumni.length === 0 && <p>No alumni profiles added yet.</p>}
      </div>
    </div>
  );
};

export default AlumniTab;
