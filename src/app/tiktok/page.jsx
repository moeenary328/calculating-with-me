"use client";

import React, { useState } from 'react';

const SimpleForum = () => {
  const [entries, setEntries] = useState([
    { id: 1, rollNo: '19', name: 'Edward Starling', description: 'I,am a web developer from pakistan' },
    { id: 2, rollNo: '15', name: 'Absar Live', description: 'Tiktok Live streamer from pakistan' },
    { id: 3, rollNo: '19', name: 'Royal King', description: 'Tiktok Live stream from USA' }
  ]);

  const [newEntry, setNewEntry] = useState({
    rollNo: '',
    name: '',
    description: ''
  });

  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add new entry
  const addEntry = () => {
    if (newEntry.rollNo && newEntry.name) {
      setEntries([
        ...entries,
        {
          id: Date.now(),
          ...newEntry
        }
      ]);
      setNewEntry({ rollNo: '', name: '', description: '' });
    }
  };

  // Delete entry
  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  // Start edit
  const startEdit = (entry) => {
    setEditId(entry.id);
    setNewEntry({
      rollNo: entry.rollNo,
      name: entry.name,
      description: entry.description
    });
    // Mobile par edit mode mein scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update entry
  const updateEntry = () => {
    if (newEntry.rollNo && newEntry.name) {
      setEntries(entries.map(entry =>
        entry.id === editId
          ? { ...entry, ...newEntry }
          : entry
      ));
      setEditId(null);
      setNewEntry({ rollNo: '', name: '', description: '' });
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setNewEntry({ rollNo: '', name: '', description: '' });
  };

  // Filter entries based on search
  const filteredEntries = entries.filter(entry =>
    entry.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>From Edward Starling</h1>
        <p style={styles.subtitle}>Search By: Roll No | Name | Description</p>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search by roll no, name, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Add/Edit Form */}
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {editId ? '✏️ Edit Entry' : '➕ Add New Entry'}
        </h3>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Tiktok Level"
            value={newEntry.rollNo}
            onChange={(e) => setNewEntry({...newEntry, rollNo: e.target.value})}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Account Name"
            value={newEntry.name}
            onChange={(e) => setNewEntry({...newEntry, name: e.target.value})}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Description/Details"
            value={newEntry.description}
            onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
            style={styles.input}
          />
          <div style={styles.buttonGroup}>
            {editId ? (
              <>
                <button onClick={updateEntry} style={styles.updateButton}>
                  ✅ Update
                </button>
                <button onClick={cancelEdit} style={styles.cancelButton}>
                  ❌ Cancel
                </button>
              </>
            ) : (
              <button onClick={addEntry} style={styles.addButton}>
                ➕ Add Entry
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div style={styles.listContainer}>
        <h3 style={styles.listTitle}>📋 All Entries ({filteredEntries.length})</h3>
        
        {filteredEntries.length === 0 ? (
          <p style={styles.noEntries}>No entries found</p>
        ) : (
          <div style={styles.cardContainer}>
            {/* Mobile View - Cards */}
            <div style={styles.mobileCards}>
              {filteredEntries.map((entry) => (
                <div key={entry.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardLevel}>Level {entry.rollNo}</span>
                    <span style={styles.cardName}>{entry.name}</span>
                  </div>
                  <p style={styles.cardDescription}>{entry.description}</p>
                  <div style={styles.cardActions}>
                    <button 
                      onClick={() => startEdit(entry)}
                      style={styles.cardEditButton}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      style={styles.cardDeleteButton}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div style={styles.tableDesktop}>
              <div style={styles.tableHeader}>
                <div style={styles.rollNoCol}>Level</div>
                <div style={styles.nameCol}>Name</div>
                <div style={styles.descCol}>Description</div>
                <div style={styles.actionsCol}>Actions</div>
              </div>

              {filteredEntries.map((entry) => (
                <div key={entry.id} style={styles.tableRow}>
                  <div style={styles.rollNoCol}>
                    <strong>{entry.rollNo}</strong>
                  </div>
                  <div style={styles.nameCol}>
                    {entry.name}
                  </div>
                  <div style={styles.descCol}>
                    {entry.description}
                  </div>
                  <div style={styles.actionsCol}>
                    <button 
                      onClick={() => startEdit(entry)}
                      style={styles.editButton}
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      style={styles.deleteButton}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Total Entries: {entries.length} | © 2025 Simple Forum
        </p>
      </div>
    </div>
  );
};

// Responsive Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
    '@media (min-width: 768px)': {
      padding: '20px'
    }
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    '@media (min-width: 768px)': {
      marginBottom: '30px'
    }
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a73e8',
    margin: '0 0 5px 0',
    '@media (min-width: 768px)': {
      fontSize: '36px',
      margin: '0 0 10px 0'
    }
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
    '@media (min-width: 768px)': {
      fontSize: '16px'
    }
  },
  searchContainer: {
    maxWidth: '100%',
    margin: '0 auto 15px auto',
    '@media (min-width: 768px)': {
      maxWidth: '600px',
      margin: '0 auto 20px auto'
    }
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '25px',
    outline: 'none',
    transition: 'border-color 0.3s',
    ':focus': {
      borderColor: '#1a73e8'
    },
    '@media (min-width: 768px)': {
      padding: '12px 20px',
      fontSize: '16px'
    }
  },
  formContainer: {
    maxWidth: '100%',
    margin: '0 auto 20px auto',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '@media (min-width: 768px)': {
      maxWidth: '800px',
      margin: '0 auto 30px auto',
      padding: '20px'
    }
  },
  formTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
    '@media (min-width: 768px)': {
      fontSize: '18px',
      margin: '0 0 15px 0'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (min-width: 768px)': {
      gap: '10px'
    }
  },
  input: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '2px solid #e0e0e0',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
    ':focus': {
      borderColor: '#1a73e8'
    },
    '@media (min-width: 768px)': {
      padding: '10px 15px',
      fontSize: '16px'
    }
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '10px',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      gap: '10px'
    }
  },
  addButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1557b0'
    },
    '@media (min-width: 768px)': {
      padding: '12px',
      fontSize: '16px'
    }
  },
  updateButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#34a853',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2d8744'
    },
    '@media (min-width: 768px)': {
      padding: '12px',
      fontSize: '16px'
    }
  },
  cancelButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#d32f2f'
    },
    '@media (min-width: 768px)': {
      padding: '12px',
      fontSize: '16px'
    }
  },
  listContainer: {
    maxWidth: '100%',
    margin: '0 auto',
    '@media (min-width: 768px)': {
      maxWidth: '1000px'
    }
  },
  listTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
    '@media (min-width: 768px)': {
      fontSize: '20px',
      margin: '0 0 15px 0'
    }
  },
  noEntries: {
    textAlign: 'center',
    padding: '30px 15px',
    backgroundColor: 'white',
    borderRadius: '10px',
    color: '#999',
    fontSize: '14px',
    '@media (min-width: 768px)': {
      padding: '40px',
      fontSize: '16px'
    }
  },
  cardContainer: {
    width: '100%'
  },
  // Mobile Cards (visible on mobile only)
  mobileCards: {
    display: 'block',
    '@media (min-width: 768px)': {
      display: 'none'
    }
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  cardLevel: {
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  cardName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  cardDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.4'
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    borderTop: '1px solid #eee',
    paddingTop: '10px'
  },
  cardEditButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  cardDeleteButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  // Desktop Table (hidden on mobile)
  tableDesktop: {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block',
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  },
  tableHeader: {
    display: 'flex',
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '15px',
    fontWeight: 'bold'
  },
  tableRow: {
    display: 'flex',
    padding: '15px',
    borderBottom: '1px solid #e0e0e0',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  rollNoCol: {
    width: '15%',
    fontWeight: 'bold'
  },
  nameCol: {
    width: '25%'
  },
  descCol: {
    width: '45%'
  },
  actionsCol: {
    width: '15%',
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#e0a800'
    }
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c82333'
    }
  },
  footer: {
    marginTop: '30px',
    padding: '15px',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    '@media (min-width: 768px)': {
      marginTop: '40px',
      padding: '20px'
    }
  },
  footerText: {
    color: '#666',
    fontSize: '12px',
    margin: 0,
    '@media (min-width: 768px)': {
      fontSize: '14px'
    }
  }
};

export default SimpleForum;