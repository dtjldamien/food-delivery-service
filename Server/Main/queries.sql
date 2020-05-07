SELECT item_id,
(SELECT item_name
FROM MenuListings
WHERE item_id = oi.item_id),
count(*) AS num_sold
FROM OrderedItems oi
NATURAL JOIN (OrderStatus os
NATURAL JOIN Orders o)
WHERE oi.restaurant_id = $1
AND o.time_placed BETWEEN $2 AND $3
AND payment_completed = true
GROUP BY oi.item_id
ORDER BY count(*) DESC
LIMIT 5;
-- $1: id of restaurant of interest
-- $2, $3: start and end date of interest

/* View Shifts for a rider */
with TimeTaken as 
(select DR.email, DATEDIFF(second, deliveredDateTime, assignedDateTime) as deliveryTime, month(deliveredDateTime) as month
from Assigned A)


select avg(deliveryTime)
From TimeTaken
where timetaken.email = $1
And timetaken.month = $2;
