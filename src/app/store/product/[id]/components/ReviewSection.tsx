import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../contexts/AuthContext';
import { User } from '../../../../../types/User';

interface Review {
  ReviewId: number;
  Rating: number;
  Comment: string;
  UserId: number;
  User: User;
  ProductId: number;
}

interface ReviewSectionProps {
  productId: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [eror, setEror] = useState("");
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState<Partial<Review>>({
    Rating: 0,
    Comment: '',
  });
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all reviews for this product
  const fetchReviews = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Reviews/Product/${productId}`;
      const response = await axios.get(url);
      setReviews(response.data);
      let total=0
      response.data?.forEach((item)=>{

        let r = item.Rating
        total=total+r

      })
      setRating (total/response?.data?.length)



    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Handle input change for review form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  // Submit a new review
  const submitReview = async () => {

    setEror("")
    if (!newReview.Rating || !newReview.Comment) {
      console.error('Rating and comment are required.');
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Reviews`;
      await axios.post(
         url,
        {
          ...newReview,
          UserId: user?.UserId,
          ProductId: productId, // Ensure the ProductId is correct here
        },
        {
          headers: {
            Authorization: 'Bearer ' + user?.AuthToken,
          },
        }
      );
      setNewReview({ Rating: 0, Comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      const err= error?.response?.data?.Message || "Sabdane ekhane Bipod!!!!"
      setEror(err)
    }
  };

  // Handle editing an existing review
  const editReview = async () => {
    setEror("")
    if (!editingReview?.Rating || !editingReview?.Comment) {
      console.error('Rating and comment are required for editing.');
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Reviews/${editingReview?.ReviewId}`;
      await axios.put(
        url,
        {
          ...editingReview,
          UserId: user?.UserId,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user?.AuthToken,
          },
        }
      );
      setEditingReview(null);
      setIsEditing(false);
      fetchReviews();
    } catch (error) {
      const err= error?.response?.data?.Message || "Sabdane ekhane Bipod!!!!"
      setEror(err)
      console.error('Error editing review:', error);
    }
  };

  // Start editing a review
  const startEditing = (review: Review) => {
    setIsEditing(true);
    setEditingReview({ ...review });
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <h2 className="text-xl font-bold mb-4">Overall Rating: {rating.toFixed(1)}</h2>

      {/* Display reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.ReviewId} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <p className="font-semibold">Rating: {review.Rating}</p>
            <p>Comment: {review.Comment}</p>
            <p className="text-sm text-gray-600">By User: {review.User?.FirstName+" " +review.User?.LastName}</p>
            {review.UserId === user?.UserId && (
              <button
                onClick={() => startEditing(review)}
                className="mt-2 text-blue-500 hover:underline"
              >
                Edit Review
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Review form */}
      <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Your Review' : 'Submit a Review'}</h3>

        <label className="block mb-2 font-semibold">Rating:</label>
        <input
          type="number"
          name="Rating"
          value={isEditing ? editingReview?.Rating : newReview.Rating}
          onChange={isEditing ? (e) => setEditingReview({ ...editingReview, Rating: +e.target.value }) : handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label className="block mb-2 font-semibold">Comment:</label>
        <textarea
          name="Comment"
          value={isEditing ? editingReview?.Comment : newReview.Comment}
          onChange={isEditing ? (e) => setEditingReview({ ...editingReview, Comment: e.target.value }) : handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={isEditing ? editReview : submitReview}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Update Review' : 'Submit Review'}
        </button>
        <p className='text-red-700'>{eror}</p>
      </div>
    </div>
  );
};

export default ReviewSection;
