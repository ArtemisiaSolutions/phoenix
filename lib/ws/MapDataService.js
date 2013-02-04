var grib2js = require('todo')

function MapDataService(app) {
	
	return function() {

        app.get('/:type/:date/:altitude', function(req, res) {
            var type = req.param("type")
            var date = req.param("date")
			var altitude = req.param("altitude")

			// Get bounds datas
			console.log(request.body);

			// Ask to DB file path
			// todo

			// " res.send(grib2js.getDataFromFile(file, bounds)); "
			
			/* old
            DBHelper.Questions.find({}, {skip: skip, limit: limit, sort: [['date','desc']]}, function(err, questions) {
                if(err) {
                    return res.error(err)
                }
                res.send(questions)
            })
			*/

			//TODO
        })

        app.post('/', function(req, res) {
            
			//TODO 
        })
    }

}

module.exports = MapDataService
