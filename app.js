var express = require('express')
  , namespace = require("express-namespace")
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')

var app = express()

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

/
app.configure('development', function() {
  app.use(express.errorHandler())
})

app.get('/', routes.index)

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})


var MapDataService = require("./lib/ws/MapDataService.js")
app.namespace("/data", MapDataService(app))
