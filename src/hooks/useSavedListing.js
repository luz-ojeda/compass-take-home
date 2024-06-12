import { useState, useEffect } from 'react';

const useSavedListing = (id) => {
  const [savedListing, setSavedListing] = useState();
  const [loadingSavedListing, setLoadingSavedListing] = useState(false);
  const [errorLoadingSavedListing, setError] = useState(null);

  useEffect(() => {
    const fetchSavedListing = async () => {
      if (!id) return

      try {
        setLoadingSavedListing(true)
        setError(null)
        const response = await fetch(`/api/saved-listings/${id}`);
        if (!response.ok) {
          throw new Error("Sorry! There was an unexpected error loading the saved listing. Please try refreshing the page and if the problem persists contact support");
        }
        const data = await response.json();
        setSavedListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSavedListing(false);
      }
    };
    fetchSavedListing();
  }, [id]);
  return { savedListing, loadingSavedListing, errorLoadingSavedListing };
};

export default useSavedListing;
