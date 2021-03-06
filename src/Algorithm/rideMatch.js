import axios from "axios";
import { constants } from "../Helpers/constants";
import { getFile } from "../util";

export const getDriver = async (params) => {
  let result = {
    found: false,
    driver: {},
  };
  try {
    let activeDrivers = await getFile(constants.ACTIVE_DRIVERS);

    let distances = [];
    for (let username in activeDrivers) {
      let distance = await findDistance(
        activeDrivers[username]["location"],
        params.location
      );
      let tripDistance = await findDistance(
        params.ending_point,
        params.starting_point
      );
      let range = activeDrivers[username]["range"];
      if (
        distance >= 0 &&
        tripDistance >= 0 &&
        range >= distance &&
        range >= tripDistance
      ) {
        let obj = {
          ...activeDrivers[username],
          username,
          distance,
        };

        distances.push(obj);
      }
    }
    if (distances.length > 0) {
      distances.sort((a, b) => a.distance - b.distance);
      console.log(distances);
      result.found = true;
      result.driver = distances[0];
    }

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findDistance = async (point1, point2) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${point1.lat},${point1.lng}&destinations=${point2.lat},${point2.lng}&key=AIzaSyDVqR4uEmfJa-0jmqKjsariW3kJXbQh2Hk`;
    let response = await callUsingAxios(url);
    let result = response.data;
    if (response.status === 200 && result.status === "OK") {
      console.log(result);
      console.log(result.rows[0].elements[0]);
      return result.rows[0].elements[0].distance.value;
    }
    return -1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const callUsingAxios = async (url) => {
  return await axios.get(url);
};
