
Parse.Cloud.define('hello', function(req, res) {
  console.log(req.user);
  res.success('Hi');
});
