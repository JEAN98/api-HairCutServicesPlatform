insert into genders (population,letter) values ('Men','M');
insert into genders (population,letter) values ('Women','W');
insert into genders (population,letter) values ('Both','B');


insert into weekdays(weekday) 
values ('Sunday'), ('Monday'), ('Tuesday'),
('Wednesday'), ('Thursday'), ('Friday'),('Saturday');




insert into hairdressing_salons(name,description,email,password,latitud,longitud,gender_id,is_active,lunch_starts,lunch_ends)
VALUES  ('Salon Test', 'Description of salon', 'salonTest@gmail.com','$2b$12$do48UiLKiR0NRKynLAFbIejdeXFwujQvDM963qCmPaEnlqbdc9twy',-488.15,8441.58,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
select * from hairdressing_salons;


insert into workers(hairdressing_salon_id,first_name,last_name,gender_id,is_active,identification_card)
values (1,'Shey','Gonzales Vega',2,true,'207810973');
select * from workers;


insert into schedule(weekday_id,hairdressing_salon_id,shift_starts,shift_ends) values (2,1,'10:00:00','05:00:00');


select * from genders;
select * from weekdays;