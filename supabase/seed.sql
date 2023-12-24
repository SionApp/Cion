insert into public.users (phone_number, first_name, last_name, role_id, address) values
  ('555-555-5555', 'John', 'Doe', 1, '', '{"address1": "123 Main St", "address2": "Apt 4B", "city": "Anytown", "state": "CA", "zip": "12345"}'),
  ('555-555-5556', 'Jane', 'Doe', 2, '', '{"address1": "456 Elm St", "city": "Othertown", "state": "NY", "zip": "67890"}');

insert into public.instruments (name)
values
('bateria'),
('piano'),
('teclado secundario'),
('percussion'),
('guitarra principal'),
('guitarra apoyo'),
('guitarra actustica'),
('bajo');

insert into public.roles (name)
values
('musico'),
('director'),
('corista'),
('tecnico');
