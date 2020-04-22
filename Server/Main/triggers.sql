CREATE OR REPLACE FUNCTION update_restaurant_rating() RETURNS TRIGGER AS $$

DECLARE 
    resid     INTEGER;

BEGIN

    SELECT rid INTO resid
    FROM Orders NATURAL JOIN Request
    WHERE oid = NEW.oid;

    RAISE NOTICE 'Restaurant ID to be updated: "%" ', resid;

    UPDATE Restaurants
        SET restaurantrating = (SELECT avg(rating) FROM Orders NATURAL JOIN Request WHERE rid = resid)
        WHERE rid = resid;

    RETURN NULL;

END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_restaurant_rating_trigger on Request;
CREATE TRIGGER update_restaurant_rating_trigger
    AFTER UPDATE OF rating
    ON Request
    FOR EACH ROW
    EXECUTE FUNCTION update_restaurant_rating();