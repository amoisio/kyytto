CREATE TABLE projects
(
  id              VARCHAR(36) NOT NULL,
  name            NVARCHAR(50) NOT NULL,
  description     NVARCHAR(8000) NULL,
  color           VARCHAR(8),
  PRIMARY KEY     (id)
);

CREATE TABLE tasks
(
  id              VARCHAR(36) NOT NULL,
  title           NVARCHAR(500) NOT NULL,
  description     NVARCHAR(8000) NULL,
  state           TINYINT,
  project_id      VARCHAR(36) NOT NULL,
  PRIMARY KEY     (id),
  INDEX IX_task_project  (project_id),
  FOREIGN KEY     (project_id)
    REFERENCES    projects(id)
    ON DELETE CASCADE
);
