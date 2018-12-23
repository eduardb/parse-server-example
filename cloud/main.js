Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});

Parse.Cloud.define('sendPushAndroid', async (req) => {

  const channel = req.params.channel;
  const installationId = req.params.installationId;
  const payload = JSON.parse(req.params.payload);

  if (payload.pkg === 'com.koo.lightmanager'
      || payload.pkg === 'com.estrongs.android.pop'
      || payload.pkg === 'com.rageconsulting.android.lightflowlegacy'
      || payload.pkg === 'jp.gr.java_conf.piyota.nexusbatteryledlight') {
    throw `Package ${payload.pkg} was banned.`;
  }

  const query = new Parse.Query(Parse.Installation);
  query.equalTo('channels', channel);
  query.equalTo('deviceType', 'android');
  query.notEqualTo('installationId', installationId);

  await Parse.Push.send({
    data: payload,
    where: query
  }, {
    useMasterKey: true
  });

  return ('Push Sent!');
});
