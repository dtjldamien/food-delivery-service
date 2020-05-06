/* Refreshes Restaurant Rating on reviews */
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

/* Checks dates of promotions to ensure no clash */
-- CREATE OR REPLACE FUNCTION check_restaurant_promotions() RETURNS TRIGGER AS $$

-- DECLARE 
--     clash   INTEGER;

-- BEGIN 
--     RAISE NOTICE 'rpid: "%"', NEW.rpid;    
--     RAISE NOTICE 'startdate: "%"', NEW.startdate;
--     RAISE NOTICE 'enddate: "%"', NEW.enddate;

--     SELECT rpid INTO clash
--     FROM RestaurantPromotions
--     WHERE (startdate::date >= NEW.startdate::date AND NEW.enddate::date <= enddate::date)
--     AND rpid <> NEW.rpid
--     LIMIT 1;

--     RAISE NOTICE 'clash: "%', clash;

--     IF clash IS NOT NULL THEN 
--         RAISE exception 'Date range clashes with existing records.';
--     END IF;

--     RETURN NULL;
-- END 

-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS check_restaurant_promotions_trigger on RestaurantPromotions;
-- CREATE TRIGGER check_restaurant_promotions_trigger
--     AFTER UPDATE OF startdate OR INSERT
--     ON RestaurantPromotions
--     FOR EACH ROW
--     EXECUTE FUNCTION check_restaurant_promotions();

/* Updates FDSPromotion Usage */
CREATE OR REPLACE FUNCTION update_fdspromotion_count() RETURNS TRIGGER AS $$

    BEGIN

    RAISE NOTICE 'Promotion ID "%" used.', NEW.pcid;

    UPDATE FDSPromotions
        SET currentCount = currentCount + 1
        WHERE pcid = NEW.pcid; 

    RETURN NULL;

END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_fdspromotion_count_trigger on Apply;
CREATE TRIGGER update_fdspromotion_count_trigger
    AFTER INSERT
    ON Apply
    FOR EACH ROW
    EXECUTE FUNCTION update_fdspromotion_count();