/*versao 3 workbench*/
CREATE TABLE Empresa (
  idempresa INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  Responsavel VARCHAR(45) NULL,
  cnpj CHAR(45) NULL,
  email varchar(40) NULL,
  telefone CHAR(11) NULL,
   PRIMARY KEY (idEmpresa),
    Matriz INT,  foreign key (Matriz) references Empresa(idEmpresa),
  );



CREATE TABLE usuario (
  id_usuario INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  senha CHAR(8) NULL,
  Cpf VARCHAR(45) NULL,
  fkempresa INT,  foreign key (fkempresa) references Empresa(idEmpresa),
  PRIMARY KEY (id_usuario)
  );



-- -----------------------------------------------------
-- Table MedServer.Maquina
-- -----------------------------------------------------
CREATE TABLE Maquina (
  idMaquina INT NOT NULL IDENTITY(1,1),
  Nome VARCHAR(45) NULL,
  Tipo VARCHAR(45) NULL,
  ipv4 VARCHAR(30) NULL,
  cod_MAC VARCHAR(45) NULL,
  andar INT NULL,
  setor VARCHAR(45) NULL,
	fk_empresa INT,  foreign key (fk_empresa) references Empresa(idEmpresa),
  PRIMARY KEY (idMaquina)
  );

CREATE TABLE ram (
  idram INT NOT NULL IDENTITY(1,1),
  tipo VARCHAR(45) NULL,
  capacidade_total VARCHAR(45) NULL,
  fkmaquina INT, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (idram)
  );


CREATE TABLE dados_ram (
  idDados_Ram INT NOT NULL IDENTITY(1,1),
  uso FLOAT,
  reserva INT ,
  disponivel FLOAT NULL,
  velocidade INT NULL,
  data_hora DATETIME NULL,
  fkram INT ,foreign key (fkram) references ram(idram),
  PRIMARY KEY (idDados_Ram)
  );


CREATE TABLE cpu (
  idcpu INT NOT NULL IDENTITY(1,1),
  nome_processador VARCHAR(45) NULL,
  marca VARCHAR(45) NULL,
  num_nucleo INT NULL,
  fkmaquina INT NOT NULL, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (idcpu)
  );



CREATE TABLE dados_CPU (
  idDados_cpu INT NOT NULL IDENTITY(1,1),
  utilização FLOAT NULL,
  processos INT NULL,
  tempoAtividade TIME NULL,
  threads INT NULL,
  velocidade FLOAT NULL,
  data_hora DATETIME NULL,
  quantidade_janela INT NULL,
  fkcpu INT NOT NULL,foreign key (fkcpu) references cpu(idcpu),
  PRIMARY KEY (idDados_cpu)
  );



CREATE TABLE disco (
  iddisco INT IDENTITY(1,1),
  tipo VARCHAR(45) NULL,
  capacidade_total INT NULL,
   fkdisco INT NOT NULL,foreign key (fkdisco) references maquina(idmaquina),
  PRIMARY KEY (iddisco)
  );

CREATE TABLE dados_Disco (
  idDados_disco INT NOT NULL IDENTITY(1,1),
  tempRespota FLOAT,
  velGravacao FLOAT,
  velLeitura FLOAT,
  data_hora DATETIME NULL,
  fkdisco INT NOT NULL,foreign key (fkdisco) references disco(iddisco),
  PRIMARY KEY (idDados_disco)
  );




CREATE TABLE parametros (
  id_parametro INT NOT NULL,
  min INT NULL,
  max INT NULL,
  cor VARCHAR(45) NULL,
  fkMaquina INT NOT NULL, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (fkMaquina)
  );


CREATE TABLE SISTEMA_OPERACIONAL (
  id_sis INT NOT NULL IDENTITY(1,1),
  FABRICANTE VARCHAR(45) NULL,
  tipo_sistema VARCHAR(45) NULL,
  arquitetura VARCHAR(45) NULL,
  tempo_atividade VARCHAR(45) NULL,
  fkmaquina INT NOT NULL, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (id_sis)
  );


select * from usuario;
select * from empresa;


CREATE TABLE Empresa (
  idempresa INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  Responsavel VARCHAR(45) NULL,
  cnpj CHAR(45) NULL,
  email varchar(40) NULL,
  telefone CHAR(11) NULL,
   PRIMARY KEY (idEmpresa),
    Matriz INT,  foreign key (Matriz) references Empresa(idEmpresa),
  );



CREATE TABLE usuario (
  id_usuario INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  senha CHAR(8) NULL,
  Cpf VARCHAR(45) NULL,
  fkempresa INT,  foreign key (fkempresa) references Empresa(idEmpresa),
  PRIMARY KEY (id_usuario)
  );



-- -----------------------------------------------------
-- Table MedServer.Maquina
-- -----------------------------------------------------
CREATE TABLE Maquina (
  idMaquina INT NOT NULL IDENTITY(1,1),
  Nome VARCHAR(45) NULL,
  Tipo VARCHAR(45) NULL,
  ipv4 VARCHAR(30) NULL,
  cod_MAC VARCHAR(45) NULL,
  andar INT NULL,
  setor VARCHAR(45) NULL,
	fk_empresa INT,  foreign key (fk_empresa) references Empresa(idEmpresa),
  PRIMARY KEY (idMaquina)
  );

CREATE TABLE ram (
  idram INT NOT NULL IDENTITY(1,1),
  tipo VARCHAR(45) NULL,
  capacidade_total VARCHAR(45) NULL,
  fkmaquina INT, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (idram)
  );


CREATE TABLE dados_ram (
  idDados_Ram INT NOT NULL IDENTITY(1,1),
  uso FLOAT,
  reserva INT ,
  disponivel FLOAT NULL,
  velocidade INT NULL,
  data_hora DATETIME NULL,
  fkram INT ,foreign key (fkram) references ram(idram),
  PRIMARY KEY (idDados_Ram)
  );


CREATE TABLE cpu (
  idcpu INT NOT NULL IDENTITY(1,1),
  nome_processador VARCHAR(45) NULL,
  marca VARCHAR(45) NULL,
  num_nucleo INT NULL,
  fkmaquina INT NOT NULL, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (idcpu)
  );



CREATE TABLE dados_CPU (
  idDados_cpu INT NOT NULL IDENTITY(1,1),
  utilização FLOAT NULL,
  processos INT NULL,
  tempoAtividade TIME NULL,
  threads INT NULL,
  velocidade FLOAT NULL,
  data_hora DATETIME NULL,
  quantidade_janela INT NULL,
  fkcpu INT NOT NULL,foreign key (fkcpu) references cpu(idcpu),
  PRIMARY KEY (idDados_cpu)
  );



CREATE TABLE disco (
  iddisco INT IDENTITY(1,1),
  tipo VARCHAR(45) NULL,
  capacidade_total INT NULL,
   fkdisco INT NOT NULL,foreign key (fkdisco) references maquina(idmaquina),
  PRIMARY KEY (iddisco)
  );

CREATE TABLE dados_Disco (
  idDados_disco INT NOT NULL IDENTITY(1,1),
  tempRespota FLOAT,
  velGravacao FLOAT,
  velLeitura FLOAT,
  data_hora DATETIME NULL,
  fkdisco INT NOT NULL,foreign key (fkdisco) references disco(iddisco),
  PRIMARY KEY (idDados_disco)
  );




CREATE TABLE parametros (
  id_parametro INT NOT NULL,
  min INT NULL,
  max INT NULL,
  cor VARCHAR(45) NULL,
  fkMaquina INT NOT NULL, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (fkMaquina)
  );


CREATE TABLE SISTEMA_OPERACIONAL (
  id_sis INT NOT NULL IDENTITY(1,1),
  FABRICANTE VARCHAR(45) NULL,
  tipo_sistema VARCHAR(45) NULL,
  arquitetura VARCHAR(45) NULL,
  tempo_atividade VARCHAR(45) NULL,
  fkmaquina INT NOT NULL, foreign key (fkmaquina) references maquina(idmaquina),
  PRIMARY KEY (id_sis)
  );


select * from usuario;
select * from empresa;


























/*--------------------------------------------------------*/
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

