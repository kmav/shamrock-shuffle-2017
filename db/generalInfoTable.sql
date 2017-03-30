CREATE TABLE GeneralInformation (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    time TIME,
    RunnersOnCourse INT,
    FinishedRunners INT,
    HospitalTransports INT,
    PatientsSeen INT,
    LeadMaleLat FLOAT,
    LeadMaleLong FLOAT,
    LeadFemaleLat FLOAT,
    LeadFemaleLong FLOAT,
    LeadWheelChairMaleLat FLOAT,
    LeadWheelChairMaleLong FLOAT,
    LeadWheelChairFemaleLat FLOAT,
    LeadWheelChairFemaleLong FLOAT,
    TurtleLat FLOAT,
    TurtleLong FLOAT,
    Alert VARCHAR(150)
);