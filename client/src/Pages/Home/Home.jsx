import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:1338/api/products");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
        <p className="text-2xl font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
        <p className="text-2xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-10 text-white bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
        </h1>

        <p className="text-lg text-gray-300 max-w-3xl mx-auto">

        </p>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold">Available Products</h2>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-300">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg p-4 hover:scale-[1.02] transition"
            >
              <img
                src={`https://placehold.co/300x420?text=${encodeURIComponent(
                  product.name
                )}`}
                alt={product.name}
                className="w-full rounded-xl mb-4 border border-white/10"
              />

              <h3 className="text-xl font-bold mb-2">{product.name}</h3>

              <p className="text-gray-300 mb-2">
                {product.description || "No description available."}
              </p>

              <p className="text-white font-medium mb-4">
                {product.price !== null && product.price !== undefined
                  ? `$${Number(product.price).toFixed(2)}`
                  : "Price coming soon"}
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90"
                >
                  View Details
                </Link>

                <button className="border border-white/20 px-4 py-2 rounded-lg text-white hover:bg-white/10">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;