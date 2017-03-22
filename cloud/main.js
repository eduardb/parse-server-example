
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('sendPushAndroid', function(req, res) {

  const channel = req.params.channel;
  const installationId = req.params.installationId;
  const payload = JSON.parse(req.params.payload);

  if (payload.pkg === 'com.koo.lightmanager'
      || payload.pkg === 'com.estrongs.android.pop'
      || payload.pkg === 'com.rageconsulting.android.lightflowlegacy'
      || payload.pkg === 'jp.gr.java_conf.piyota.nexusbatteryledlight') {
    res.error(`Package ${payload.pkg} was banned.`);
    return;
  }

  var query = new Parse.Query(Parse.Installation);
  query.equalTo('channels', channel);
  query.equalTo('deviceType', 'android');
  query.notEqualTo('installationId', installationId);

  Parse.Push.send({
    data: payload,
    where: query
  }, {
    useMasterKey: true
  })
  .then(function() {
    res.success('Push Sent!');
  }, function(error) {
    res.error('Error while trying to send push ' + error.message);
  });
});
