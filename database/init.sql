CREATE DATABASE IF NOT EXISTS ANIMAL_SHELTER;

-- Grant all privileges to hackathon_user
GRANT ALL PRIVILEGES ON ANIMAL_SHELTER.* TO 'hackathon_user'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
