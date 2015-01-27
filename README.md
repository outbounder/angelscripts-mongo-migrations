# angelscripts-mongo-migrations

`CELL_MODE` based [mongodb-migrations](https://github.com/emirotin/mongodb-migrations) via organic-angel as task runner.

## setup

Create a configuration file at `path.join(process.cwd(), "dna", process.env.CELL_MODE, "mongodb-migrations.json")`

    {
      "directory": "./db-migrations",
      "host": "localhost",
      "port": "27017",
      "db": "test",
      "collection": "migrations"
    }

## angel mm create :name

Creates a migration script with given `name` at `directory`.

## angel mm migrate

Runs all new migrations and optionally asks for a rollback.

## test migrations implementations

    describe("my migration1 test", function(){
      var mongodbConnection = ...
      var migration1 = require("./db-migrations/1-create-toby")

      it("ups", function(){
        migration1.up.call(mongodbConnection, function(err){
          // assert err and test db state
        })
      })
      
      it("downs", function(){
        migration1.down.call(mongodbConnection, function(err){
          // assert err and test db state
        })
      })
    })