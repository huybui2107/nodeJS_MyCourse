const Course = require('../models/Course')
class SearchController {

    // [get] /search
    async index(req, res) {
        // res.render('search');
        try {
            const result = await Course.find();
            res.json(result);
            //     Course.find({},function(err,courses){
            //         if(!err) res.json(courses);
            //         res.status(400).json({error:'Error '})
            //    })
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }


    }
    //[get] :/slug

    show(req, res) {
        res.send('HUy pro');
    }
}

module.exports = new SearchController;