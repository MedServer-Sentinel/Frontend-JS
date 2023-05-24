/*versao 3 workbench*/
CREATE TABLE Empresa (
  idempresa INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  responsavel VARCHAR(45) NULL,
  cnpj CHAR(45) NULL,
  cep char(20),
  email varchar(40) NULL,
  telefone CHAR(11) NULL,
   PRIMARY KEY (idEmpresa),
    Matriz INT,  foreign key (Matriz) references Empresa(idEmpresa),
  );



CREATE TABLE usuario (
  id_usuario INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  senha CHAR(20) NULL,
  Cpf VARCHAR(45) NULL,
  tipo varchar(20),
  fkempresa INT,  foreign key (fkempresa) references Empresa(idEmpresa),
  PRIMARY KEY (id_usuario)
  );



  CREATE TABLE Maquina (
id_maquina INT NOT NULL IDENTITY(1,1),
nome VARCHAR(45),
tipo VARCHAR(45),
cod_MAC VARCHAR(45) NOT NULL,
andar VARCHAR(45),
setor VARCHAR(45),
PRIMARY KEY (id_maquina)
);


CREATE TABLE MemoriaRam (
id_ram INT NOT NULL IDENTITY(1,1),
capacidade_total VARCHAR(45) NOT NULL,
fk_maquina INT UNIQUE NOT NULL,
PRIMARY KEY (id_ram),
CONSTRAINT fk_ram_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE DadosRam (
id_dados_ram INT NOT NULL IDENTITY(1,1),
em_uso VARCHAR(45) NOT NULL,
disponivel VARCHAR(45)NOT NULL,
data_hora DATETIME NOT NULL,
fk_ram INT NOT NULL,
PRIMARY KEY (id_dados_ram),
CONSTRAINT fk_dados_ram_ram1
FOREIGN KEY (fk_ram)
REFERENCES MemoriaRam (id_ram)
);

CREATE TABLE Processador (
id_processador INT NOT NULL IDENTITY(1,1),
nome_processador VARCHAR(200) NOT NULL,
frequencia VARCHAR(45) NOT NULL,
num_nucleo INT NOT NULL,
fk_maquina INT UNIQUE NOT NULL,
PRIMARY KEY (id_processador),
CONSTRAINT fk_cpu_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE Processo (
id_processo INT NOT NULL IDENTITY(1,1),
pid INT NOT NULL,
nome VARCHAR(45) NOT NULL,
uso_cpu DOUBLE NOT NULL,
uso_ram DOUBLE NOT NULL,
fk_processador INT NOT NULL,
PRIMARY KEY (id_processo),
CONSTRAINT fk_pross_cpu1
FOREIGN KEY (fk_processador)
REFERENCES Processador (id_processador)
);

CREATE TABLE Janela (
id_janela INT NOT NULL IDENTITY(1,1),
pid INT NOT NULL,
titulo VARCHAR(200) NOT NULL,
comando VARCHAR(200) NOT NULL,
fk_processador INT NOT NULL,
PRIMARY KEY (id_janela),
CONSTRAINT fk_janela_cpu1
FOREIGN KEY (fk_processador)
REFERENCES Processador (id_processador)
);

CREATE TABLE Disco (
id_disco INT NOT NULL IDENTITY(1,1),
nome VARCHAR(45) NOT NULL,
tipo VARCHAR(45) NOT NULL,
total VARCHAR(45) NOT NULL,
disponivel VARCHAR(45) NOT NULL,
uuid VARCHAR(45) NOT NULL,
fk_maquina INT NOT NULL,
PRIMARY KEY (id_disco),
CONSTRAINT fk_disco_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE DadosDisco (
id_dados_disco INT NOT NULL IDENTITY(1,1),
velocida_escrita VARCHAR(45) NOT NULL,
velocidade_leitura VARCHAR(45) NOT NULL,
tempo_escrita VARCHAR(45) NOT NULL,
data_hora DATETIME NOT NULL,
fk_disco INT NOT NULL,
PRIMARY KEY (id_dados_disco),
CONSTRAINT fk_Disco_disco1
FOREIGN KEY (fk_disco)
REFERENCES Disco (id_disco)
);

CREATE TABLE Parametro (
id_parametro int IDENTITY(1,1) not null,
significativo INT NOT NULL,
moderado INT NOT NULL,
critico INT NOT NULL,
fk_maquina INT NOT NULL,
PRIMARY KEY (id_parametro),
CONSTRAINT fk_parametros_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE SistemaOperacional (
id_sistema INT NOT NULL IDENTITY(1,1),
fabricante VARCHAR(45) NOT NULL,
tipo_sistema VARCHAR(45) NOT NULL,
arquitetura VARCHAR(45) NOT NULL,
tempo_atividade VARCHAR(45) NOT NULL,
fk_maquina INT UNIQUE NOT NULL,
PRIMARY KEY (id_sistema),
CONSTRAINT fk_SISTEMA_OPERACIONAL_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);




CREATE TABLE Empresa (
  idempresa INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  responsavel VARCHAR(45) NULL,
  cnpj CHAR(45) NULL,
  cep char(20),
  email varchar(40) NULL,
  telefone CHAR(11) NULL,
   PRIMARY KEY (idEmpresa),
    Matriz INT,  foreign key (Matriz) references Empresa(idEmpresa),
  );
CREATE TABLE usuario (
  id_usuario INT NOT NULL IDENTITY(1,1),
  nome VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  senha CHAR(20) NULL,
  Cpf VARCHAR(45) NULL,
  tipo varchar(20),
  fkempresa INT,  foreign key (fkempresa) references Empresa(idEmpresa),
  PRIMARY KEY (id_usuario)
  );



  CREATE TABLE Maquina (
id_maquina INT NOT NULL IDENTITY(1,1),
nome VARCHAR(45),
tipo VARCHAR(45),
cod_MAC VARCHAR(45) NOT NULL,
andar VARCHAR(45),
setor VARCHAR(45),
fk_empresa int, foreign key (fk_empresa) references empresa(idempresa),
ipv4 varchar(32),
PRIMARY KEY (id_maquina)
);


CREATE TABLE MemoriaRam (
id_ram INT NOT NULL IDENTITY(1,1),
capacidade_total VARCHAR(45) NOT NULL,
fk_maquina INT UNIQUE NOT NULL,
PRIMARY KEY (id_ram),
CONSTRAINT fk_ram_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE DadosRam (
id_dados_ram INT NOT NULL IDENTITY(1,1),
em_uso VARCHAR(45) NOT NULL,
disponivel VARCHAR(45)NOT NULL,
data_hora DATETIME NOT NULL,
fk_ram INT NOT NULL,
PRIMARY KEY (id_dados_ram),
CONSTRAINT fk_dados_ram_ram1
FOREIGN KEY (fk_ram)
REFERENCES MemoriaRam (id_ram)
);

CREATE TABLE Processador (
id_processador INT NOT NULL IDENTITY(1,1),
nome_processador VARCHAR(200) NOT NULL,
frequencia VARCHAR(45) NOT NULL,
num_nucleo INT NOT NULL,
fk_maquina INT UNIQUE NOT NULL,
PRIMARY KEY (id_processador),
CONSTRAINT fk_cpu_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE Processo (
id_processo INT NOT NULL IDENTITY(1,1),
pid INT NOT NULL,
nome VARCHAR(45) NOT NULL,
uso_cpu float NOT NULL,
uso_ram float NOT NULL,
fk_processador INT NOT NULL,
PRIMARY KEY (id_processo),
CONSTRAINT fk_pross_cpu1
FOREIGN KEY (fk_processador)
REFERENCES Processador (id_processador)
);

CREATE TABLE Janela (
id_janela INT NOT NULL IDENTITY(1,1),
pid INT NOT NULL,
titulo VARCHAR(200) NOT NULL,
comando VARCHAR(200) NOT NULL,
fk_processador INT NOT NULL,
PRIMARY KEY (id_janela),
CONSTRAINT fk_janela_cpu1
FOREIGN KEY (fk_processador)
REFERENCES Processador (id_processador)
);

CREATE TABLE Disco (
id_disco INT NOT NULL IDENTITY(1,1),
nome VARCHAR(45) NOT NULL,
tipo VARCHAR(45) NOT NULL,
total VARCHAR(45) NOT NULL,
disponivel VARCHAR(45) NOT NULL,
uuid VARCHAR(45) NOT NULL,
fk_maquina INT NOT NULL,
PRIMARY KEY (id_disco),
CONSTRAINT fk_disco_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE DadosDisco (
id_dados_disco INT NOT NULL IDENTITY(1,1),
velocida_escrita VARCHAR(45) NOT NULL,
velocidade_leitura VARCHAR(45) NOT NULL,
tempo_escrita VARCHAR(45) NOT NULL,
data_hora DATETIME NOT NULL,
fk_disco INT NOT NULL,
PRIMARY KEY (id_dados_disco),
CONSTRAINT fk_Disco_disco1
FOREIGN KEY (fk_disco)
REFERENCES Disco (id_disco)
);

CREATE TABLE Parametro (
id_parametro int IDENTITY(1,1) not null,
significativo INT NOT NULL,
moderado INT NOT NULL,
critico INT NOT NULL,
fk_maquina INT NOT NULL,
PRIMARY KEY (id_parametro),
CONSTRAINT fk_parametros_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);

CREATE TABLE SistemaOperacional (
id_sistema INT NOT NULL IDENTITY(1,1),
fabricante VARCHAR(45) NOT NULL,
tipo_sistema VARCHAR(45) NOT NULL,
arquitetura VARCHAR(45) NOT NULL,
tempo_atividade VARCHAR(45) NOT NULL,
fk_maquina INT UNIQUE NOT NULL,
PRIMARY KEY (id_sistema),
CONSTRAINT fk_SISTEMA_OPERACIONAL_Maquina1
FOREIGN KEY (fk_maquina)
REFERENCES Maquina (id_maquina)
);'


select * from usuario;
select * from empresa;


























/*--------------------------------------------------------*/
create database medServer;
use medServer;
create table Empresa(
id_Empresa int primary key IDENTITY(1,1),
nome varchar(40),
email varchar(40),
cnpj char(14),
telefone char(11),
responsavel varchar(30)
);

create table usuario(
id_usuario int primary key IDENTITY(1,1),
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
id_Empresa int primary key IDENTITY(1,1),
nome varchar(40),
email varchar(40),
cnpj char(14),
telefone char(11),
responsavel varchar(30)
);

create table usuario(
id_usuario int primary key IDENTITY(1,1),
nome varchar(40),
senha varchar(40),
email varchar(40),
cpf char(11),
fkempresa int, foreign key (fkempresa) references empresa(id_empresa)
);



select * from empresa;

select * from usuario;

