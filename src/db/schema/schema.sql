CREATE TABLE album (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE user (
  id SERIAL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_joined DATE NOT NULL,
  password VARCHAR(255) NOT NULL
)

CREATE TABLE review (
  id SERIAL,
  body TEXT,
  date_created DATE,
  album_id INT,
  user_id INT,
  FOREIGN KEY (album_id) REFERENCES album(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)
