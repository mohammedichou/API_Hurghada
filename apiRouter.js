var express = require('express');


var destinationController = require('./routes/DestinationController');
var activityController = require('./routes/ActivityController');
var chunksContrller = require('./routes/ChunksController')
var AuthController = require('./routes/AuthController')
var testController = require('./routes/testController')


exports.router = (function () {
    
    var apiRouter = express.Router();


    // DestinationRoute
    apiRouter.route('/destination/all').get(destinationController.getalldestination)
    apiRouter.route('/destination/add').post(destinationController.addonedestination)
    apiRouter.route('/destination/getone').post(destinationController.getonedestination)
    apiRouter.route('/destination/delete').post(destinationController.deletedestination)


    // ActivityRoute
    apiRouter.route('/activity/add').post(AuthController.adminlogginRequired,activityController.addactivity)
    apiRouter.route('/activity/getallactivity').get(activityController.getallactivityfromdestination)
    apiRouter.route('/activity/adddispo').post(AuthController.adminlogginRequired,activityController.adddispotoactivity)
    apiRouter.route('/activity/addimage').post(AuthController.adminlogginRequired,activityController.addimagetoactivity)
    apiRouter.route('/activity/getimages').get(activityController.getallimageactivity)
    apiRouter.route('/activity/getalldispo').get(activityController.getalldispofromactivity)
    apiRouter.route('/activity/addpointfort').post(AuthController.adminlogginRequired,activityController.addpointfort)
    apiRouter.route('/activity/addinclus').post(AuthController.adminlogginRequired,activityController.addinclus)
    apiRouter.route('/activity/addapropos').post(AuthController.adminlogginRequired,activityController.addapropos)

    // chunksimage
    apiRouter.route('/chunks/images').get(chunksContrller.getimage)


    //Auth
    apiRouter.route('/Auth/Register').post(AuthController.Register)
    apiRouter.route('/Auth/loggin').post(AuthController.Loggin)
    apiRouter.route('/Auth/tasks').post(AuthController.loginRequired, AuthController.profile)

    apiRouter.route('/test').get(testController.testController)


    return apiRouter

})( );