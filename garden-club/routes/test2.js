var apn = require('apn');

exports.view = function(req, res){
// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({  
     token: {
        key: '/home/ubuntu/public/myweb/garden-club/routes/APNsAuthKey_3Z978D4FP2.p8', // Path to the key p8 file
        keyId: '3Z978D4FP2', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
        teamId: '96342UP57T', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
    },
    production: false // Set to true if sending a notification to a production iOS app
});

// Enter the device token from the Xcode console
var deviceToken = 'A271B01B065B8546AE8418C7CC2236561B528944B7ED63D9009DECB31C02C744';

// Prepare a new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible within the project editor)
notification.topic = 'DWG.findIphone';

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator
notification.badge = 3;

notification.contentAvailable = 1;
// Play ping.aiff sound when the notification is received
//notification.sound = 'ping.aiff';
notification.sound = 'short.mp3';
// Display the following message (the actual notification text, supports emoji)
notification.alert = 'Hello World \u270C';

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
notification.payload = {id: 123};

// Actually send the notification
apnProvider.send(notification, deviceToken).then(function(result) {  
    // Check the result for any failed devices
    console.log(result);
    console.log("done");
});

res.send("Cool");
}
