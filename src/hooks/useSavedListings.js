import { useState, useEffect } from 'react';

const useSavedListings = () => {
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const response = await fetch('/api/saved-listings');
        if (!response.ok) {
          throw new Error("Sorry! There was an unexpected error loading the saved listing. Please try refreshing the page and if the problem persists contact support");
        }
        const data = await response.json();
        setSavedListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedListings();
  }, []);
  return { savedListings, loading, error };
};

export default useSavedListings;
