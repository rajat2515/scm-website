import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { Loader2, Trash2, Bell, CheckCircle } from 'lucide-react';

interface AnnouncementData {
  id: string;
  text: string;
  order: number;
  isActive: boolean;
  imageUrl?: string;
  imagePath?: string;
}

const AnnouncementsTab: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Form State
  const [text, setText] = useState('');
  const [order, setOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: AnnouncementData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as AnnouncementData);
      });
      setAnnouncements(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      setError('Announcement text is required.');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    let downloadURL = '';
    let imagePath = '';

    try {
      if (file) {
        imagePath = `announcements/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, imagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (err) => reject(err),
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await addDoc(collection(db, 'announcements'), {
        text,
        order: Number(order),
        isActive,
        ...(downloadURL ? { imageUrl: downloadURL, imagePath } : {}),
        createdAt: serverTimestamp(),
      });
      
      setText('');
      setOrder(announcements.length + 2); // Default to next order
      setFile(null);
      const fileInput = document.getElementById('announcement-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setError('Failed to save announcement: ' + err.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (announcement: AnnouncementData) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      if (announcement.imagePath) {
        await deleteObject(ref(storage, announcement.imagePath)).catch(console.error);
      }
      await deleteDoc(doc(db, 'announcements', announcement.id));
    } catch (err: any) {
      alert('Error deleting announcement: ' + err.message);
    }
  };

  const toggleActive = async (announcement: AnnouncementData) => {
    try {
      await updateDoc(doc(db, 'announcements', announcement.id), {
        isActive: !announcement.isActive
      });
    } catch (err: any) {
      alert('Error toggling status: ' + err.message);
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Announcements (Popup)</h3>
      <p>Configure popups that appear when visitors open the website. Lower order number shows first.</p>
      
      <form onSubmit={handleSubmit} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem', marginTop: '1rem' }}>
        <h4>Add New Announcement</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Announcement Text *</label>
            <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="e.g. Admissions are now open for 2026-2027!" 
              className="form-input" 
              style={{ width: '100%', padding: '0.75rem', minHeight: '80px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Display Order</label>
              <input 
                type="number" 
                value={order} 
                onChange={(e) => setOrder(Number(e.target.value))} 
                className="form-input" 
                style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
              />
              <small style={{ color: '#666' }}>1 = Highest Priority (Shows first)</small>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Optional Image</label>
              <input 
                type="file" 
                id="announcement-upload" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="active-toggle" 
              checked={isActive} 
              onChange={(e) => setIsActive(e.target.checked)} 
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="active-toggle" style={{ fontWeight: 'bold', cursor: 'pointer' }}>Set as Active immediately</label>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <><Loader2 size={16} className="spinning" /> Uploading...</> : <><Bell size={16} /> Add Announcement</>}
        </button>
      </form>

      <h4>Current Announcements</h4>
      <div className="file-grid" style={{ display: 'grid', gap: '1rem' }}>
        {announcements.map((ann) => (
          <div key={ann.id} style={{ display: 'flex', gap: '1.5rem', padding: '1rem', background: '#fff', border: '1px solid #eee', borderRadius: '12px', alignItems: 'center' }}>
            {ann.imageUrl && (
              <div style={{ width: '100px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={ann.imageUrl} alt="Announcement" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ background: 'var(--bg-gray)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Order: {ann.order}</span>
                <span style={{ color: ann.isActive ? 'green' : 'gray', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {ann.isActive && <CheckCircle size={14} />} {ann.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{ann.text}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={() => toggleActive(ann)} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                {ann.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => handleDelete(ann)} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: '#fca5a5', color: '#ef4444' }}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
        {announcements.length === 0 && <p>No announcements added yet.</p>}
      </div>
    </div>
  );
};

export default AnnouncementsTab;
