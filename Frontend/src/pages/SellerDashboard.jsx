import React, { useEffect, useState } from "react";

const SellerDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      description: "Latest generation Apple smartphone",
      price: 1099,
      stock: 15,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400"
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      description: "High-end Android phone",
      price: 849,
      stock: 23,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
    },
    {
      id: 3,
      name: "AirPods Pro",
      description: "Wireless headphones with noise cancellation",
      price: 249,
      stock: 5,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
    }
  ]);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
    "Toys"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Image size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must not exceed 5MB");
        return;
      }

      // File type validation
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image: reader.result });
        } else {
          setNewProduct({ ...newProduct, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in all required fields (name, price, stock)");
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category || "Uncategorized",
      image: newProduct.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", description: "", price: "", stock: "", category: "", image: null });
    setImagePreview(null);
    setShowAddForm(false);
    alert("✅ Product added successfully!");
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
    setImagePreview(product.image);
    setShowAddForm(false);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
      alert("Please fill in all required fields");
      return;
    }

    setProducts(products.map(p => 
      p.id === editingProduct.id ? {
        ...editingProduct,
        price: parseFloat(editingProduct.price),
        stock: parseInt(editingProduct.stock)
      } : p
    ));
    
    setEditingProduct(null);
    setImagePreview(null);
    alert("✅ Product updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      alert("🗑️ Product deleted successfully");
    }
  };

  const resetForm = () => {
    setNewProduct({ name: "", description: "", price: "", stock: "", category: "", image: null });
    setImagePreview(null);
    setShowAddForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}> Seller Dashboard</h1>
        <p style={styles.subtitle}>Manage your products and inventory</p>
      </div>

      <div style={styles.content}>
        {/* Button to show/hide form */}
        {!editingProduct && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={styles.toggleButton}
          >
            {showAddForm ? "✕ Cancel" : "➕ Add New Product"}
          </button>
        )}

        {/* Add product form */}
        {showAddForm && !editingProduct && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>➕ Add New Product</h2>
            <div style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name *</label>
                  <input
                    name="name"
                    placeholder="Ex: iPhone 14 Pro"
                    value={newProduct.name}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your product in detail..."
                  value={newProduct.description}
                  onChange={handleChange}
                  style={{...styles.input, minHeight: '100px', resize: 'vertical'}}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Price (FCFA) *</label>
                  <input
                    name="price"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Stock *</label>
                  <input
                    name="stock"
                    placeholder="0"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                />
                <p style={styles.helpText}>Format: JPG, PNG, GIF (Max: 5MB)</p>
                
                {imagePreview && (
                  <div style={styles.imagePreviewContainer}>
                    <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
                    <button 
                      onClick={() => {
                        setImagePreview(null);
                        setNewProduct({...newProduct, image: null});
                      }}
                      style={styles.removeImageBtn}
                    >
                      ✕ Remove Image
                    </button>
                  </div>
                )}
              </div>

              <div style={styles.formActions}>
                <button onClick={handleAddProduct} style={styles.addButton}>
                  ✓ Add Product
                </button>
                <button onClick={resetForm} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit product form */}
        {editingProduct && (
          <div style={{...styles.card, border: '3px solid #667eea'}}>
            <h2 style={styles.cardTitle}>✏️ Edit Product</h2>
            <div style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name *</label>
                  <input
                    name="name"
                    placeholder="Ex: iPhone 14 Pro"
                    value={editingProduct.name}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    name="category"
                    value={editingProduct.category}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your product in detail..."
                  value={editingProduct.description}
                  onChange={handleChange}
                  style={{...styles.input, minHeight: '100px', resize: 'vertical'}}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Price (FCFA) *</label>
                  <input
                    name="price"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Stock *</label>
                  <input
                    name="stock"
                    placeholder="0"
                    type="number"
                    value={editingProduct.stock}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                />
                <p style={styles.helpText}>Format: JPG, PNG, GIF (Max: 5MB)</p>
                
                {imagePreview && (
                  <div style={styles.imagePreviewContainer}>
                    <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
                    <button 
                      onClick={() => {
                        setImagePreview(editingProduct.image);
                        setEditingProduct({...editingProduct, image: editingProduct.image});
                      }}
                      style={styles.removeImageBtn}
                    >
                      ↺ Reset Image
                    </button>
                  </div>
                )}
              </div>

              <div style={styles.formActions}>
                <button onClick={handleUpdateProduct} style={styles.updateButton}>
                  ✓ Save Changes
                </button>
                <button onClick={handleCancelEdit} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products list */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>📦 My Products ({products.length})</h2>
            <div style={styles.stats}>
              <span style={styles.statBadge}>
                ⚠️ Low Stock: {products.filter(p => p.stock < 10).length}
              </span>
            </div>
          </div>
          
          <div style={styles.productsGrid}>
            {products.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyMessage}>📦 No products available</p>
                <p style={styles.emptySubtext}>Add your first product to get started!</p>
              </div>
            ) : (
              products.map((p) => (
                <div key={p.id} style={styles.productCard}>
                  <div style={styles.productImageContainer}>
                    <img 
                      src={p.image} 
                      alt={p.name}
                      style={styles.productImage}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
                      }}
                    />
                    {p.stock < 10 && (
                      <div style={styles.lowStockBadge}>
                        ⚠️ Low Stock
                      </div>
                    )}
                  </div>
                  
                  <div style={styles.productInfo}>
                    <div style={styles.productCategory}>{p.category}</div>
                    <h3 style={styles.productName}>{p.name}</h3>
                    <p style={styles.productDescription}>{p.description}</p>
                    
                    <div style={styles.productMeta}>
                      <span style={styles.price}>{p.price} FCFA</span>
                      <span style={{
                        ...styles.stockBadge,
                        backgroundColor: p.stock < 10 ? '#fee2e2' : '#d1fae5',
                        color: p.stock < 10 ? '#dc2626' : '#059669'
                      }}>
                        Stock: {p.stock}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.productActions}>
                    <button 
                      style={styles.editButton}
                      onClick={() => handleEditProduct(p)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      style={styles.deleteButton}
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '2.5em',
  },
  subtitle: {
    margin: 0,
    fontSize: '1.1em',
    opacity: 0.9,
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  toggleButton: {
    padding: '15px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  cardTitle: {
    margin: '0 0 25px 0',
    fontSize: '1.8em',
    color: '#1f2937',
  },
  stats: {
    display: 'flex',
    gap: '10px',
  },
  statBadge: {
    padding: '8px 15px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '20px',
    fontSize: '0.9em',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  label: {
    fontSize: '0.95em',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '12px 15px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1em',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  fileInput: {
    padding: '12px',
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95em',
  },
  helpText: {
    fontSize: '0.85em',
    color: '#6b7280',
    margin: 0,
  },
  imagePreviewContainer: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  imagePreview: {
    maxWidth: '300px',
    maxHeight: '300px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    objectFit: 'cover',
  },
  removeImageBtn: {
    padding: '8px 15px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  formActions: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  addButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  updateButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  productCard: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  productImageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  lowStockBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85em',
    fontWeight: '600',
  },
  productInfo: {
    padding: '20px',
  },
  productCategory: {
    display: 'inline-block',
    padding: '4px 10px',
    backgroundColor: '#e0e7ff',
    color: '#667eea',
    borderRadius: '12px',
    fontSize: '0.8em',
    fontWeight: '600',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '1.2em',
    color: '#1f2937',
    margin: '0 0 10px 0',
  },
  productDescription: {
    fontSize: '0.9em',
    color: '#6b7280',
    marginBottom: '15px',
    minHeight: '40px',
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    color: '#667eea',
    fontSize: '1.3em',
  },
  stockBadge: {
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '0.85em',
    fontWeight: '600',
  },
  productActions: {
    display: 'flex',
    gap: '0',
    borderTop: '1px solid #e5e7eb',
  },
  editButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95em',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  },
  deleteButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderLeft: '1px solid white',
    cursor: 'pointer',
    fontSize: '0.95em',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyMessage: {
    fontSize: '1.5em',
    color: '#9ca3af',
    margin: '0 0 10px 0',
  },
  emptySubtext: {
    fontSize: '1.1em',
    color: '#d1d5db',
    margin: 0,
  },
};

export default SellerDashboard;
