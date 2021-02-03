--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 13.1

-- Started on 2021-02-03 01:21:46 CST

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16750)
-- Name: admins; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.admins (
    admin_id bigint NOT NULL,
    account character varying,
    password character varying,
    first_name character varying,
    last_name character varying,
    email character varying,
    role character varying
);


ALTER TABLE public.admins OWNER TO admin_tlt;

--
-- TOC entry 210 (class 1259 OID 16748)
-- Name: admins_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_tlt
--

CREATE SEQUENCE public.admins_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admins_admin_id_seq OWNER TO admin_tlt;

--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 210
-- Name: admins_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_tlt
--

ALTER SEQUENCE public.admins_admin_id_seq OWNED BY public.admins.admin_id;


--
-- TOC entry 205 (class 1259 OID 16598)
-- Name: orders; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.orders (
    order_id bigint NOT NULL,
    user_id bigint,
    created_at timestamp without time zone,
    total_price double precision,
    status character varying,
    card character varying
);


ALTER TABLE public.orders OWNER TO admin_tlt;

--
-- TOC entry 204 (class 1259 OID 16596)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_tlt
--

CREATE SEQUENCE public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO admin_tlt;

--
-- TOC entry 3905 (class 0 OID 0)
-- Dependencies: 204
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_tlt
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 207 (class 1259 OID 16652)
-- Name: products; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.products (
    product_id bigint NOT NULL,
    category character varying,
    name character varying,
    content character varying,
    price double precision,
    duration integer,
    image_url character varying,
    star boolean DEFAULT false
);


ALTER TABLE public.products OWNER TO admin_tlt;

--
-- TOC entry 206 (class 1259 OID 16650)
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_tlt
--

CREATE SEQUENCE public.products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_product_id_seq OWNER TO admin_tlt;

--
-- TOC entry 3906 (class 0 OID 0)
-- Dependencies: 206
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_tlt
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 214 (class 1259 OID 16864)
-- Name: provider_categories; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.provider_categories (
    provider_id bigint NOT NULL,
    product_id bigint NOT NULL
);


ALTER TABLE public.provider_categories OWNER TO admin_tlt;

--
-- TOC entry 209 (class 1259 OID 16665)
-- Name: providers; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.providers (
    provider_id bigint NOT NULL,
    account character varying,
    password character varying,
    first_name character varying,
    last_name character varying,
    address character varying,
    zip character varying,
    geohash character varying,
    email character varying,
    phone character varying,
    last_logged_in timestamp without time zone,
    rating double precision,
    total_services integer,
    is_available boolean,
    role character varying
);


ALTER TABLE public.providers OWNER TO admin_tlt;

--
-- TOC entry 208 (class 1259 OID 16663)
-- Name: providers_provider_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_tlt
--

CREATE SEQUENCE public.providers_provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.providers_provider_id_seq OWNER TO admin_tlt;

--
-- TOC entry 3907 (class 0 OID 0)
-- Dependencies: 208
-- Name: providers_provider_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_tlt
--

ALTER SEQUENCE public.providers_provider_id_seq OWNED BY public.providers.provider_id;


--
-- TOC entry 213 (class 1259 OID 16824)
-- Name: services; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.services (
    service_id bigint NOT NULL,
    order_id bigint,
    user_id bigint,
    provider_id bigint,
    start_time character varying,
    end_time character varying,
    created_at timestamp without time zone,
    product_id bigint,
    subprice double precision,
    latitude double precision,
    longitude double precision,
    address character varying,
    note character varying,
    rating integer,
    status character varying,
    apartment character varying,
    pets character varying,
    direction character varying,
    address_type character varying,
    product_name character varying
);


ALTER TABLE public.services OWNER TO admin_tlt;

--
-- TOC entry 212 (class 1259 OID 16822)
-- Name: services_service_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_tlt
--

CREATE SEQUENCE public.services_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_service_id_seq OWNER TO admin_tlt;

--
-- TOC entry 3908 (class 0 OID 0)
-- Dependencies: 212
-- Name: services_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_tlt
--

ALTER SEQUENCE public.services_service_id_seq OWNED BY public.services.service_id;


--
-- TOC entry 203 (class 1259 OID 16548)
-- Name: users; Type: TABLE; Schema: public; Owner: admin_tlt
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    account character varying,
    password character varying,
    first_name character varying,
    last_name character varying,
    address character varying,
    zip character varying,
    geohash character varying,
    email character varying,
    phone character varying,
    last_logged_in timestamp without time zone,
    role character varying
);


ALTER TABLE public.users OWNER TO admin_tlt;

--
-- TOC entry 202 (class 1259 OID 16546)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_tlt
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO admin_tlt;

--
-- TOC entry 3909 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_tlt
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3727 (class 2604 OID 16753)
-- Name: admins admin_id; Type: DEFAULT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_admin_id_seq'::regclass);


--
-- TOC entry 3723 (class 2604 OID 16601)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 3724 (class 2604 OID 16655)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- TOC entry 3726 (class 2604 OID 16668)
-- Name: providers provider_id; Type: DEFAULT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.providers ALTER COLUMN provider_id SET DEFAULT nextval('public.providers_provider_id_seq'::regclass);


--
-- TOC entry 3728 (class 2604 OID 16827)
-- Name: services service_id; Type: DEFAULT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.services ALTER COLUMN service_id SET DEFAULT nextval('public.services_service_id_seq'::regclass);


--
-- TOC entry 3722 (class 2604 OID 16551)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3754 (class 2606 OID 16819)
-- Name: admins admin_account_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_account_unique UNIQUE (account);


--
-- TOC entry 3756 (class 2606 OID 16821)
-- Name: admins admin_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_email_unique UNIQUE (email);


--
-- TOC entry 3758 (class 2606 OID 16758)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);


--
-- TOC entry 3740 (class 2606 OID 16606)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 3742 (class 2606 OID 16660)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 3744 (class 2606 OID 16813)
-- Name: providers provider_account_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT provider_account_unique UNIQUE (account);


--
-- TOC entry 3764 (class 2606 OID 16868)
-- Name: provider_categories provider_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.provider_categories
    ADD CONSTRAINT provider_categories_pkey PRIMARY KEY (provider_id, product_id);


--
-- TOC entry 3746 (class 2606 OID 16815)
-- Name: providers provider_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT provider_email_unique UNIQUE (email);


--
-- TOC entry 3749 (class 2606 OID 16817)
-- Name: providers provider_phone_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT provider_phone_unique UNIQUE (phone);


--
-- TOC entry 3751 (class 2606 OID 16673)
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (provider_id);


--
-- TOC entry 3762 (class 2606 OID 16832)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- TOC entry 3730 (class 2606 OID 16807)
-- Name: users user_account_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_account_unique UNIQUE (account);


--
-- TOC entry 3732 (class 2606 OID 16809)
-- Name: users user_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- TOC entry 3735 (class 2606 OID 16811)
-- Name: users user_phone_unique; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_phone_unique UNIQUE (phone);


--
-- TOC entry 3737 (class 2606 OID 16556)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3759 (class 1259 OID 16885)
-- Name: fki_product_id; Type: INDEX; Schema: public; Owner: admin_tlt
--

CREATE INDEX fki_product_id ON public.services USING btree (product_id);


--
-- TOC entry 3760 (class 1259 OID 16891)
-- Name: fki_services_order_id_fkey; Type: INDEX; Schema: public; Owner: admin_tlt
--

CREATE INDEX fki_services_order_id_fkey ON public.services USING btree (order_id);


--
-- TOC entry 3738 (class 1259 OID 16766)
-- Name: order_idx; Type: INDEX; Schema: public; Owner: admin_tlt
--

CREATE INDEX order_idx ON public.orders USING btree (created_at);


--
-- TOC entry 3747 (class 1259 OID 16764)
-- Name: provider_geohash_idx; Type: INDEX; Schema: public; Owner: admin_tlt
--

CREATE INDEX provider_geohash_idx ON public.providers USING btree (geohash);


--
-- TOC entry 3752 (class 1259 OID 16765)
-- Name: rating_idx; Type: INDEX; Schema: public; Owner: admin_tlt
--

CREATE INDEX rating_idx ON public.providers USING btree (rating);


--
-- TOC entry 3733 (class 1259 OID 16763)
-- Name: user_geohash_idx; Type: INDEX; Schema: public; Owner: admin_tlt
--

CREATE INDEX user_geohash_idx ON public.users USING btree (geohash);


--
-- TOC entry 3765 (class 2606 OID 16607)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3771 (class 2606 OID 16874)
-- Name: provider_categories provider_categories_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.provider_categories
    ADD CONSTRAINT provider_categories_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 3770 (class 2606 OID 16869)
-- Name: provider_categories provider_categories_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.provider_categories
    ADD CONSTRAINT provider_categories_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(provider_id);


--
-- TOC entry 3768 (class 2606 OID 16886)
-- Name: services services_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3769 (class 2606 OID 16892)
-- Name: services services_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 3767 (class 2606 OID 16843)
-- Name: services services_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(provider_id);


--
-- TOC entry 3766 (class 2606 OID 16838)
-- Name: services services_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_tlt
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin_tlt
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO admin_tlt;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2021-02-03 01:21:55 CST

--
-- PostgreSQL database dump complete
--

