--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases
--

DROP DATABASE tbapp;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md59df270eb52907fff723d9b8b7436113a';






--
-- Database creation
--

CREATE DATABASE tbapp WITH TEMPLATE = template0 OWNER = postgres;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Debian 10.15-1.pgdg90+1)
-- Dumped by pg_dump version 10.15 (Debian 10.15-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

\connect tbapp

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Debian 10.15-1.pgdg90+1)
-- Dumped by pg_dump version 10.15 (Debian 10.15-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: db_agenda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.db_agenda (
    agenda_id character varying(32) NOT NULL,
    agenda_status integer NOT NULL,
    agenda_horario_tomado timestamp without time zone,
    agenda_tratamento character varying(32) NOT NULL,
    agenda_paciente character varying(32) NOT NULL
);


ALTER TABLE public.db_agenda OWNER TO postgres;

--
-- Name: db_paciente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.db_paciente (
    paciente_id character varying(32) NOT NULL,
    paciente_cpf character varying(16),
    paciente_nome character varying(200) NOT NULL,
    paciente_telefone character varying(200),
    paciente_cep character varying(100),
    paciente_endereco character varying(200) NOT NULL,
    paciente_nome_mae character varying(200) NOT NULL,
    paciente_sexo integer NOT NULL,
    paciente_altura character varying(3),
    paciente_peso character varying(3) NOT NULL,
    paciente_email character varying(200) NOT NULL,
    paciente_senha text NOT NULL,
    paciente_horario_medicacao character varying(8),
    "paciente_resetPasswordToken" character varying(200),
    paciente_data_inicio timestamp without time zone,
    paciente_data_fim timestamp without time zone,
    "paciente_resetPasswordExpires" timestamp without time zone
);


ALTER TABLE public.db_paciente OWNER TO postgres;

--
-- Name: db_tratamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.db_tratamento (
    tratamento_id character varying(32) NOT NULL,
    tratamento_receita integer NOT NULL,
    tratamento_ingestao integer NOT NULL,
    tratamento_dia character varying(50) NOT NULL,
    tratamento_paciente character varying(32) NOT NULL
);


ALTER TABLE public.db_tratamento OWNER TO postgres;

--
-- Data for Name: db_agenda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.db_agenda (agenda_id, agenda_status, agenda_horario_tomado, agenda_tratamento, agenda_paciente) FROM stdin;
\.


--
-- Data for Name: db_paciente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.db_paciente (paciente_id, paciente_cpf, paciente_nome, paciente_telefone, paciente_cep, paciente_endereco, paciente_nome_mae, paciente_sexo, paciente_altura, paciente_peso, paciente_email, paciente_senha, paciente_horario_medicacao, "paciente_resetPasswordToken", paciente_data_inicio, paciente_data_fim, "paciente_resetPasswordExpires") FROM stdin;
\.


--
-- Data for Name: db_tratamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.db_tratamento (tratamento_id, tratamento_receita, tratamento_ingestao, tratamento_dia, tratamento_paciente) FROM stdin;
\.


--
-- Name: db_agenda db_agenda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_agenda
    ADD CONSTRAINT db_agenda_pkey PRIMARY KEY (agenda_id);


--
-- Name: db_paciente db_paciente_paciente_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_paciente
    ADD CONSTRAINT db_paciente_paciente_cpf_key UNIQUE (paciente_cpf);


--
-- Name: db_paciente db_paciente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_paciente
    ADD CONSTRAINT db_paciente_pkey PRIMARY KEY (paciente_id);


--
-- Name: db_tratamento db_tratamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_tratamento
    ADD CONSTRAINT db_tratamento_pkey PRIMARY KEY (tratamento_id);


--
-- Name: db_agenda db_agenda_agenda_paciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_agenda
    ADD CONSTRAINT db_agenda_agenda_paciente_fkey FOREIGN KEY (agenda_paciente) REFERENCES public.db_paciente(paciente_id);


--
-- Name: db_agenda db_agenda_agenda_tratamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_agenda
    ADD CONSTRAINT db_agenda_agenda_tratamento_fkey FOREIGN KEY (agenda_tratamento) REFERENCES public.db_tratamento(tratamento_id);


--
-- Name: db_tratamento db_tratamento_tratamento_paciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.db_tratamento
    ADD CONSTRAINT db_tratamento_tratamento_paciente_fkey FOREIGN KEY (tratamento_paciente) REFERENCES public.db_paciente(paciente_id);


--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Debian 10.15-1.pgdg90+1)
-- Dumped by pg_dump version 10.15 (Debian 10.15-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

