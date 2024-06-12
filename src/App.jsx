import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Spinner from "./components/Spinner";
import SavedListings from "./components/SavedListings";
import useSavedListing from "./hooks/useSavedListing";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [currentListingId, setCurrentListingId] = useState();
    const { savedListing, loadingSavedListing, errorLoadingSavedListing } =
        useSavedListing(currentListingId);
    const [calendarOpen, setCalendarOpen] = useState(false);

    useEffect(() => {
        setCalendarOpen(true);
    }, [currentListingId]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate loading time
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="app-container">
            <SavedListings setCurrentListingId={setCurrentListingId} />

            <div className={`calendar-container ${calendarOpen ? "open" : ""}`}>
                <button className="close-button" onClick={() => setCalendarOpen(false)}>
                    Close
                </button>
                {!loadingSavedListing && !savedListing && (
                    <p>Select a listing to see its available tour days</p>
                )}
                {errorLoadingSavedListing ? <>{errorLoadingSavedListing}</> : <></>}
                {loadingSavedListing ? (
                    <Spinner />
                ) : savedListing && !errorLoadingSavedListing ? (
                    <Calendar availableTourDays={savedListing.openHouses} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default App;
