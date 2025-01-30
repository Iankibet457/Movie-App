import React, { useState } from 'react';

const ReviewList = ({ reviews, onAddReview, onDeleteReview }) => {
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddReview({ review: reviewText });
        setReviewText('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Add a review"
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Submit</button>
            </form>
            <ul className="space-y-2">
                {reviews.map((review) => (
                    <li key={review.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
                        <span>{review.review}</span>
                        <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700" onClick={() => onDeleteReview(review.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
