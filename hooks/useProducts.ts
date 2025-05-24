import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/product';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [activeFilters, setActiveFilters] = useState({
    searchQuery: '',
    minRating: 0,
    minPrice: 0,
    maxPrice: 1000,  
  });


  useEffect(() => {
    fetchProducts();
  }, []);

      const fetchProducts = async () => {
        console.log('Fetching products...');
        setLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');  
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };


    const applyFilters = useCallback(() => {
    let result = [...products];
    
    // Apply search filter
    if (activeFilters.searchQuery) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (activeFilters.minRating > 0) {
      result = result.filter(product => 
        product.rating.rate >= activeFilters.minRating
      );
    }
    
    // Apply price filter
    result = result.filter(product =>
      product.price >= activeFilters.minPrice && 
      product.price <= activeFilters.maxPrice
    );
    
    setFilteredProducts(result);
  }, [products, activeFilters]);


    useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [products, activeFilters, applyFilters]);
 
  
    const searchProducts = (query: string) => {
    setActiveFilters(prev => ({ ...prev, searchQuery: query }));
  }; 

  const filterByRating = (minRating: number) => {
    setActiveFilters(prev => ({ ...prev, minRating }));
  };
  
 

    const filterByPrice = (minPrice: number, maxPrice: number) => {
    setActiveFilters(prev => ({ 
      ...prev, 
      minPrice: Math.min(minPrice, maxPrice),
      maxPrice: Math.max(minPrice, maxPrice)
    }));
  };
 


  const resetFilters = () => {
    // setFilteredProducts(products);
     setActiveFilters({
      searchQuery: '',
      minRating: 0,
      minPrice: 0,
      maxPrice: 1000,
    });
  };

  return {
    products: filteredProducts,
    loading,
    error,
    searchProducts,
    filterByRating,
    filterByPrice,
    resetFilters,
    activeFilters,
    fetchProducts
  };
};

export default useProducts;