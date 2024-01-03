import React, { useState, useEffect } from 'react';
import './GiveReviews.css';

const GiveReviews = ({ serialNumber, onReviewSubmit, review }) => {
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
    });

    const [submitted, setSubmitted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const storedFormData = localStorage.getItem(`reviewFormData_${serialNumber}`);
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
            setSubmitted(true);
        }
    }, [serialNumber]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            review: review || prevFormData.review
        }));
    }, [review]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating: rating
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.review && formData.rating > 0) {
            localStorage.setItem(`reviewFormData_${serialNumber}`, JSON.stringify(formData));
            onReviewSubmit(serialNumber, formData.review); // Pass the review to the parent component
            setSubmitted(true);
            setShowWarning(false);
        } else {
            setShowWarning(true);
        }
    };

    const renderStar = (rating) => {
        const starClasses = `star ${formData.rating >= rating ? 'filled' : ''} ${formData.rating === rating ? 'clicked' : ''}`;

        return (
            <span
                key={rating}
                className={starClasses}
                onClick={() => handleRatingChange(rating)}
            >
                ⭐️
            </span>
        );
    };


    if (submitted) {
        return (
            <div className="review-box">
                <h2>Your Review has been Recorded!</h2>
                <p>
                    <strong>Name:</strong> {formData.name}
                </p>
                <p>
                    <strong>Review:</strong> {formData.review}
                </p>
                <p>
                    <strong>Rating:</strong> {Array(formData.rating).fill('⭐️').join('')}
                </p>
            </div>
        );
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Give Your Feedback</h2>
                {showWarning && <p className="warning">Please fill out all fields.</p>}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="review">Review:</label>
                    <textarea id="review" name="review" value={formData.review} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((rating) => renderStar(rating))}
                        <br />
                    </div>
                </div>
                <button className='btngivereview' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GiveReviews;