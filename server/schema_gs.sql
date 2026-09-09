------------------------------------------------------------
-- DROP TABLES (opcional, só se precisar recriar)
------------------------------------------------------------
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE pessoa CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN
            RAISE;
        END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE abrigo CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN
            RAISE;
        END IF;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ocorrencia CASCADE CONSTRAINTS';
EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN
            RAISE;
        END IF;
END;
/
------------------------------------------------------------
-- TABELA: ABRIGO
------------------------------------------------------------
CREATE TABLE abrigo (
    id_abrigo         NUMBER GENERATED ALWAYS AS IDENTITY,
    nome              VARCHAR2(100)      NOT NULL,
    capacidade_total  NUMBER             NOT NULL,
    capacidade_atual  NUMBER             DEFAULT 0,
    endereco          VARCHAR2(200),

    CONSTRAINT pk_abrigo PRIMARY KEY (id_abrigo)
);
------------------------------------------------------------
-- TABELA: OCORRENCIA
------------------------------------------------------------
CREATE TABLE ocorrencia (
    id_ocorrencia     NUMBER GENERATED ALWAYS AS IDENTITY,
    tipo              VARCHAR2(50)       NOT NULL,
    data_ocorrencia   DATE               NOT NULL,
    regiao_afetada    VARCHAR2(150),

    CONSTRAINT pk_ocorrencia PRIMARY KEY (id_ocorrencia)
);
------------------------------------------------------------
-- TABELA: PESSOA
------------------------------------------------------------
CREATE TABLE pessoa (
    id_pessoa     NUMBER GENERATED ALWAYS AS IDENTITY,
    nome          VARCHAR2(120)      NOT NULL,
    telefone      VARCHAR2(20),
    documento     VARCHAR2(20),
    status        VARCHAR2(30),
    id_abrigo     NUMBER,
    id_ocorrencia NUMBER,

    CONSTRAINT pk_pessoa PRIMARY KEY (id_pessoa),
    CONSTRAINT fk_pessoa_abrigo
        FOREIGN KEY (id_abrigo)
        REFERENCES abrigo (id_abrigo),
    CONSTRAINT fk_pessoa_ocorrencia
        FOREIGN KEY (id_ocorrencia)
        REFERENCES ocorrencia (id_ocorrencia)
);
