import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { Loader2, Trash2, Award } from 'lucide-react';

interface AchieverData {
  id: string;
  name: string;
  message: string;
  imageUrl: string;
  imagePath: string;
}

const AchieversTab: React.FC = () => {
  const [achievers, setAchievers] = useState<AchieverData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'achievers'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: AchieverData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as AchieverData);
      });
      setAchievers(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || !file) {
      setError('Please fill all fields and select a photo.');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const imagePath = `achievers/${Date.now()}_${file.name}`;
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
          await addDoc(collection(db, 'achievers'), {
            name,
            message,
            imageUrl: downloadURL,
            imagePath,
            createdAt: serverTimestamp(),
          });
          setName('');
          setMessage('');
          setFile(null);
          const fileInput = document.getElementById('achiever-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } catch (err: any) {
          setError('Failed to save achiever: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (achiever: AchieverData) => {
    if (!window.confirm(`Delete achiever "${achiever.name}"?`)) return;
    try {
      if (achiever.imagePath) {
        await deleteObject(ref(storage, achiever.imagePath)).catch(console.error);
      }
      await deleteDoc(doc(db, 'achievers', achiever.id));
    } catch (err: any) {
      alert('Error deleting achiever: ' + err.message);
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Achievers</h3>
      
      <form onSubmit={handleSubmit} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem' }}>
        <h4>Add New Achiever</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Achiever Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Achiever Photo</label>
            <input type="file" id="achiever-upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Achievement Description / Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Secured 1st rank in National Science Olympiad." className="form-input" style={{ width: '100%', padding: '0.75rem', minHeight: '80px', borderRadius: '8px', border: '1px solid #ccc' }}/>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <><Loader2 size={16} className="spinning" /> Uploading...</> : <><Award size={16} /> Add Achiever</>}
        </button>
      </form>

      <h4>Current Achievers</h4>
      <div className="file-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {achievers.map((ach) => (
          <div key={ach.id} className="file-card" style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={ach.imageUrl} alt={ach.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{ach.name}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ach.message}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(ach)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', borderColor: '#fca5a5', color: '#ef4444', padding: '0.5rem' }}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
        {achievers.length === 0 && <p>No achievers added yet.</p>}
      </div>
    </div>
  );
};

export default AchieversTab;
