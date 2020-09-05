drop table appoiment_services;
drop table appoiments;
drop table clients;
drop table workers;
drop table hairdressers_services;
drop table hairdressing_salons;
drop table genders;


create table genders
(
	id serial primary key,
	population varchar(100) not null,
    created_at timestamp,
    updated_at timestamp
);
insert into genders (population) values ('hombre');
insert into genders (population) values ('mujer');
insert into genders (population) values ('ambos');

create table hairdressing_salons
(
    id serial primary key,
    name varchar(100) not null,
	description varchar(500) not null,
	email varchar(100) not null,
	password varchar(200) not null,
	shift_starts time not null,
	shift_ends time not null,
	lunch_time time not null,
	latitud double precision	 not null,
	longitud double precision	 not null,
	photo bytea,
	website varchar(500),
	gender_id int not null,
	is_active boolean not null,

    created_at timestamp,
    updated_at timestamp,
	CONSTRAINT fk_gender_salon
      FOREIGN KEY(gender_id) 
	  REFERENCES genders(id)
);

insert into hairdressing_salons(name,description,email,password,shift_starts,shift_ends,lunch_time,latitud,longitud,gender_id,is_active)
VALUES  ('Salon Test', 'Description of salon', 'salonTest@gmail.com','admin@123',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,-488.15,8441.58,1,true);

create table workers
(
	id serial primary key,
	hairdressing_salon_id int  not null,
	first_name varchar(100),
	last_name varchar(100),
	gender_id int not null,
	is_active boolean,
    created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_gender_workers
      FOREIGN KEY(gender_id) 
	  REFERENCES genders(id),

	CONSTRAINT fk_hairdressing_salon_workers
      FOREIGN KEY(hairdressing_salon_id) 
	  REFERENCES hairdressing_salons(id)
);

insert into workers(hairdressing_salon_id,first_name,last_name,gender_id,is_active)
values (1,'Shey','Gonzales Vega',2,true);

select * from workers;
create table hairdressers_services
(
	id serial primary key,
	title varchar(100) not null,
	description varchar(250) not null,
	cost double precision ,
	time_duration int not null ,
	hairdressing_salon_id int not null,
	gender_id int not null,
	is_active bytea not null,
	is_measurable bytea not null,
    created_at timestamp,
    updated_at timestamp,
    

	CONSTRAINT fk_gender_services_offered
      FOREIGN KEY(gender_id) 
	  REFERENCES genders(id),

	CONSTRAINT fk_hairdressing_salon_services_offered
      FOREIGN KEY(hairdressing_salon_id) 
	  REFERENCES hairdressing_salons(id)
);

create table clients
(
	id serial primary key,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	email varchar(100) not null, 
	password varchar(100) not null,
	birth_day timestamp not null,
	gender_id int not null,
    created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_gender_clients
      FOREIGN KEY(gender_id) 
	  REFERENCES genders(id)

);


create table appoiments
(
	id serial primary key,
	shift_starts timestamp not null,
	shift_ends timestamp not null,
	client_id int not null,
	worker_id int not null,
	hairdressing_salon_id int not null,
	total_time double precision not null,
	total_cost double precision	 not null,
    created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_hairdressing_salon_appoiment
      FOREIGN KEY(hairdressing_salon_id) 
	  REFERENCES hairdressing_salons(id),

	
	CONSTRAINT fk_client_appoiment
      FOREIGN KEY(client_id) 
	  REFERENCES clients(id),

	CONSTRAINT fk_worker_appoiment
      FOREIGN KEY(worker_id) 
	  REFERENCES workers(id)
);



create table appoiment_services
(
	id serial primary key,
	appoiment_id int not null,
	service_id int not null,
    created_at timestamp,
    updated_at timestamp,
	is_active bytea not null,

	CONSTRAINT fk_appoiment_appoimentservices
      FOREIGN KEY(appoiment_id) 
	  REFERENCES appoiments(id),

	CONSTRAINT fk_service_appoimentservices
      FOREIGN KEY(service_id) 
	  REFERENCES hairdressers_services(id)
);


select * from genders;