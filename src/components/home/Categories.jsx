import { useState, useEffect } from "react";
import { useScroll } from "../../hooks/useScroll";
import { getCategories } from "../../api/jobs";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const isScrolled = useScroll(100);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  if (!isScrolled) return null;

  return (
    <div className="bg-gray-100 py-4 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <span
                key={cat}
                className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-green-100 cursor-pointer"
              >
                {cat}
              </span>
            ))
          ) : (
            <span>Loading categories...</span>
          )}
        </div>
      </div>
    </div>
  );
}