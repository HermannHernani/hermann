--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
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


--
-- Name: curso_seq; Type: SEQUENCE; Schema: public; Owner: ueasistemas
--
CREATE SEQUENCE public.curso_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.curso_seq OWNER TO ueasistemas;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: uea_aluno; Type: TABLE; Schema: public; Owner: ueasistemas
--
CREATE TABLE public.uea_aluno (
    aluno_id character varying(32) NOT NULL,
	aluno_cpf character varying(12) NOT NULL,
    aluno_nome character varying(100) NOT NULL,
    aluno_email character varying(200),
    aluno_facebook character varying(200),
    aluno_linkedin character varying(200),
    aluno_whatsapp character varying(20),
    aluno_ano_ingresso integer NOT NULL,
    aluno_ano_conclusao integer,
    aluno_situacao integer NOT NULL,
    aluno_discente_situacao integer NOT NULL,
    aluno_discente_funcao character varying(100),
    aluno_discente_instituicao character varying(200),
    aluno_egresso_situacao integer,
    aluno_egresso_instituicao character varying(200),
    aluno_egresso_funcao character varying(100),
    aluno_status integer NOT NULL,
    aluno_matricula character varying(10) NOT NULL,
    aluno_uea_unidade integer NOT NULL,
    aluno_uea_curso integer NOT NULL,
    aluno_lattes character varying(200),
    aluno_data_cadastro timestamp without time zone,
    aluno_senha text
);


ALTER TABLE public.uea_aluno OWNER TO ueasistemas;

--
-- Name: uea_curso; Type: TABLE; Schema: public; Owner: ueasistemas
--
CREATE TABLE public.uea_curso (
    curso_id integer DEFAULT nextval('public.curso_seq'::regclass) NOT NULL,
    curso_unidade_id integer NOT NULL,
    curso_sigla character varying(10) NOT NULL,
    curso_nome character varying(200) NOT NULL,
    curso_status integer NOT NULL
);


ALTER TABLE public.uea_curso OWNER TO ueasistemas;
--
-- Name: unidade_seq; Type: SEQUENCE; Schema: public; Owner: ueasistemas
--

CREATE SEQUENCE public.unidade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.unidade_seq OWNER TO ueasistemas;

--
-- Name: uea_unidade; Type: TABLE; Schema: public; Owner: ueasistemas
--

CREATE TABLE public.uea_unidade (
    unidade_id integer DEFAULT nextval('public.unidade_seq'::regclass) NOT NULL,
    unidade_nome character varying(200) NOT NULL,
    unidade_sigla character varying(10) NOT NULL,
    unidade_status integer NOT NULL
);


ALTER TABLE public.uea_unidade OWNER TO ueasistemas;

--
-- Name: curso_seq; Type: SEQUENCE SET; Schema: public; Owner: ueasistemas
--
SELECT pg_catalog.setval('public.curso_seq', 3, true);

--
-- Name: unidade_seq; Type: SEQUENCE SET; Schema: public; Owner: ueasistemas
--
SELECT pg_catalog.setval('public.unidade_seq', 64, true);


--
-- Name: uea_aluno_pkey; Type: CONSTRAINT; Schema: public; Owner: ueasistemas
--
ALTER TABLE ONLY public.uea_aluno
    ADD CONSTRAINT uea_aluno_pkey PRIMARY KEY (aluno_id);


--
-- Name: uea_curso_pkey; Type: CONSTRAINT; Schema: public; Owner: ueasistemas
--
ALTER TABLE ONLY public.uea_curso
    ADD CONSTRAINT uea_curso_pkey PRIMARY KEY (curso_id);


--
-- Name: uea_unidade_pkey; Type: CONSTRAINT; Schema: public; Owner: ueasistemas
--
ALTER TABLE ONLY public.uea_unidade
    ADD CONSTRAINT uea_unidade_pkey PRIMARY KEY (unidade_id);


--
-- Name: aluno_uea_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ueasistemas
--
ALTER TABLE ONLY public.uea_aluno
    ADD CONSTRAINT aluno_uea_curso_fkey FOREIGN KEY (aluno_uea_curso) REFERENCES public.uea_curso(curso_id);


--
-- Name: aluno_uea_unidade_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ueasistemas
--
ALTER TABLE ONLY public.uea_aluno
    ADD CONSTRAINT aluno_uea_unidade_fkey FOREIGN KEY (aluno_uea_unidade) REFERENCES public.uea_unidade(unidade_id);


--
-- Name: uea_unidade_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ueasistemas
--
ALTER TABLE ONLY public.uea_curso
    ADD CONSTRAINT uea_unidade_fkey FOREIGN KEY (curso_unidade_id) REFERENCES public.uea_unidade(unidade_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

