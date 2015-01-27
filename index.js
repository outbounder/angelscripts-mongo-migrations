var mm = require('mongodb-migrations')
var path = require("path")

module.exports = function(angel) {
  if(!angel) {
    return {
      testUp: function(name, done) {

      },
      testDown: function(name, done) {
        
      }
    }
  }
  require("angelabilities-prompt")(angel)
  
  var migrationsConfig = require(path.join(process.cwd(), "dna", process.env.CELL_MODE||"", "mongodb-migrations.json"))
  var migrationsDir = path.join(process.cwd(), migrationsConfig.directory)

  angel.on("mm create :name", function(angel){
    var migrator = new mm.Migrator(migrationsConfig)
    migrator.create(migrationsDir, angel.cmdData.name, function(err){
      if(err)
        console.error(err)
      else
        console.info("angel$ all done")
      process.exit(err?1:0)
    })
  })
  .example("$ angel mm create create-toby")

  angel.on("mm migrate", function(){
    var migrator = new mm.Migrator(migrationsConfig)
    migrator.runFromDir(migrationsDir, function(err){
      // doneFn
      if(err)
        console.error(err)
      else
        console.info("angel$ all done")

      angel.prompt("Do you need a rollback? [y/n]", function(err, answer){
        if(err) { 
          console.error(err)
          return process.exit(1)
        }
        if(answer === "y") {
          migrator.rollback(function(err){
            if(err)
              console.error(err)
            else
              console.info("angel$ rollback complete.")
            process.exit(err?1:0)
          })
        } else {
          console.info("angel$ ok :)")
          process.exit(0)
        }
      })
    })
  })
  .example("$ angel mm migrate")
}