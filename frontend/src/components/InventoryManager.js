import React, { useState } from 'react';
import '../styles.css';

const InventoryManager = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', quantity: 10, price: 799.99 },
    { id: 2, name: 'Smartphone', quantity: 25, price: 499.99 },
    { id: 3, name: 'Headphones', quantity: 50, price: 149.99 },
    { id: 4, name: 'Mouse', quantity: 66, price: 789.99 },
    { id: 5, name: 'Keyboard', quantity: 27, price: 543.99 },
    { id: 6, name: 'Table', quantity: 67, price: 876.99 },
    { id: 7, name: 'Monitor', quantity: 15, price: 200.99 },
    { id: 8, name: 'Charger', quantity: 70, price: 49.99 },
    { id: 9, name: 'Desk Lamp', quantity: 23, price: 39.99 },
    { id: 10, name: 'Notebook', quantity: 100, price: 5.99 },
    { id: 11, name: 'Pen', quantity: 500, price: 1.99 },
    { id: 12, name: 'Speaker', quantity: 25, price: 149.99 },
    { id: 13, name: 'Notebook', quantity: 100, price: 5.99 },
    { id: 14, name: 'Pen', quantity: 500, price: 1.99 },
    { id: 15, name: 'Speaker', quantity: 25, price: 149.99 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // For filtering
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 5; // Number of items per page

  const addItem = () => {
    if (newItem.name.trim() === '' || newItem.quantity.trim() === '' || newItem.price.trim() === '') return;
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ name: '', quantity: '', price: '' });
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setNewItem({ name: item.name, quantity: item.quantity, price: item.price });
  };

  const saveEdit = () => {
    setItems(
      items.map((item) =>
        item.id === currentItem.id ? { ...item, ...newItem } : item
      )
    );
    setIsEditing(false);
    setNewItem({ name: '', quantity: '', price: '' });
  };

  // Filter items based on searchTerm
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="inventory-container">
      <div className="header-section">
        <h1>Inventory Manager</h1>
        <p>Manage your items with ease!</p>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        {!isEditing ? (
          <button className="add-button" onClick={addItem}>
            Add Item
          </button>
        ) : (
          <button className="edit-button" onClick={saveEdit}>
            Save
          </button>
        )}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="no-items">
                  No items match your search!
                </td>
              </tr>
            )}
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? 'active' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
