import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ratingNumber}) => {
  const [rating, setRating] = useState(ratingNumber);

  return (
    <div className='flex'>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
            className='hidden cursor-pointer'
              type='radio'
              name='rating'
              value={currentRating}
              // onClick={() => setRating(currentRating)}
            />
            <FaStar size={32} color={currentRating <=rating ? 'yellow' : 'gray'} />
          </label>
        );
        
      })}
      {/* <p>Your rating is {rating}</p> */}
    </div>
  );
};

export default Rating;
