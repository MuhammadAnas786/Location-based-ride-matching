import { getDriver } from "../Algorithm/rideMatch";
import { constants } from "../Helpers/constants";
import { WriteToFile,getFile } from "../util";
const passangersHandler = {
  findDriver: async function (userData) {
    try {
      let result = {
        driver:false,
        data:{}
      }
      let driver = await getDriver(userData)
      if(driver.found){
        result.driver = true
        result.data = driver.driver
        return result
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  addJourney: async function (userData,driverData) {
    try {
       
      let journeys = await getFile(constants.JOURNEY)
     let newObj = {
        "starting_point":userData.starting_point,
        "ending_point":userData.ending_point,
        "route":'N/A',
        "passanger":userData.username,
        "isActive":true,
        "hasDriverNotified":false
      }

      if(journeys[driverData.username])
        {if(journeys[driverData.username].length>0)
        {journeys[driverData.username].push(newObj)}
        else
        journeys = {...journeys,[driverData.username]:[{...newObj}]};
      }
      else
        journeys = {...journeys,[driverData.username]:[{...newObj}]};
      
      await WriteToFile(journeys,constants.JOURNEY)
      return newObj
      

  } catch (err) {
    console.log(err);
    throw err
  }
  }
};
export default passangersHandler