import React from "react";
import useSavedListings from "../hooks/useSavedListings";

const SavedListings = ({ setCurrentListingId }) => {
    const { savedListings, loading, error } = useSavedListings();

    const handleListingClick = id => {
        setCurrentListingId(id);
    };

    return (
        <div>
            <h1>Saved Listings</h1>
            {loading && <div>Loading....</div>}
            {error && <div>{error}</div>}
            <div className="saved-listings-container">
                {savedListings.map(listing => (
                    <div
                        key={listing.id}
                        className="listing-card"
                        onClick={() => handleListingClick(listing.id)}
                    >
                        <div className="listing-header">
                            <h2>{listing.address}</h2>
                            <p>
                                {listing.city}, {listing.state} {listing.zipCode}
                            </p>
                        </div>
                        <div className="listing-body">
                            <p>
                                <strong>⭐ Favorited:</strong> {listing.isFavorited ? "Yes" : "No"}
                            </p>
                            <p>
                                <strong>💵 Price:</strong> ${listing.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedListings;
