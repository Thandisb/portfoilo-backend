const db = require("../db/dbConfig")

const getAllRestaurants = async () => {
    try {
        const allRestaurants = await db.any("SELECT * FROM restaurants");
        return allRestaurants
    } catch (error) {
        return error
    }
}

const getRestaurantById = async (id) => {
    try {
        const oneRestaurant = await db.any("SELECT * FROM restaurants WHERE id=$1", [id]);
        return oneRestaurant
    } catch (error) {
        return error
        
    }
}


const updateRestaurantById = async ( id, restaurant) => {
    let { name, location, borough, type, health_rating, price, description, hours, url} = restaurant;
    try {
      const updatedRestaurant = await db.any(
        `UPDATE restaurants SET name = $1, location = $2, borough = $3, type= $4, health_rating = $5, price = $6, description = $7, hours = $8, url=$9,  WHERE id = $10 RETURNING *`,
        [name, location, borough, type, health_rating, price, description, hours, url, id]
      );
  
      return updatedRestaurant;
    } catch (error) {
      return error;
    }
}

const createRestaurant = async (restaurant) => {
    let { name, location, borough, type, health_rating, price, description, hours, url,  } = restaurant;
    try {
        const newRestaurant = await db.one(
            "INSERT INTO restaurants(name, location, borough, type, health_rating, price, description, hours, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, ) RETURNING *",
            [name, location, borough, type, health_rating, price, description, hours, url]
        )
        console.log(newRestaurant)
        return newRestaurant
    } catch (error) {
        return error
    }
}

const deleteRestaurant = async (id) => {
    try {
        const deletedRestaurant = await db.any(
            `DELETE FROM restaurants WHERE id = $1 RETURNING *`, id
        ) 
        return deletedRestaurant
    } catch (error) {
        return error
    }
    
}
module.exports={
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    createRestaurant,
    deleteRestaurant
}