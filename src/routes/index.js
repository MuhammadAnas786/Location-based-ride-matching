import express from "express";
// import { v4 } from 'uuid';
import { emitter } from "../Helpers/events";
import { response } from "../Service/response";
import { resmessage } from "../Helpers/constants";
import driverHandler from "../Service/drivers";
import passangersHandler from "../Service/passangers";

const routes = express.Router();

/* GET home page. */
routes.get("/", (req, res, next) => {
  return res.json({ uuid: 34324 });
});

//Driver
routes.get("/createDrive/:username", async(req, res, next) => {
  // console.log(req.params+req.query)
 try{
  let Driver = {
    username: req.params.username,
    location: {lat:req.query.lat,lng:req.query.lng},
    range: req.query.range,
  };
  if(await driverHandler.checkDriver(Driver.username)){
  emitter.emit("createDrive", Driver);
  response(res, 200, { Message: resmessage.drive_success });}
  else{
    response(res,202,{Message:resmessage.user_not_found})
  }
 }
 catch(err){
  response(res,400,{Message:resmessage.something_wrong})
 }
});

routes.get("/update/:username", async (req, res, next) => {
  try{
    let Driver = {
      username: req.params.username,
      location: {lat:req.query.lat,lng:req.query.lng},
      range: req.query.range,
    };
    if(await driverHandler.checkDriver(Driver.username)){
    emitter.emit("updateLocation", Driver);
    let result = await driverHandler.checkJourney(Driver.username)
    if(result.newPassanger){
      emitter.emit("changeNotifyStatus", Driver);
      response(res, 200, { Message: resmessage.update_status_found_passanger,passangers:result.data,newPassanger:true });
    }
    else
    response(res, 200, { Message: resmessage.update_status_no_passanger,newPassanger:false });
  }
    else{
      response(res,202,{Message:resmessage.user_not_found})
    }
   }
   catch(err){
    response(res,400,{Message:resmessage.something_wrong})
   }
});

//Passanger

routes.post("/findDriver/:username", async (req, res, next) => {
  try{
    let Passanger = {
      username: req.params.username,
      location: req.body.starting_point,
      starting_point: req.body.starting_point,
      ending_point: req.body.ending_point
    };
    let driver = await passangersHandler.findDriver(Passanger);
    if(driver.driver)
    {   console.log(driver.data)
      let newJourney = await passangersHandler.addJourney(Passanger,driver.data)
      response(res, 200, { Message: resmessage.driver_found,driverData:driver.data,journeyData:newJourney })
    }
    else response(res, 202, { Message: resmessage.driver_not_found });
  }
  catch(err){
    response(res,400,{Message:resmessage.something_wrong})
   }
});

export default routes;
