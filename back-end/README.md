# typeorm_postgre

API developed with express (Nodejs) in typescript.


### To run our database, let's create a container, type the command:

```bash
$ docker run --name db-postgres -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -d postgres
```

Flag explanation

(-p) is where we indicate a local port and which port it should redirect to

(-v) is to set where the database information will be stored

(-e) is the password to access our database

(-d) is so that our terminal doesn't get stuck in the execution of the container


### How to run

(after execute the migrations and seeders)

1 - Install the dependencies

```bash
$ yarn install

or

$ npm install
```

2 - Start the server

```bash
# start as Production
$ npm run start

# start as Development
$ npm run dev
```


## Documentation

I used swagger to document the API, so just enter the address:

`http://localhost:3002/docs`

to view and use of all routes.

