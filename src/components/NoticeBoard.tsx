import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Bell } from 'lucide-react';
import './NoticeBoard.css';

interface UpdateItem {
  id: string;
  text: string;
}

const NoticeBoard: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    // Fetch latest updates from Firestore, ordered by newest first
    const q = query(collection(db, 'latestUpdates'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: UpdateItem[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, text: doc.data().text });
      });
      setUpdates(data);
    });
    return () => unsub();
  }, []);

  // If there are no updates in the database, don't render the notice board
  if (updates.length === 0) {
    return null;
  }

  return (
    <section className="notice-board-section">
      <div className="container">
        <div className="notice-board">
          <div className="notice-header">
            <Bell size={20} className="notice-icon" />
            <span className="notice-title">Latest Updates</span>
          </div>
          <div className="notice-ticker-wrapper">
            <div className="notice-ticker">
              {updates.map((update) => (
                <span key={update.id} className="notice-item">
                  <span className="notice-dot"></span>
                  {update.text}
                </span>
              ))}
              {/* Duplicate for seamless scrolling */}
              {updates.map((update) => (
                <span key={`dup-${update.id}`} className="notice-item">
                  <span className="notice-dot"></span>
                  {update.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
