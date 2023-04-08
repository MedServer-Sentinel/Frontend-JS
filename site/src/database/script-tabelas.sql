create database medServer;
use medServer;
create table Empresa(
id_Empresa int primary key auto_increment,
nome varchar(40),
email varchar(40),
cnpj char(14),
telefone char(11),
responsavel varchar(30)
);

create table usuario(
id_usuario int primary key auto_increment,
nome varchar(40),
senha varchar(40),
email varchar(40),
cpf char(11),
fkempresa int, foreign key (fkempresa) references empresa(id_empresa)
);

delimiter $
CREATE TRIGGER update_usuario
AFTER INSERT ON empresa 
FOR EACH ROW
BEGIN
 update usuario set fkEmpresa = (select max(id_empresa) from empresa) where id_usuario = last_insert_id() ;
END $

select * from usuario;
select * from empresa;


/*versao 2*/
create database medServer;
use medServer;
create table Empresa(
id_Empresa int primary key auto_increment,
nome varchar(40),
email varchar(40),
cnpj char(14),
telefone char(11),
responsavel varchar(30)
);

create table usuario(
id_usuario int primary key auto_increment,
nome varchar(40),
senha varchar(40),
email varchar(40),
cpf char(11),
fkempresa int, foreign key (fkempresa) references empresa(id_empresa)
);



select * from empresa;

select * from usuario;

