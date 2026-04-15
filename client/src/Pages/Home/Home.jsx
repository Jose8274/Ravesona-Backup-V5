import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Strapi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:1338/api/products");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add to Cart
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1,
          image: `https://placehold.co/300x420?text=${encodeURIComponent(product.name)}`,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-10 text-white bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a]">
      {/* Products */}
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Available Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-300">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg p-4 hover:scale-[1.02] transition"
            >
              {/* Image */}
              <img
                src={
                  product?.image?.[0]?.url
                    ? `http://localhost:1338${product.image[0].url}`
                    : `https://placehold.co/300x420?text=${encodeURIComponent(product.name)}`
                }
                alt={product.name}
                className="w-full rounded-xl mb-4 border border-white/10"
              />

                {/* Info */}
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>

              <p className="text-gray-300 mb-2">
                {product.description || "No description available."}
              </p>

              <p className="text-white font-medium mb-4">
                {product.price
                  ? `$${Number(product.price).toFixed(2)}`
                  : "Price coming soon"}
              </p>

                {/* Buttons */}
              <div className="flex gap-3">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="border border-white/20 px-4 py-2 rounded-lg text-white hover:bg-white/10"
                >
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