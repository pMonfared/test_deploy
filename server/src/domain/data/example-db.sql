Create TABLE workplace(
       workplace_type text,
       workplace_id int PRIMARY KEY);
Create TABLE worker_registry(
       personal_number text PRIMARY KEY,
       name text);
Create TABLE machine(
    machine_type text,
    machine_id int PRIMARY KEY,
    shift int,
    status int DEFAULT 3, 
    selected_orders text[],
    workplace_id int ,
    parallel_orders boolean,
    CONSTRAINT fk_work
        FOREIGN KEY(workplace_id) 
        REFERENCES workplace(workplace_id));
Create TABLE defect(
    id SERIAL UNIQUE PRIMARY KEY,
    personal_number text,
    description text,
    status int NULL,
    machine_id int NOT NULL,
    defect_time timestamp NOT NULL,
    CONSTRAINT fk_personal_number
      FOREIGN KEY(personal_number)  
	  REFERENCES worker_registry(personal_number),
    CONSTRAINT fk_machine_id
      FOREIGN KEY(machine_id) 
	  REFERENCES machine(machine_id));
