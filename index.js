"use strict";

const firebase = require("firebase")
const database = initFirebase()

function listenForSearchThread() {
    database.ref("users").on("child_changed", (dataSnapshot) => {
        const isUserSearchingForThread = dataSnapshot.child("searchingForThread").val()
        if (isUserSearchingForThread) {
            findUserForThread(dataSnapshot.key)
        }
    })
}

function initFirebase() {
    firebase.initializeApp({
        databaseURL: "https://whodischat.firebaseio.com/"
    })

    return firebase.database()
}

function findUserForThread(firstUserId) {
    database.ref("users").on("child_added", (dataSnapshot) => {
        const matchUserId = dataSnapshot.key;
        const isUserSearchingForThread = dataSnapshot.child("searchingForThread").val();

        if (matchUserId != firstUserId && isUserSearchingForThread) {
            //stop listening on match
            database.ref("users").off("child_added", this)

            //create new messageThread
            const threadId = database.ref("messageThreads").push().key

            database.ref("users").child(firstUserId).update(
                {"messageThread": threadId,
                "searchingForThread": false}
            )

            database.ref("users").child(matchUserId).update(
                {"messageThread": threadId,
                "searchingForThread": false}
            )
        }
    })
}

//bootstrap
(function () {
    listenForSearchThread()
})()
