import events from "events";
import driverHandler from "../Service/drivers";

export const emitter = new events.EventEmitter();


// emitter.on('UpdateLoginStatus', async (recieved) => {
//   try {
//     // console.log(new Date());
//     await UserProfileModel.findOneAndUpdate(
//       { user: recieved._id },
//       { lastlogin: Date.now() },
//       { new: true, upsert: true }
//     );
//     console.log('Login status updated');
//     //   let coin = new CoinModel({
//     //       name:'Tether',
//     //       symbol:'usdt',
//     //       label:'usdt',
//     //       isActive: true,
//     //       BlockchainAddress:'0xdac17f958d2ee523a2206206994597c13d831ec7'
//     //   });
//     //   let currency = new CurrencyModel({
//     //     name:'cedi',
//     //     symbol:'GHS',
//     //     label:'cedi',
//     //     isActive: true,
//     //     countryName:'GHANA',
//     //     countrySymbol:'GHA'
//     //   })
//     //   coin.save()
//     //   currency.save()
//     //     console.log("added coin and currency")
//   } catch (err) {
//     console.log(err);
//   }
// });
// emitter.on('setUserProfile', async (recieved) => {
//   try {
//     const { user } = recieved;
//     const referralId = referralCodeGenerator.custom(
//       'lowercase',
//       3,
//       6,
//       user.email
//     );
//     const data = {
//       user: user._id,
//       referralId: stringEdit.shuffle(referralId)
//     };
//     // console.log(data)
//     const ref = new UserProfileModel({
//       ...data
//     });
//     ref.save((err, doc) => {
//       if (!err) {
//         user.profile = doc._id;
//         console.log('profile added');
//         user.save((err, doc) => {
//           if (err) console.log(err);
//         });
//       } else console.log(err);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

emitter.on("createDrive", async (recieved) => {
  try {
    await driverHandler.setActive(recieved);
    // console.log(recieved);
  } catch (err) {
    console.log(err);
  }
});

emitter.on("updateLocation", async (recieved) => {
  try {
    await driverHandler.setActive(recieved);
    console.log(recieved);
  } catch (err) {
    console.log(err);
  }
});
emitter.on("changeNotifyStatus", async (recieved) => {
  try {
    await driverHandler.setJourney(recieved.username);
    console.log(recieved);
  } catch (err) {
    console.log(err);
  }
});


