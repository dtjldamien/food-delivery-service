/* For a given restaurant, find the id and amount sold of the top 5 most purchased food
items in a given time frame */
SELECT fid,
    (SELECT fname
    FROM FoodItems
    WHERE fid = c.fid),
    count(*) AS items_sold
FROM Contains c
NATURAL JOIN Orders o
WHERE c.rid = $1
AND o.orderDateTime BETWEEN $2 AND $3
GROUP BY c.fid
ORDER BY count(*) DESC
LIMIT 5;
-- $1: id of given restaurant
-- $2, $3: start and end date of given time frame

/* View average delivery time by a Rider for a certain month */
with TimeTaken as 
(select DR.email, DATEDIFF(second, deliveredDateTime, assignedDateTime) as deliveryTime, month(deliveredDateTime) as month
from Assigned A)
select avg(deliveryTime)
From TimeTaken
where timetaken.email = $1
And timetaken.month = $2;

/* View delivery rider statistics by month, year and restaurant */
SELECT dr.email, COUNT(*) as num_deliveries, SUM(deliveredDateTime - assignedDateTime) as total_travel_time, AVG(serviceReview) as avg_rating
FROM DeliveryRiders dr LEFT JOIN ASSIGNED a ON (dr.email = a.email) LEFT JOIN Orders o ON (a.oid = o.oid)
WHERE $1 = (SELECT EXTRACT(MONTH FROM deliveredDateTime))
AND $2 = (SELECT EXTRACT(YEAR FROM deliveredDateTime))
AND $3 = (o.rid)
GROUP BY (dr.email)
ORDER BY num_deliveries desc, AVG(serviceReview) desc, total_travel_time