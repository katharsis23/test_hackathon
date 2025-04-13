CREATE DATABASE IF NOT EXISTS ANIMAL_SHELTER;

-- Grant all privileges to hackathon_user
CREATE USER IF NOT EXISTS "hackathon_user"@"%" IDENTIFIED BY "hackathon_2025";

GRANT ALL PRIVILEGES ON ANIMAL_SHELTER.* TO 'hackathon_user'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
