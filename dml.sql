CREATE DATABASE "Wallet"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE cryptocurrency (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  createdDate TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedDate TIMESTAMP,
  deletedDate TIMESTAMP
);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  cryptocurrency_id INTEGER NOT NULL,
  sender VARCHAR(100) NOT NULL,
  receiver VARCHAR(100) NOT NULL,
  amount NUMERIC(18, 8) NOT NULL,
  createdDate TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedDate TIMESTAMP,
  deletedDate TIMESTAMP,
  FOREIGN KEY (cryptocurrency_id) REFERENCES cryptocurrency(id)
);

INSERT INTO cryptocurrency ("name", "createdDate", "updatedDate", "deletedDate")
VALUES
  ('Bitcoin', NOW(), NOW(), NULL),
  ('Ethereum', NOW(), NOW(), NULL),
  ('Binance Coin', NOW(), NOW(), NULL),
  ('Cardano', NOW(), NOW(), NULL),
  ('XRP', NOW(), NOW(), NULL),
  ('Dogecoin', NOW(), NOW(), NULL),
  ('Polkadot', NOW(), NOW(), NULL),
  ('Litecoin', NOW(), NOW(), NULL),
  ('Bitcoin Cash', NOW(), NOW(), NULL),
  ('Chainlink', NOW(), NOW(), NULL),
  ('Stellar', NOW(), NOW(), NULL),
  ('VeChain', NOW(), NOW(), NULL),
  ('Theta', NOW(), NOW(), NULL),
  ('Filecoin', NOW(), NOW(), NULL),
  ('Tron', NOW(), NOW(), NULL),
  ('Ethereum Classic', NOW(), NOW(), NULL),
  ('Monero', NOW(), NOW(), NULL),
  ('EOS', NOW(), NOW(), NULL),
  ('Neo', NOW(), NOW(), NULL),
  ('Cosmos', NOW(), NOW(), NULL)
;


-- ACTUALIZAR datos cryptocurrency
UPDATE cryptocurrency SET name = 'Bitcoin (Updated)' WHERE name = 'Bitcoin';


-- INSERTAR datos transaction
INSERT INTO "transaction" (cryptocurrency_id, sender, receiver, amount)
VALUES (1, 'Sender 1', 'Receiver 1', 10.5);

-- ACTUALIZAR datos transaction
UPDATE "transaction"
SET sender = 'Sender2asd'
WHERE id = 1;
