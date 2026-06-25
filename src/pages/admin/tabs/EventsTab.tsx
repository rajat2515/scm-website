import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { UploadCloud, Loader2, Trash2 } from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  imagePath: string;
  createdAt: any;
}

const EventsTab: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: EventData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as EventData);
      });
      setEvents(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !date || !file) {
      setError('Please fill all fields and select an image.');
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);

    const imagePath = `events/${Date.now()}_${file.name}`;
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
          await addDoc(collection(db, 'events'), {
            title,
            category,
            date,
            imageUrl: downloadURL,
            imagePath,
            createdAt: serverTimestamp(),
          });
          setTitle('');
          setCategory('');
          setDate('');
          setFile(null);
          // reset file input manually
          const fileInput = document.getElementById('event-img-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } catch (err: any) {
          setError('Failed to save event: ' + err.message);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (eventData: EventData) => {
    if (!window.confirm(`Delete event "${eventData.title}"?`)) return;
    try {
      if (eventData.imagePath) {
        await deleteObject(ref(storage, eventData.imagePath)).catch(console.error);
      }
      await deleteDoc(doc(db, 'events', eventData.id));
    } catch (err: any) {
      alert('Error deleting event: ' + err.message);
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Event Gallery</h3>
      
      <form onSubmit={handleSubmit} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem' }}>
        <h4>Add New Event</h4>
        {error && <div className="error-message">{error}</div>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Event Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annual Sports Day" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Sports, Cultural" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Date / Year</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. 2025 or Oct 12, 2025" className="form-input" style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
          <div>
            <label>Event Image</label>
            <input type="file" id="event-img-upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: '0.5rem' }}/>
          </div>
        </div>

        <button type="submit" disabled={uploading} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <><Loader2 size={16} className="spinning" /> Uploading...</> : <><UploadCloud size={16} /> Add Event</>}
        </button>
      </form>

      <h4>Current Events</h4>
      <div className="file-grid">
        {events.map((ev) => (
          <div key={ev.id} className="file-card">
            <div className="file-card-preview">
              <img src={ev.imageUrl} alt={ev.title} />
            </div>
            <div className="file-card-info">
              <h4 title={ev.title}>{ev.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem 0' }}>{ev.category} • {ev.date}</p>
              <div className="file-card-actions">
                <button onClick={() => handleDelete(ev)} className="action-btn delete-btn" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && <p>No events uploaded yet.</p>}
      </div>
    </div>
  );
};

export default EventsTab;
