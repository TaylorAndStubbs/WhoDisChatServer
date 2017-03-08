"use strict";

const firebase = require("firebase")
initFirebase()

const database = firebase.database()

function initFirebase() {
    var config = {
        databaseURL: "https://whodischat.firebaseio.com/"
    }

    firebase.initializeApp(config);
}
