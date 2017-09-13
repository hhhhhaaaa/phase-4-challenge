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
  body TEXT NOT NULL,
  date_created DATE NOT NULL,
  album_id INT NOT NULL,
  account_id INT NOT NULL,
  FOREIGN KEY (album_id) REFERENCES album(id),
  FOREIGN KEY (account_id) REFERENCES account(id)
);
