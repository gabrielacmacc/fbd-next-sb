create type GENRE_TYPE as enum ('Art','Biography','Graphic Novels','Fiction','Nonfiction','Romance','Thriller','Poetry','Horror','Sports','Science','Self Help','Young Adult','Travel');

create type CATEGORY_TYPE as enum ('Books & Literature','Business','Entertainment & Arts','Friends & Common Interest','Geography','Student Groups','Just for Fun');

create type GROUP_TYPE as enum ('Private','Public');

create type GROUP_ROLES as enum ('Member','Moderator','Owner');

create table users (
	uid int primary key,
	username varchar(25) not null unique,
	email varchar(40) not null,
	password char(10) not null,
	activity date not null,
	about varchar(150),
	local varchar(50),
	website varchar(50)
);

create table authors (
	aid int primary key,
	name varchar(50) not null unique,
	descr varchar(250) not null,
	birth_date date not null,
	death_date date
	check (death_date > birth_date),
	website varchar(100)
);

create table classificationAuthors (
	aid int not null,
	author_genre GENRE_TYPE not null,
	foreign key (aid) references authors
	on update cascade
);

create table books (
	bid char(13) primary key,
	name varchar(40) not null,
	resume varchar(500) not null,
	publish_date date not null,
	gl_rating float
);

create table writes (
	aid int not null,
	bid char(13) not null,
	foreign key (aid) references authors
	on update cascade,
	foreign key (bid) references books
	on update cascade
);

create table classificationBooks (
	bid char(13) not null,
	book_genre GENRE_TYPE not null,
	foreign key (bid) references books
	on update cascade
);

create table groups (
	gid int primary key,
	name varchar(60) not null unique,
	description varchar(350) not null,
	rules varchar(100)[] not null
	check (array_length(rules, 1) > 0),
	category_type CATEGORY_TYPE not null,
	group_type GROUP_TYPE not null,
	tags varchar(10)[] not null
	check (array_length(tags, 1) > 0)
);
					   
create table joins (
	uid int not null,
	gid int not null,
	user_role GROUP_ROLES not null,
	foreign key (uid) references users
	on update cascade on delete cascade,
	foreign key (gid) references groups
	on update cascade,
	primary key(uid, gid)
);

create table topics (
	tid int primary key,
	uid int,
	gid int not null,
	title varchar(100) not null unique,
	topic_date date not null,
	foreign key (uid) references users
	on update cascade on delete set null,
	foreign key (gid) references groups
	on update cascade
);

create table topicComments (
	tid int not null,
	uid int,
	topic_comment varchar(250) not null,
	comment_date date not null,
	foreign key (tid) references topics
	on delete cascade,
	foreign key (uid) references users
	on update cascade on delete set null
);

create table challenges (
	cid int primary key,
	name varchar(50) not null unique,
	start_date date not null,
	finish_date date not null
	check (finish_date > start_date)
);

create table starts (
	uid int not null,
	cid int not null,
	goal int not null,
	achieved int not null
	check (achieved <= goal),
	foreign key (uid) references users
	on update cascade on delete cascade,
	foreign key (cid) references challenges,
	primary key (uid, cid)
);

create table lists (
	lid int primary key,
	uid int not null,
	name varchar(60) not null,
	foreign key (uid) references users
	on update cascade on delete cascade
);

create table listContains (
	lid int not null,
	bid char(13) not null,
	foreign key (lid) references lists
	on update cascade on delete cascade,
	foreign key (bid) references books
	on update cascade
);

create table listopias (
	lid int not null,
	ltoid int not null,
	description varchar(250) not null,
	foreign key (lid) references lists
	on update cascade on delete cascade,
	primary key(lid,ltoid)
);

create table votesLikes (
	lid int not null,
	ltoid int not null,
	uid int,
	bid char(13),
	likelto boolean
	check (bid is not null or likelto is not null),
	foreign key (lid,ltoid) references listopias
	on update cascade on delete cascade,
	foreign key (uid) references users
	on update cascade on delete set null,
	foreign key (bid) references books
	on update cascade
);

create table shelves (
	lid int not null,
	sid int not null,
	exclusivity bool not null,
	foreign key (lid) references lists
	on update cascade on delete cascade,
	primary key(lid,sid)
);

create table followUsers (
	uid int not null,
	following_id int not null,
	foreign key (uid) references users
	on update cascade on delete cascade,
	foreign key (following_id) references users
	on update cascade on delete cascade
);

create table followAuthors (
	uid int not null,
	following_id int not null,
	foreign key (uid) references users
	on update cascade on delete cascade,
	foreign key (following_id) references authors
	on update cascade
);

create table favRec (
	uid int not null,
	bid char(13) not null,
	favorite bool not null,
	recommendation bool not null
	check (((favorite or recommendation) is TRUE) and 
		   ((favorite and recommendation) is FALSE)),
	foreign key (uid) references users
	on update cascade on delete cascade,
	foreign key (bid) references books
	on update cascade
);

create table reviews (
	uid int,
	bid char(13) not null,
	review_date date not null,
	rating smallint not null,
	review_comment varchar(500),
	foreign key (uid) references users
	on update cascade on delete set null,
	foreign key (bid) references books
	on update cascade,
	primary key (uid,bid)
);
