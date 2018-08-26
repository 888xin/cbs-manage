create database cbs_manage default character set utf8 collate utf8_general_ci;


CREATE TABLE role
(
    roleId int PRIMARY KEY,
    rolename varchar(15),
    password varchar(255),
    resourceResKeys varchar(255),
    description varchar(255),
    path varchar(255),
    phone varchar(255),
    registerTime datatime,
    lastLoginTime datatime,

    status int
) ;

CREATE TABLE resources
(
    resId int PRIMARY KEY,
    name varchar(15),
    resKey varchar(255),
    resUrl varchar(255),
    description varchar(255),
    type int
) ;

CREATE TABLE rolelogin
(
    loginId int PRIMARY KEY,
    loginName varchar(15),
    loginIP varchar(255),
    loginTime timestamp not null default current_timestamp
) ;


