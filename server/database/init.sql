CREATE TABLE todos
(
  id              VARCHAR(64) NOT NULL,
  description     VARCHAR(256) NOT NULL,
  done            BIT NOT NULL,
  PRIMARY KEY     (id)
);

INSERT INTO todos (id, description, done) VALUES ('23715b46-0328-4962-856d-347df5dcfbeb', 'Enter hours for week 4.10. ->', true);
INSERT INTO todos (id, description, done) VALUES ('ac7b8b55-c036-460b-835a-b0968bffd332', 'Complete REST fundamentals', false);

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

INSERT INTO hours (id, date) VALUES ('33facc5b-4d48-459b-b636-204bd0ba39a1', '2021-10-11');
INSERT INTO hour_details (hour_id, description, estimate) VALUES ('33facc5b-4d48-459b-b636-204bd0ba39a1', 'Absent - sick child', NULL);
INSERT INTO hours (id, date) VALUES ('9fbc5768-4ea8-4b3f-89fd-0b2b4ffbac67', '2021-10-08');
INSERT INTO hour_details (hour_id, description, estimate) VALUES ('9fbc5768-4ea8-4b3f-89fd-0b2b4ffbac67', 'Definition of done', 4);
INSERT INTO hour_details (hour_id, description, estimate) VALUES ('9fbc5768-4ea8-4b3f-89fd-0b2b4ffbac67', 'Santana prerequisites', NULL);

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

INSERT INTO learning (id, topic) VALUES ('bf75c9dc-1483-4e8a-a286-f0ed269995dc', 'gRPC');
INSERT INTO learning_details (learn_id, description) VALUES ('bf75c9dc-1483-4e8a-a286-f0ed269995dc', "High performance RPC framework");
INSERT INTO learning_details (learn_id, description) VALUES ('bf75c9dc-1483-4e8a-a286-f0ed269995dc', "https://grpc.io/");
INSERT INTO learning (id, topic) VALUES ('53472501-dc13-4d13-a249-a2e1ae0789b3', 'Kubernetes');
INSERT INTO learning_details (learn_id, description) VALUES ('53472501-dc13-4d13-a249-a2e1ae0789b3', "Container orchestrator");
INSERT INTO learning (id, topic) VALUES ('31224b6f-017c-4c3d-846b-cffe0dea8029', 'DDD');
INSERT INTO learning_details (learn_id, description) VALUES ('31224b6f-017c-4c3d-846b-cffe0dea8029', "Pluralsight course on DDD");

SELECT 
  l.id, l.topic, d.DESCRIPTION
FROM learning l inner join learning_details d on l.id = d.learn_id;