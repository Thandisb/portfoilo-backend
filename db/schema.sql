DROP DATABASE IF EXISTS restaurants_dev;
CREATE DATABASE restaurants_dev;

\c restaurants_dev;

CREATE TABLE restaurants(
    id SERIAL PRIMARY KEY,
    name TEXT,
    location VARCHAR(100),
    borough VARCHAR(25),
    type VARCHAR(100),
    health_rating VARCHAR(3),
    price NUMERIC,
    CHECK (price >= 0 AND price <= 5),
    description TEXT,
    hours VARCHAR (100),
    url VARCHAR(100)
    
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 title TEXT,
 content TEXT,
 would_recommend BOOLEAN,
 food_rating NUMERIC,
 CHECK (food_rating >= 0 AND food_rating <= 5),
 service_rating NUMERIC, 
 CHECK (service_rating >= 0 AND service_rating <= 5),
 restaurant_id INTEGER REFERENCES restaurants (id)
 ON DELETE CASCADE
);