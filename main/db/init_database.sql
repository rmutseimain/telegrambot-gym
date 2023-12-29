CREATE TABLE IF NOT EXISTS "surveys" (
    "id" SERIAL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "date" VARCHAR(100) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "surveys_results" (
    "id" SERIAL,
    "name" VARCHAR(50) NOT NULL,
    "results" VARCHAR(300) NOT NULL,
    "date" VARCHAR(100) NOT NULL,
    PRIMARY KEY ("id")
);