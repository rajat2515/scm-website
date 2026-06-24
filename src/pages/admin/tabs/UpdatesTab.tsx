import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, query, orderBy, writeBatch } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Loader2, Trash2, ListPlus } from 'lucide-react';

interface UpdateData {
  id: string;
  text: string;
  createdAt: any;
}

const UpdatesTab: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateData[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  
  const [text, setText] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Order by createdAt descending so newest is at the top of the admin list
    const q = query(collection(db, 'latestUpdates'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: UpdateData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as UpdateData);
      });
      setUpdates(data);
    });
    return () => unsub();
  }, []);

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Update text cannot be empty.');
      return;
    }
    setError('');
    setSaving(true);

    try {
      await addDoc(collection(db, 'latestUpdates'), {
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (err: any) {
      setError('Failed to add update: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSingle = async (id: string) => {
    if (!window.confirm('Delete this update?')) return;
    try {
      await deleteDoc(doc(db, 'latestUpdates', id));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (err: any) {
      alert('Error deleting update: ' + err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} updates?`)) return;
    
    setDeleting(true);
    try {
      const batch = writeBatch(db);
      selectedIds.forEach(id => {
        batch.delete(doc(db, 'latestUpdates', id));
      });
      await batch.commit();
      setSelectedIds(new Set());
    } catch (err: any) {
      alert('Error performing bulk delete: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === updates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(updates.map(u => u.id)));
    }
  };

  return (
    <div className="tab-pane">
      <h3>Manage Latest Updates (Ticker)</h3>
      <p>Configure the scrolling text that appears in the Latest Updates ticker on the home page.</p>
      
      <form onSubmit={handleAddUpdate} className="admin-form" style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', marginBottom: '2rem', marginTop: '1rem' }}>
        <h4>Add New Update</h4>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Update Text *</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="e.g. Admissions are now open for the upcoming session!" 
            className="form-input" 
            style={{ width: '100%', padding: '0.75rem', minHeight: '80px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {saving ? <><Loader2 size={16} className="spinning" /> Saving...</> : <><ListPlus size={16} /> Add Update</>}
        </button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4>Current Updates</h4>
        {selectedIds.size > 0 && (
          <button 
            onClick={handleBulkDelete} 
            disabled={deleting}
            className="btn btn-outline" 
            style={{ borderColor: '#fca5a5', color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
          >
            {deleting ? <Loader2 size={16} className="spinning" /> : <Trash2 size={16} />}
            Remove Selected ({selectedIds.size})
          </button>
        )}
      </div>

      <div className="updates-list" style={{ display: 'grid', gap: '0.75rem' }}>
        {updates.length > 0 && (
          <div style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <input 
              type="checkbox" 
              checked={updates.length > 0 && selectedIds.size === updates.length}
              onChange={toggleSelectAll}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Select All</span>
          </div>
        )}

        {updates.map((update) => (
          <div key={update.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', border: selectedIds.has(update.id) ? '2px solid var(--secondary-color)' : '1px solid #eee', borderRadius: '12px', alignItems: 'center', transition: 'all 0.2s' }}>
            <input 
              type="checkbox" 
              checked={selectedIds.has(update.id)}
              onChange={() => toggleSelection(update.id)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            
            <div style={{ flexGrow: 1 }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{update.text}</p>
            </div>
            
            <button 
              onClick={() => handleDeleteSingle(update.id)} 
              className="btn btn-outline" 
              title="Remove Update"
              style={{ padding: '0.4rem', borderColor: '#fca5a5', color: '#ef4444', display: 'flex' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {updates.length === 0 && <p style={{ color: '#666', fontStyle: 'italic' }}>No updates currently active.</p>}
      </div>
    </div>
  );
};

export default UpdatesTab;
