import { constants } from "../Helpers/constants";
import { getFile,WriteToFile } from "../util";
const driverHandler = {
  getDrivers: async function (req, res) {
    try {
    } catch (err) {}
  },
  getActiveDrivers: async function (req, res) {
    try {
    } catch (err) {}
  },
  getDriver: async function (req, res) {
    try {
    } catch (err) {}
  },
  getActiveDriver: async function (req, res) {
    try {
    } catch (err) {}
  },
  checkDriver: async function (username) {
    try {
        let drivers = await getFile(constants.DRIVERS);
        if(drivers[username].allowed){
            return true
        }
        else return false
    } catch (err) {
      console.log(err);
      return false
    }
  },
  checkJourney: async function (username) {
    try {
        let result = {
            newPassanger:false,
            data:[]
        }
        let journeys = await getFile(constants.JOURNEY)
        if(journeys[username].length>0){
           let ourJ = journeys[username];
           ourJ.forEach(el => {
               if( !el["hasDriverNotified"] ){
                   result.newPassanger = true;
                   result.data.push(el)
               }
            }
           )
        }
            
        return result
        

    } catch (err) {
      console.log(err);
    }
  },
  setJourney: async function (username) {
    try {
       
        let journeys = await getFile(constants.JOURNEY)
        if(journeys[username].length>0){
           let ourJ = journeys[username];
           ourJ.forEach((el,index) => journeys[username][index]["hasDriverNotified"]=true );
           await WriteToFile(journeys,constants.JOURNEY);
        }
            
        return result
        

    } catch (err) {
      console.log(err);
    }
  },
  setActive: async function (data) {
    try {
        let prevData = await getFile(constants.ACTIVE_DRIVERS);
        console.log(prevData)
        let newData={
            ...prevData,[data.username]:{location:data.location,range:data.range}
        }
        
        console.log(newData)
         await WriteToFile(newData,constants.ACTIVE_DRIVERS);
        console.log("updated location")
    } catch (err) {
        console.log(err)
    }
  },
  deactivate: async function (req, res) {
    try {
    } catch (err) {}
  },
};

export default driverHandler
