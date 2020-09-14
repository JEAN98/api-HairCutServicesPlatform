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


insert into schedules(weekday_id,hairdressing_salon_id,shift_starts,shift_ends) values (2,1,'10:00:00','05:00:00');


select * from genders;
select * from weekdays;

/*
insert into appoiments
(shift_starts,shift_ends,client_id,worker_id,total_time,total_cost)
values('2017-06-22 10:00:00','2017-06-22 11:00:00',1,1,1,5000),
('2017-06-22 14:00:00','2017-06-22 15:00:00',2,1,1,5000),
('2017-06-22 15:00:00','2017-06-22 16:00:00',3,1,1,5000);


*/
select * 
		from (
			select shift_starts, shift_ends
			from appoiments as ap
			where ap.worker_id = 1
			and DATE(ap.shift_starts) = '2017-06-22' 
			and DATE(ap.shift_ends) = '2017-06-22' 
		) as workerAuxTable
	where 
	'2017-06-22 07:00:00' >= workerAuxTable.shift_starts and 
	'2017-06-22 07:00:00' < workerAuxTable.shift_ends

	or '2017-06-22 10:00:00' < workerAuxTable.shift_starts and 
	'2017-06-22 10:00:00' >= workerAuxTable.shift_ends

	or workerAuxTable.shift_starts >= '2017-06-22 07:00:00' and 
	workerAuxTable.shift_starts < '2017-06-22 10:00:00'

	or workerAuxTable.shift_ends < '2017-06-22 07:00:00' and 
	workerAuxTable.shift_ends >= '2017-06-22 10:00:00' ;


/*In order to review the appoiment matches with schedule of the hairdressing salon*/

select weekdays.weekday from
schedules as sch
inner join weekdays on sch.weekday_id = weekdays.id
where extract(dow from date '2020-09-15') + 1  = sch.weekday_id
and '2020-09-15 10:00:00' between sch.shift_starts and sch.shift_ends
and '2020-09-15 11:00:00' between sch.shift_starts and sch.shift_ends;