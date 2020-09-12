
insert into hairdressing_salons(name,description,email,password,shift_starts,shift_ends,latitud,longitud,gender_id,is_active,lunch_starts,lunch_ends)
VALUES  ('Salon Test', 'Description of salon', 'salonTest@gmail.com','$2b$12$do48UiLKiR0NRKynLAFbIejdeXFwujQvDM963qCmPaEnlqbdc9twy',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,-488.15,8441.58,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
select * from hairdressing_salons;


insert into workers(hairdressing_salon_id,first_name,last_name,gender_id,is_active,identification_card)
values (1,'Shey','Gonzales Vega',2,true,'207810973');
select * from workers;



select * from genders;
select * from weekdays;