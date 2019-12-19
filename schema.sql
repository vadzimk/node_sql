create table users
(
    email      varchar(255) primary key,
    created_at timestamp default now()
);

insert into users (email)
values ('katie@yahoo.com');

insert into users(email)
values ('tunde@gmail.com');

select *
from users
order by created_at desc;

select count(*)
from users;

-- find the earliest date a user joined
select date_format(created_at, '%M %D %Y')
from users
order by created_at asc
limit 1;

-- find the email of the earlierst user
select email, created_at
from users
order by created_at
limit 1;
-- or
select email
from users
where created_at = (select min(created_at) from users);

-- find users - month joined
select monthname(created_at) month, count(*) count
from users
group by month
order by count;

--  find yahoo emails
select count(email)
from users
where email like '%yahoo.com';

-- calc nunber of users for each email host
select case
           when email like '%gmail.com' then 'gmail'
           when email like '%yahoo.com' then 'yahoo'
           when email like '%hotmail.com' then 'hotmail'
           else 'other'
end as provider,
       count(*) as count
from users group by provider order by count desc;
