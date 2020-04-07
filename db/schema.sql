CREATE TABLE IF NOT EXISTS "posts"
(
	slug varchar(255) not null
		constraint posts_pk
			primary key,
	title text not null,
	raw_contents text not null,
	parsed_contents text not null,
	created datetime not null,
	updated datetime
);
CREATE UNIQUE INDEX posts_slug_uindex
	on posts (slug);

CREATE TABLE IF NOT EXISTS "users"
(
	username varchar(255)
		constraint users_pk
			primary key,
	password varchar(255)
);
CREATE UNIQUE INDEX users_username_uindex
	on users (username);
