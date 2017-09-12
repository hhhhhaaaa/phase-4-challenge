CREATE TABLE album (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  account_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_joined DATE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  body TEXT,
  date_created DATE,
  album_id INT,
  account_id INT,
  FOREIGN KEY (album_id) REFERENCES album(id),
  FOREIGN KEY (account_id) REFERENCES account(id)
);