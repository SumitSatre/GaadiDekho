import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Rating } from '@mui/material';

const ReviewModal = ({ onClose, onSubmit }) => {
  const [review, setReview] = useState({
    message: '',
    rating: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setReview({ ...review, rating: newValue });
  };

  const handleSubmit = async () => {
    if (!review.message || review.rating === 0) {
      alert('Please enter a review message and rating.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4001/api/v1/add/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });

      if (response.ok) {
        alert('Review submitted successfully');
        setReview({ message: '', rating: 0 });
        onClose();
      } else {
        alert('Failed to submit review.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 3, width: 400 }}>
      <Typography variant="h5" gutterBottom>
        Write a Review
      </Typography>

      <TextField
        fullWidth
        label="Review Message"
        name="message"
        value={review.message}
        onChange={handleInputChange}
        multiline
        rows={4}
        required
      />

      <Box sx={{ marginY: 2 }}>
        <Typography variant="body1">Rating:</Typography>
        <Rating name="rating" value={review.rating} onChange={handleRatingChange} />
      </Box>

      <Button variant="contained" fullWidth onClick={() => onSubmit(review)}>
        Submit Review
      </Button>

    </Box>
  );
};

export default ReviewModal;
