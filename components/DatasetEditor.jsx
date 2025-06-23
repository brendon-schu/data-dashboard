import { useState } from 'react';

export default function DatasetEditor({val}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({ id: null, name: '', notes: '' });

  const handleOpenEdit = (id, name, notes) => {
    setEditData({ id, name, notes });
    setModalVisible(true);
  };

  const handleSave = async () => {
    await fetch('/api/update-dataset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    setModalVisible(false);
    // Optional: refresh data here
  };

  return (
    <>
      {/* Example usage */}
      <a className="text-green-400 hover:underline cursor-pointer ml-4" onClick={() => handleOpenEdit(val.id, val.name, val.notes)}>Edit</a>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Dataset</h2>
            <input
              className="border p-2 mb-2 w-full"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Dataset Name"
            />
            <textarea
              className="border p-2 mb-4 w-full"
              value={editData.notes}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
              placeholder="Notes"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button className="btn" onClick={() => setModalVisible(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

