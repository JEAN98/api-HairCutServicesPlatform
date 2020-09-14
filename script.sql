drop table IF EXISTS appoiment_services;
drop table IF EXISTS appoiments;
drop table IF EXISTS schedules;
drop table IF EXISTS weekdays;
drop table IF EXISTS facebook_accounts;
drop table IF EXISTS google_accounts;
drop table IF EXISTS haircut_platform_accounts;
drop table IF EXISTS clients;
drop table IF EXISTS workers;
drop table IF EXISTS hairdressers_services;
drop table IF EXISTS hairdressing_salons;
drop table IF EXISTS genders;

create table genders
(
	id serial primary key,
	population varchar(100) not null,
	letter varchar(1) not null,
    created_at timestamp,
    updated_at timestamp
);


create table weekdays(
	id serial primary key,
    weekday varchar(50) not null UNIQUE,
	created_at timestamp,
    updated_at timestamp
);


create table hairdressing_salons
(
    id serial primary key,
    name varchar(100) not null,
	description varchar(500) not null,
	email varchar(100) not null UNIQUE,
	password varchar(200) not null,
	lunch_starts time not null,
	lunch_ends time not null,
	latitud double precision  not null,
	longitud double precision not null,
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



create table schedules(
	weekday_id int not null,
	hairdressing_salon_id int not null,
	shift_starts time not null,
	shift_ends time not null,
	created_at timestamp,
    updated_at timestamp,

	 PRIMARY KEY(weekday_id,hairdressing_salon_id),


	CONSTRAINT fk_weekdays
      FOREIGN KEY(weekday_id) 
	  REFERENCES weekdays(id),

	CONSTRAINT fk_hairdressing_salon_weekdays
      FOREIGN KEY(hairdressing_salon_id) 
	  REFERENCES hairdressing_salons(id)
);


create table workers
(
	id serial primary key,
	hairdressing_salon_id int  not null,
	identification_card varchar(100) not null UNIQUE,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	gender_id int not null,
	is_active BOOLEAN not null,
	birthday timestamp,
    created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_gender_workers
      FOREIGN KEY(gender_id) 
	  REFERENCES genders(id),

	CONSTRAINT fk_hairdressing_salon_workers
      FOREIGN KEY(hairdressing_salon_id) 
	  REFERENCES hairdressing_salons(id)
);




create table hairdressers_services
(
	id serial primary key,
	title varchar(100) not null,
	code varchar(100) not null UNIQUE,
	description varchar(250) not null,
	cost double precision ,
	time_duration_min int not null ,
	hairdressing_salon_id int not null,
	gender_id int not null,
	is_active BOOLEAN  not null,
	is_measurable BOOLEAN  not null,
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
	birthday timestamp ,
	is_soccial_account boolean not null,
	gender_id int not null,
    created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_gender_clients
      FOREIGN KEY(gender_id) 
	  REFERENCES genders(id)
);

create table haircut_platform_accounts
(
	id serial primary key,
	email varchar(100) not null UNIQUE,
	password varchar(100) not null,
	client_id int not null,
	created_at timestamp,
    updated_at timestamp,
	CONSTRAINT fk_client_haircut_platform_accounts
      FOREIGN KEY(client_id) 
	  REFERENCES clients(id)
);

create table facebook_accounts
(
	id serial primary key,
	email varchar(100) not null,
	token varchar(100) not null,
	facebook_id int not null,
	client_id int not null,
	created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_client_facebook
      FOREIGN KEY(client_id) 
	  REFERENCES clients(id)
);

create table google_accounts
(
	id serial primary key,
	email varchar(100) not null,
	token varchar(100) not null,
	google_id int not null,
	client_id int not null,
	created_at timestamp,
    updated_at timestamp,

	CONSTRAINT fk_client_google
      FOREIGN KEY(client_id) 
	  REFERENCES clients(id)
);

create table appoiments
(
	id serial primary key,
	shift_starts timestamp not null,
	shift_ends timestamp not null,
	client_id int not null,
	worker_id int not null, 
	total_time double precision not null,
	total_cost double precision	 not null,
    created_at timestamp,
    updated_at timestamp,

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
	is_active BOOLEAN  not null,

	CONSTRAINT fk_appoiment_appoimentservices
      FOREIGN KEY(appoiment_id) 
	  REFERENCES appoiments(id),

	CONSTRAINT fk_service_appoimentservices
      FOREIGN KEY(service_id) 
	  REFERENCES hairdressers_services(id)
);


