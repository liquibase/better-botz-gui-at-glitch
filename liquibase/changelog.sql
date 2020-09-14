

--liquibase formatted sql

--changeset better-botz:1

CREATE TABLE IF NOT EXISTS betterbotz.products (
  id uuid,
  name text PRIMARY KEY,
  description text,
  price decimal,
  created timestamp
);

--changeset better-botz:1

CREATE TABLE IF NOT EXISTS orders (
  id uuid,
  address text,
  prod_id uuid,
  prod_name text,
  description text,
  price decimal,
  sell_price decimal,
  customer_name text PRIMARY KEY
);