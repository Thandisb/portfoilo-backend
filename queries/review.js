const db = require('../db/dbConfig');

const getAllReviews = async (restaurantId) => {
    try {
        const allReviews = await db.any(`SELECT * FROM reviews where restaurant_id = $1 ORDER BY id ASC`,
        restaurantId)
        return allReviews
    } catch (error) {
        return error
        
    }
}

const getReviewsOfRestaurant = async (restaurantId, reviewId) => {
    try {
        const restaurantReviews = await db.any(
            `
             SELECT RESTAURANT_ID, 
                  REVIEWER, 
                  TITLE,
                  CONTENT, 
                  FOOD_RATING,
                  SERVICE_RATING 
                  FROM RESTAURANTS
                  JOIN REVIEWS ON RESTAURANTS.ID = REVIEWS.RESTAURANT_ID 
                  WHERE RESTAURANTS.ID = $1
                  AND REVIEWS.ID = $2;`, [restaurantId, reviewId]
        );
        return restaurantReviews;
    } catch (error) {
        return error
    }
}

const createReview = async  (review) => {
    let {restaurant_id, reviewer, title, content,would_recommend, food_rating, service_rating } = review
    try {
        const newReview = await db.any(
            `INSERT INTO reviews(restaurant_id, reviewer, title, content, would_recommend, food_rating, service_rating) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [restaurant_id, reviewer, title, content, would_recommend, food_rating, service_rating]
        )
        return newReview
    } catch (error) {
        return error
    }
}

const updateReview = async (id, review) => {
    let { reviewer, title, content, would_recommend, food_rating, service_rating } = review

    try {
        const updatedReview = await db.any(
          `UPDATE reviews SET reviewer = $1, title = $2, content = $3, would_recommend = $4, food_rating = $5, service_rating = $6 WHERE id = $7 RETURNING *`,
          [reviewer, title, content, would_recommend, food_rating, service_rating, id]
        );
    
        return updatedReview;
      } catch (error) {
        return error;
      }
}
 
const deleteReviewById = async (id) => {
    try {
        const deleteReview = await db.any(
          `DELETE FROM reviews WHERE id = $1 RETURNING *`,
          id
        );
    
        return deleteReview;
      } catch (error) {
        return error;
      }

}

module.exports={
    getAllReviews,
    getReviewsOfRestaurant,
    createReview,
    updateReview,
    deleteReviewById
}