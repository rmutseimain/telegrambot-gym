CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL,
    "name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(15) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "survey" (
    "id" SERIAL,
    "name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(15) NOT NULL,
    PRIMARY KEY ("id")
);