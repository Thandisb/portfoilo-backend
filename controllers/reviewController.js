const express = require('express')
const router = express.Router({mergeParams: true})

const {getAllReviews, getReviewsOfRestaurant, createReview, updateReview, deleteReviewById}=require("../queries/review")

router.get('/', async(req, res) => {
    try {
        const allReviews = await getAllReviews(req.params.restaurantId)
       console.log(allReviews)
        if(Array.isArray(allReviews)){
             res.json(allReviews)
         }else{
             res.status(400).json({ error: "Server error" });
         } 
    } catch (error) {
        res.status(500).json({error: error})
    }
        
}) 

router.get('/:reviewId', async (req, res) => {
    try {
        const restaurantReviews = await getReviewsOfRestaurant(req.params.restaurantId, req.params.reviewId)
        console.log(restaurantReviews)
        if(restaurantReviews.length === 0){
            throw{
                status: 404,
                message: "Review not found"
            }
        }else{
             res.json(restaurantReviews[0])
        }
    } catch (error) {
        res.status(500).json({error: error})
        
    }
});

router.post('/', async (req, res) => {
    const createdReview = await createReview(req.body);

    res.json(createdReview[0]);
});

router.put('/:id', async (req, res) => {
    const updatedReview = await updateReview(req.params.id, req.body)

    res.json(updatedReview)
});

router.delete('/:id', async (req, res) => {
    const deletedReview = await deleteReviewById(req.params.id)
    res.json(deletedReview)
})


module.exports = router