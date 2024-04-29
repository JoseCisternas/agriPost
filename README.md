# agriPost
Aplicacion compuesta de 2 apps:

- ./back-end/agriPost 
Hecho en ruby on rails

Para ejecutar, desde path base: 
cd back-end/agriPost
rails s

- ./front-end/agripostfront
Hecho en React
Dependencias: 
    Redux
    Vite

Para ejecutar, desde path base: 

cd front-end/agripostfront
npm run start

o 

cd front-end/agripostfront
vite

- Base de datos configurada para Postgres

Para crear basta utilizar comandos de rails
cd back-end/agriPost
rails db:create
rails db:migrate

Fueron agregados seed para probar conexion
rails db:seed