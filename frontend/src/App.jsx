import { useEffect, useState } from 'react';
import ProductList from './ProductList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch products`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: 'sans-serif', gap: '1rem', padding: '2rem' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#334155', fontSize: '1.2rem', fontWeight: 500, margin: 0 }}>Loading products...</p>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>
          Render free tier services spin down when inactive. If this is the first visit, it may take 30–50 seconds to wake up.
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: 'sans-serif', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ef4444', margin: 0 }}>Unable to load products</h2>
        <p style={{ color: '#64748b', margin: 0 }}>{error}</p>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          Target API URL: <code>{API_URL}</code>
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '0.5rem', padding: '0.6rem 1.4rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default App;