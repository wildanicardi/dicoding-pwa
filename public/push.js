var webPush = require("web-push");

const vapidKeys = {
  publicKey:"BNj4SW5ld6e2srE75wK6RmCgXW5uJ2Agpap9zS7HQHtDEnxrHipfkNVbWYiuTmpKkxEcHHm47xV0ZKfwnTLDFcw",
  privateKey: "fgTDxRsw4MSpogzRBGcnqHgRHXSeqUa19MwRBcKVZwQ",
};

webPush.setVapidDetails(
  "aliwildan:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:"https://fcm.googleapis.com/fcm/send/c638sQurh10:APA91bFKN8YFw7EZyKCExVcTfFfQjo8YJvNyp8w8GsoyawrEcvRsEbBQGM9pt4fmpa2RtPXKA2pYI9q4V6sfrjfScrbGE9EcDjcXPkYS2UcaR1Dq1XfvjTIyO_R265MGBilwG8fWPPmt",
  keys: {
    p256dh:"BPVdXas3IrfMRW50S2a7nQwEYVEB2b/X1LXgPG8wop+78i6J/YC+aza5bR2HzORpQmMx+K/SuPNox73b9LuS5yE=",
    auth: "MbGJv3cdqIPD9/1Am6g0fQ==",
  },
};
var payload = "Ini Adalah Notifikasi";

var options = {
  gcmAPIKey: "291461028582",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
