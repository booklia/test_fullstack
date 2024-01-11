--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-11 14:45:45 MSK

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'KOI8R';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS test;
--
-- TOC entry 3607 (class 1262 OID 16398)
-- Name: test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'KOI8R' LOCALE_PROVIDER = libc LOCALE = 'ru_RU.KOI8-R';


ALTER DATABASE test OWNER TO postgres;

\connect test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'KOI8R';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16999)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    order_amount numeric,
    order_date date,
    user_id integer NOT NULL,
    order_comment character varying(255)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16998)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 217
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 216 (class 1259 OID 16990)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    age integer,
    registration_date date,
    credit numeric
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16989)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3449 (class 2604 OID 17002)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3448 (class 2604 OID 16993)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3601 (class 0 OID 16999)
-- Dependencies: 218
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, order_amount, order_date, user_id, order_comment) FROM stdin;
1	150.25	2022-01-05 00:00:00+03	1	First order
2	200.50	2022-02-10 00:00:00+03	2	Special request
3	120.75	2022-03-15 00:00:00+03	3	\N
4	180.00	2022-04-20 00:00:00+03	4	Gift order
5	300.25	2022-05-25 00:00:00+03	5	Express delivery
6	250.50	2022-06-30 00:00:00+03	6	Bulk order
7	175.75	2022-07-05 00:00:00+03	7	\N
8	220.00	2022-08-10 00:00:00+03	8	Discount applied
9	90.25	2022-09-15 00:00:00+03	9	Late delivery
10	160.50	2022-10-20 00:00:00+03	10	Regular customer
11	130.75	2022-11-25 00:00:00+03	11	\N
12	190.00	2022-12-30 00:00:00+03	12	Holiday order
13	140.25	2023-01-04 00:00:00+03	13	Extra packaging
14	170.50	2023-02-09 00:00:00+03	14	\N
15	120.75	2023-03-16 00:00:00+03	15	Customized order
16	200.00	2023-04-21 00:00:00+03	16	Limited edition
17	150.25	2023-05-26 00:00:00+03	17	VIP customer
18	250.50	2023-06-01 00:00:00+03	18	International shipping
19	180.75	2023-07-06 00:00:00+03	19	\N
20	210.00	2023-08-11 00:00:00+03	20	Fast-track delivery
21	150.25	2022-04-01 00:00:00+03	1	Order 1
22	200.50	2022-04-01 00:00:00+03	2	Order 2
23	120.75	2022-04-02 00:00:00+03	3	Order 3
24	180.00	2022-04-02 00:00:00+03	4	Order 4
25	300.25	2022-04-03 00:00:00+03	5	Order 5
26	250.50	2022-04-03 00:00:00+03	6	Order 6
27	175.75	2022-04-04 00:00:00+03	7	Order 7
28	220.00	2022-04-04 00:00:00+03	1	Order 8
29	90.25	2022-04-05 00:00:00+03	2	Order 9
30	160.50	2022-04-05 00:00:00+03	3	Order 10
31	130.75	2022-04-06 00:00:00+03	4	Order 11
32	190.00	2022-04-06 00:00:00+03	5	Order 12
33	140.25	2022-04-07 00:00:00+03	6	Order 13
34	170.50	2022-04-07 00:00:00+03	7	Order 14
35	120.75	2022-04-01 00:00:00+03	1	Order 15
36	200.00	2022-04-02 00:00:00+03	2	Order 16
37	150.25	2022-04-03 00:00:00+03	3	Order 17
38	250.50	2022-04-04 00:00:00+03	4	Order 18
39	180.75	2022-04-05 00:00:00+03	5	Order 19
40	210.00	2022-04-06 00:00:00+03	6	Order 20
\.


--
-- TOC entry 3599 (class 0 OID 16990)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, age, registration_date, credit) FROM stdin;
1	user1	25	2022-01-01 00:00:00+03	1000.50
2	user2	30	2022-02-05 00:00:00+03	1500.75
3	user3	22	2022-03-10 00:00:00+03	1200.00
4	user4	28	2022-04-15 00:00:00+03	800.25
5	user5	35	2022-05-20 00:00:00+03	2000.00
6	user6	26	2022-06-25 00:00:00+03	900.50
7	user7	32	2022-07-30 00:00:00+03	1800.75
8	user8	29	2022-08-04 00:00:00+03	1300.00
9	user9	24	2022-09-09 00:00:00+03	700.25
10	user10	31	2022-10-14 00:00:00+03	1600.00
11	user11	27	2022-11-19 00:00:00+03	1100.50
12	user12	33	2022-12-24 00:00:00+03	1900.75
13	user13	23	2023-01-29 00:00:00+03	1400.00
14	user14	34	2023-02-03 00:00:00+03	1000.25
15	user15	21	2023-03-10 00:00:00+03	1700.00
16	user16	36	2023-04-15 00:00:00+03	1200.50
17	user17	25	2023-05-20 00:00:00+03	1500.75
18	user18	30	2023-06-25 00:00:00+03	800.00
19	user19	28	2023-07-30 00:00:00+03	2000.25
20	user20	22	2023-08-04 00:00:00+03	900.50
\.


--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 217
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 42, true);


--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- TOC entry 3453 (class 2606 OID 17006)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3451 (class 2606 OID 16997)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3454 (class 2606 OID 17007)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


-- Completed on 2024-01-11 14:45:45 MSK

--
-- PostgreSQL database dump complete
--

