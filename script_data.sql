
insert into genders (population,letter) values ('Men','M');
insert into genders (population,letter) values ('Women','W');
insert into genders (population,letter) values ('Both','B');


insert into weekdays(weekday,day_number) 
values ('Domingo',0), ('Lunes',1), ('Martes',2),
('Miércoles',3), ('Jueves',4), ('Viernes',5),('Sábado',6);




insert into hairdressing_salons(name,description,email,password,latitud,longitud,gender_id,is_active,lunch_starts,lunch_ends)
VALUES  ('Salon Test', 'Description of salon', 'salonTest@gmail.com','$2b$12$do48UiLKiR0NRKynLAFbIejdeXFwujQvDM963qCmPaEnlqbdc9twy',-488.15,8441.58,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
select * from hairdressing_salons;


insert into workers(hairdressing_salon_id,first_name,last_name,gender_id,is_active,identification_card)
values (1,'Shey','Gonzales Vega',2,true,'207810973');
select * from workers;


insert into schedules(weekday_id,hairdressing_salon_id,shift_starts,shift_ends) values (2,1,'10:00:00','17:00:00');


insert into clients(first_name,last_name,age,is_soccial_account,gender_id)
values('Geronimo','Vega',18,false,1);


insert into haircut_platform_accounts(email,password,client_id)
values('hcAccounts@qa.com','$2b$12$0we0L5kMWEYJ.uyYVLtEPOlZb8viA6/Bz7ns/ouk90YSPuIgXlFuu',1);


INSERT INTO hairdressers_services(title,code,description,cost,time_duration_min,is_active,hairdressing_salon_id,gender_id,is_measurable) 
VALUES ('Sacar las cejas','Service001','Usando nuestro equipo procedemos a sacar las cejas',1000,15,true,1,1,true);


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
			and DATE(ap.shift_starts) = DATE('2017-06-22 07:00:00')
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
left join workers on sch.hairdressing_salon_id = workers.hairdressing_salon_id
where workers.id = 1 and
extract(dow from date '2020-09-15 10:00:00') = weekdays.day_number
and '2020-09-15 10:00:00' between sch.shift_starts and sch.shift_ends
and '2020-09-15 11:00:00' between sch.shift_starts and sch.shift_ends;



select SUM(cost) as totalCost, SUM(time_duration_min) as totalTime
from hairdressers_services
where id in (1,2)


select hds.* 
from hairdressers_services as hds 
inner join hairdressing_salons as hs on hs.id = hds.hairdressing_salon_id
inner join workers as wk on wk.hairdressing_salon_id = hs.id
where  wk.id  = 2

/*ALTER TABLE clients ALTER COLUMN age DROP NOT NULL;

ALTER TABLE facebook_accounts ALTER COLUMN facebook_id TYPE varchar(500);
*/

to_timestamp(concat(DATE('2020-10-22 10:00:00'),' ',to_char(lunch_starts,'HH24:MI:SS')),'YYYY-MM-DD HH24:MI:SS') as shift_starts 
				,to_timestamp(concat(DATE('2020-10-22 10:00:00'),' ',to_char(lunch_ends,'HH24:MI:SS')),'YYYY-MM-DD HH24:MI:SS')  as shift_ends 



/*
SET TIMEZONE='America/Costa_Rica';

SHOW TIMEZONE;

current => CST6

*/


/*



ALTER TABLE weekdays
ADD day_number int;

ALTER TABLE weekdays
ALTER COLUMN day_number SET not null;

ALTER TABLE weekdays ADD UNIQUE (day_number);


update weekdays
set day_number = 0
where weekday = 'Sunday';

update weekdays
set day_number = 1
where weekday = 'Monday';


update weekdays
set day_number = 2
where weekday = 'Tuesday';

update weekdays
set day_number = 3
where weekday = 'Wednesday'; 

update weekdays
set day_number = 4
where weekday = 'Thursday'; 

update weekdays
set day_number = 5
where weekday = 'Friday'; 


update weekdays
set day_number = 6
where weekday = 'Saturday'; 


select * from weekdays;



*/