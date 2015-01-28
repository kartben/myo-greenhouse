var Myo = require('myojs'),
    hub = new Myo.Hub();

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://iot.eclipse.org');


hub.on('ready', function() {
    console.log('ready');
});
hub.on('connect', function() {
    console.log('connected');
    hub.myo.unlock(1);
});
hub.on('disconnect', function() {
    console.log('disconnect');
});

hub.on('frame', function(frame) {
    if (frame.pose && frame.pose.valid) {
        console.log(frame.pose);
        switch (frame.pose.type) {
            case frame.pose.POSE_WAVE_IN:
                client.publish('javaonedemo/eclipse-greenhouse-ben/actuators/light', 'on')
                break;
            case frame.pose.POSE_WAVE_OUT:
                client.publish('javaonedemo/eclipse-greenhouse-ben/actuators/light', 'off')
                break;
        }
    }
});


// myMyo.on('fist', function(edge) {
//     if (edge) {
//         client.publish('javaonedemo/eclipse-greenhouse-ben/actuators/light', 'on')
//         console.log('fist pose start');
//     } else {
//         client.publish('javaonedemo/eclipse-greenhouse-ben/actuators/light', 'off')
//         console.log('fist pose end');
//     }
// });
