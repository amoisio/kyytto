CREATE TABLE todos
(
  id              VARCHAR(64) NOT NULL,
  description     VARCHAR(256) NOT NULL,
  done            BIT NOT NULL,
  PRIMARY KEY     (id)
);

CREATE TABLE hours
(
  id              VARCHAR(64) NOT NULL,
  date            DATETIME NOT NULL,
  PRIMARY KEY     (id)
);

CREATE TABLE hour_details
(
  hour_id         VARCHAR(64) NOT NULL,
  description     VARCHAR(64) NOT NULL,
  estimate        INT NULL,
  INDEX hour_par  (hour_id),
  FOREIGN KEY     (hour_id)
    REFERENCES    hours(id)
    ON DELETE CASCADE
);

CREATE TABLE learning
(
  id              VARCHAR(64) NOT NULL,
  topic           VARCHAR(100) NOT NULL,
  PRIMARY KEY     (id)
);

CREATE TABLE learning_details
(
  learn_id        VARCHAR(64) NOT NULL,
  description     VARCHAR(100) NOT NULL,
  INDEX learn_par (learn_id),
  FOREIGN KEY     (learn_id)
    REFERENCES    learning(id)
    ON DELETE CASCADE
);