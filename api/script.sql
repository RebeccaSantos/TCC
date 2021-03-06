DROP DATABASE IF EXISTS `db_next_gen_books`;
CREATE DATABASE IF NOT EXISTS `db_next_gen_books`;
USE `db_next_gen_books` ;
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_login` (
`id_login` INT NOT NULL AUTO_INCREMENT,
`nm_usuario` VARCHAR(50) NOT NULL,
`ds_senha` VARCHAR(64) NOT NULL,
`dt_ultimo_login` DATETIME NOT NULL,
`ds_codigo_verificacao` VARCHAR(15) NULL,
`dt_codigo_verificacao` DATETIME NULL,
PRIMARY KEY (`id_login`));
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_funcionario` (
`id_funcionario` INT NOT NULL AUTO_INCREMENT,
`id_login` INT NOT NULL,
`nm_funcionario` VARCHAR(100) NOT NULL,
`ds_carteira_trabalho` VARCHAR(20) NOT NULL,
`ds_cpf` VARCHAR(20) NOT NULL,
`ds_email` VARCHAR(100) NOT NULL,
`dt_nascimento` DATE NOT NULL,
`dt_admissao` DATETIME NOT NULL,
`ds_cargo` VARCHAR(50) NOT NULL,
`ds_endereco` VARCHAR(50) NOT NULL,
`ds_cep` VARCHAR(10) NOT NULL,
`nr_residencial` INT NOT NULL,
`ds_complemento` VARCHAR(25) NULL,
PRIMARY KEY (`id_funcionario`),
INDEX `fk_tb_funcionario_tb_login1_idx` (`id_login` ASC),
FOREIGN KEY (`id_login`)
REFERENCES `db_next_gen_books`.`tb_login` (`id_login`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_cliente` (
`id_cliente` INT NOT NULL AUTO_INCREMENT,
`id_login` INT NOT NULL,
`nm_cliente` VARCHAR(100) NOT NULL,
`ds_cpf` VARCHAR(20) NOT NULL,
`ds_email` VARCHAR(45) NOT NULL,
`ds_celular` VARCHAR(20) NULL,
`ds_foto` VARCHAR(150) NULL,
`tp_genero` VARCHAR(50) NULL,
`dt_nascimento` DATETIME NOT NULL,
PRIMARY KEY (`id_cliente`),
INDEX `id_login_idx` (`id_login` ASC),
UNIQUE INDEX `ds_foto_UNIQUE` (`ds_foto` ASC),
FOREIGN KEY (`id_login`)
REFERENCES `db_next_gen_books`.`tb_login` (`id_login`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_endereco` (
`id_endereco` INT NOT NULL AUTO_INCREMENT,
`id_cliente` INT NOT NULL,
`nm_endereco` VARCHAR(50) NOT NULL,
`ds_endereco` VARCHAR(70) NOT NULL,
`ds_cep` VARCHAR(10) NOT NULL,
`nm_cidade` VARCHAR(50) NOT NULL,
`nm_estado` VARCHAR(45) NOT NULL,
`nr_endereco` INT NOT NULL,
`ds_complemento` VARCHAR(35) NULL,
`ds_celular` VARCHAR(20) NULL,
PRIMARY KEY (`id_endereco`),
INDEX `id_cliente_idx` (`id_cliente` ASC),
FOREIGN KEY (`id_cliente`)
REFERENCES `db_next_gen_books`.`tb_cliente` (`id_cliente`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_editora` (
`id_editora` INT NOT NULL AUTO_INCREMENT,
`nm_editora` VARCHAR(100) NOT NULL,
`dt_fundacao` DATETIME NOT NULL,
`ds_logo` VARCHAR(150) NULL,
`ds_sigla` VARCHAR(10) NULL,
PRIMARY KEY (`id_editora`));
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_medida` (
`id_medida` INT NOT NULL AUTO_INCREMENT,
`vl_altura` DECIMAL(10,5) NOT NULL,
`vl_largura` DECIMAL(10,5) NOT NULL,
`vl_profundidades` DECIMAL(10,5) NOT NULL,
`vl_peso` DECIMAL(10,5) NOT NULL,
PRIMARY KEY (`id_medida`));
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_livro` (
`id_livro` INT NOT NULL AUTO_INCREMENT,
`id_medida` INT NOT NULL,
`id_editora` INT NOT NULL,
`nm_livro` VARCHAR(100) NOT NULL,
`ds_livro` VARCHAR(5000) NOT NULL,
`dt_lancamento` DATETIME NOT NULL,
`ds_idioma` VARCHAR(50) NOT NULL,
`tp_acabamento` VARCHAR(50) NOT NULL,
`ds_capa` VARCHAR(150) NOT NULL,
`nr_paginas` INT NULL,
`ds_isbn` VARCHAR(20) NOT NULL,
`nr_edicao` INT NOT NULL,
`vl_preco_compra` DECIMAL(10,5) NOT NULL,
`vl_preco_venda` DECIMAL(10,5) NOT NULL,
PRIMARY KEY (`id_livro`),
INDEX `id_editora_idx` (`id_editora` ASC),
UNIQUE INDEX `ds_capa_UNIQUE` (`ds_capa` ASC),
INDEX `fk_tb_livro_tb_medidas1_idx` (`id_medida` ASC),
FOREIGN KEY (`id_editora`)
REFERENCES `db_next_gen_books`.`tb_editora` (`id_editora`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_medida`)
REFERENCES `db_next_gen_books`.`tb_medida` (`id_medida`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_autor` (
`id_autor` INT NOT NULL AUTO_INCREMENT,
`nm_autor` VARCHAR(100) NOT NULL,
`dt_nascimento` DATE NOT NULL,
`ds_autor` VARCHAR(2500) NULL,
`ds_foto` VARCHAR(150) NULL,
PRIMARY KEY (`id_autor`));
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_livro_autor` (
`id_livro_autor` INT NOT NULL AUTO_INCREMENT,
`id_livro` INT NOT NULL,
`id_autor` INT NOT NULL,
PRIMARY KEY (`id_livro_autor`),
INDEX `id_livro_idx` (`id_livro` ASC),
INDEX `id_autor_idx` (`id_autor` ASC),
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_autor`)
REFERENCES `db_next_gen_books`.`tb_autor` (`id_autor`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_genero` (
`id_genero` INT NOT NULL AUTO_INCREMENT,
`nm_genero` VARCHAR(70) NOT NULL,
`ds_genero` VARCHAR(1000) NULL,
`ds_foto` VARCHAR(150) NULL,
PRIMARY KEY (`id_genero`));
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_livro_genero` (
`id_livro_genero` INT NOT NULL AUTO_INCREMENT,
`id_livro` INT NOT NULL,
`id_genero` INT NOT NULL,
PRIMARY KEY (`id_livro_genero`),
INDEX `id_livro_idx` (`id_livro` ASC),
INDEX `id_genero_idx` (`id_genero` ASC),
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_genero`)
REFERENCES `db_next_gen_books`.`tb_genero` (`id_genero`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_venda` (
`id_venda` INT NOT NULL AUTO_INCREMENT,
`id_cliente` INT NOT NULL,
`id_endereco` INT NOT NULL,
`tp_pagamento` VARCHAR(50) NOT NULL,
`nr_parcela` INT NULL,
`ds_status_pagamento` VARCHAR(100) NOT NULL,
`dt_venda` DATETIME NULL,
`vl_frete` DECIMAL(10,5) NULL,
`ds_codigo_rastreio` VARCHAR(40) NULL,
`dt_prevista_entrega` DATETIME NULL,
`bt_confirmacao_entrega` TINYINT NULL,
`ds_nf` VARCHAR(150) NOT NULL,
PRIMARY KEY (`id_venda`),
INDEX `id_cliente_idx` (`id_cliente` ASC),
INDEX `id_endereco_idx` (`id_endereco` ASC),
FOREIGN KEY (`id_cliente`)
REFERENCES `db_next_gen_books`.`tb_cliente` (`id_cliente`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_endereco`)
REFERENCES `db_next_gen_books`.`tb_endereco` (`id_endereco`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_venda_livro` (
`id_venda_livro` INT NOT NULL AUTO_INCREMENT,
`id_venda` INT NOT NULL,
`id_livro` INT NOT NULL,
`nr_livros` INT NOT NULL,
`vl_venda_livro` DECIMAL(10,5) NOT NULL,
`bt_devolvido` TINYINT NULL,
PRIMARY KEY (`id_venda_livro`),
INDEX `id_venda_idx` (`id_venda` ASC),
INDEX `id_livro_idx` (`id_livro` ASC),
FOREIGN KEY (`id_venda`)
REFERENCES `db_next_gen_books`.`tb_venda` (`id_venda`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_avaliacao_livro` (
`id_avaliacao_livro` INT NOT NULL AUTO_INCREMENT,
`id_venda_livro` INT NOT NULL,
`vl_avaliacao` DECIMAL(10,5) NOT NULL,
`ds_comentario` VARCHAR(300) NULL,
`dt_comentario` DATETIME NOT NULL,
INDEX `id_venda_livro_idx` (`id_venda_livro` ASC),
PRIMARY KEY (`id_avaliacao_livro`),
FOREIGN KEY (`id_venda_livro`)
REFERENCES `db_next_gen_books`.`tb_venda_livro` (`id_venda_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_estoque` (
`id_estoque` INT NOT NULL AUTO_INCREMENT,
`id_livro` INT NOT NULL,
`nr_quantidade` INT NOT NULL,
`dt_atualizacao` DATETIME NOT NULL,
PRIMARY KEY (`id_estoque`),
INDEX `id_livro_idx` (`id_livro` ASC),
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_favoritos` (
`id_favoritos` INT NOT NULL AUTO_INCREMENT,
`id_livro` INT NOT NULL,
`id_cliente` INT NOT NULL,
`dt_inclusao` DATETIME NOT NULL,
PRIMARY KEY (`id_favoritos`),
INDEX `id_cliente_idx` (`id_cliente` ASC),
FOREIGN KEY (`id_cliente`)
REFERENCES `db_next_gen_books`.`tb_cliente` (`id_cliente`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_venda_status` (
`id_venda_status` INT NOT NULL AUTO_INCREMENT,
`id_venda` INT NOT NULL,
`nm_status` VARCHAR(70) NOT NULL,
`ds_venda_status` VARCHAR(200) NULL,
`dt_atualizacao` DATETIME NOT NULL,
PRIMARY KEY (`id_venda_status`),
INDEX `id_venda_idx` (`id_venda` ASC),
FOREIGN KEY (`id_venda`)
REFERENCES `db_next_gen_books`.`tb_venda` (`id_venda`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_devolucao` (
`id_devolucao` INT NOT NULL AUTO_INCREMENT,
`id_venda_livro` INT NOT NULL,
`ds_motivo` VARCHAR(1000) NOT NULL,
`vl_devolvido` DECIMAL(10,5) NOT NULL,
`dt_devolucao` DATETIME NOT NULL,
`ds_codigo_rastreio` VARCHAR(50) NULL,
`ds_comprovante` VARCHAR(150) NULL,
`dt_previsao_entrega` DATETIME NULL,
`bt_devolvido` TINYINT NULL,
PRIMARY KEY (`id_devolucao`),
FOREIGN KEY (`id_venda_livro`)
REFERENCES `db_next_gen_books`.`tb_venda_livro` (`id_venda_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_recebimento_devolucao` (
`id_livro_devolvido` INT NOT NULL AUTO_INCREMENT,
`id_devolucao` INT NOT NULL,
`dt_recebimento_livro` DATETIME NOT NULL,
`ds_status_livro` VARCHAR(1000) NOT NULL,
PRIMARY KEY (`id_livro_devolvido`),
INDEX `id_devolucao_idx` (`id_devolucao` ASC),
FOREIGN KEY (`id_devolucao`)
REFERENCES `db_next_gen_books`.`tb_devolucao` (`id_devolucao`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_carrinho` (
`id_carrinho` INT NOT NULL AUTO_INCREMENT,
`id_livro` INT NOT NULL,
`id_cliente` INT NOT NULL,
`dt_atualizacao` DATETIME NOT NULL,
`nr_livro` INT NOT NULL,
PRIMARY KEY (`id_carrinho`),
INDEX `id_cliente_idx` (`id_cliente` ASC),
INDEX `id_livro_idx` (`id_livro` ASC),
FOREIGN KEY (`id_cliente`)
REFERENCES `db_next_gen_books`.`tb_cliente` (`id_cliente`)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);
CREATE TABLE IF NOT EXISTS `db_next_gen_books`.`tb_anuncio` (
`id_anuncio` INT NOT NULL AUTO_INCREMENT,
`id_livro` INT NOT NULL,
`nm_anucio` VARCHAR(255) NULL,
`ds_anuncio` VARCHAR(1000) NULL,
`ds_foto` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id_anuncio`),
INDEX `id_livro_idx` (`id_livro` ASC),
FOREIGN KEY (`id_livro`)
REFERENCES `db_next_gen_books`.`tb_livro` (`id_livro`)
ON DELETE NO ACTION
ON UPDATE NO ACTION);