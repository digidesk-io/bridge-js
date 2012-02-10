var description = ' Test1: basic remote function calling';
var failureMessage = 'This test tests the ability to send message between one instance of bridge in js.\nExpected behavior: If you can\'t pass this test, you\'ve done a pretty wrong thing.\n';

var test = require(__dirname + '/../lib/test.js');
var Bridge = require(__dirname + '/../../lib/bridge.js').Bridge;
var bridge = new Bridge({host: 'localhost'});

bridge.ready(function(){
    var ConsoleLogServer = {
        log: function(msg) {
            if (msg === '123') {
                test.pass();
            } else {
                test.fail(failureMessage);
            }
        }
    }
    bridge.publishService('test1_consolelog', ConsoleLogServer, function() {
        bridge.getService('test1_consolelog', function(service) {
            console.log(description);
            service.log('123');
        });
    });
});