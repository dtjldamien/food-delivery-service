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

/* Ensure that there is an hour break between consecutive 4 hour work shifts */
CREATE OR REPLACE FUNCTION check_break_between_intervals() RETURNS TRIGGER AS $$
DECLARE  
sTime TIME;  
eTime TIME; 

    BEGIN  
        SELECT endTime INTO etime 
        FROM Shifts 
        WHERE startDate = NEW.startDate;  
        SELECT startTime 
        INTO sTime 
        FROM Shifts 
        WHERE startDate = NEW.startDate;     
    IF NEW.startTime <= eTime AND NEW.endTime > eTime THEN
        RAISE exception 'At least an hour break in between';
    END IF;
        IF NEW.endTime >= sTime AND NEW.startTime < sTime THEN
        RAISE exception 'At least an hour break in between';
    END IF;     
    RETURN NEW; 
END
$$ LANGUAGE plpgsql; 

DROP TRIGGER IF EXISTS break_trigger ON Shifts;
CREATE TRIGGER break_trigger
    BEFORE UPDATE OR INSERT      
    ON Shifts     
    FOR EACH ROW      
    EXECUTE FUNCTION check_break_between_intervals(); 

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
