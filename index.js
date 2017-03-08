"use strict";

const firebase = require("firebase")
const database = initFirebase()

function listenForSearchThread() {
    //TODO
}

function initFirebase() {
    firebase.initializeApp({
        databaseURL: "https://whodischat.firebaseio.com/"
    });

    return firebase.database()
}

//bootstrap
(function () {
    listenForSearchThread()
})()
