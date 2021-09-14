`SELECT distinct(ab.admins), CONCAT(c.firstname, ' ', c.lastname) from
(select distinct(unnest(u_ids)) as admins, name from workgroups 
UNION
(WITH x AS (
select distinct(unnest(u_ids)) as admins from appadmingroups
)

SELECT xx.admins, CONCAT(col.firstname, ' ', col.lastname) as name from colleagues col
right join x xx
on col.col_id = xx.admins
group by xx.admins, name)) ab
JOIN colleagues c
on ab.admins = c.col_id`