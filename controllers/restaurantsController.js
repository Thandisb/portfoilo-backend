const express = require("express");
const router = express.Router();



const {getAllRestaurants, getRestaurantById, updateRestaurantById, createRestaurant, deleteRestaurant}=require("../queries/restaurants")
const reviewsController = require("./reviewController")
router.use("/:restaurantId/reviews", reviewsController)

router.get("/", async (req, res)=> {
   try {
    const allRestaurants = await getAllRestaurants()
    if(allRestaurants[0]){
        res.status(200).json(allRestaurants)
    } else{
        res.status(404).json({error: 'Server error'})
    }
   } catch (error) {
     res.status(500).json({error: error})
   } 
    
});

router.get("/:id", async (req, res) => {
    try {
        const restaurantById = await getRestaurantById(req.params.id);
        if(!!restaurantById && restaurantById.length > 0) {
            res.json(restaurantById[0])
        } else{
            res.status(404).json({error: 'Restaurant not found'})
        }
    } catch (error) {
        res.status(500).json({error: error})

        
    }
});

router.put("/:id", async (req, res) => {
   const updatedRestaurant = await updateRestaurantById(req.params.id, req.body)

   if(updatedRestaurant.length === 0){
    return res.status(404).jsom({error: "Update Denied"})
   }else{
    return res.json(updatedRestaurant)
   }
});

router.post("/", async (req, res) => {
    const createdRestarant = await createRestaurant(req.body)
    res.json(createdRestarant)
})

router.delete("/:id", async (req, res) => {
    const deletedRestaurant = await deleteRestaurant(req.params.id)
     if(deletedRestaurant.length === 0){
        return res.status(404).json({message: "No data Found!", error: true});
     } else {
        return res.json(deletedRestaurant[0])
     }
})
module.exports=router