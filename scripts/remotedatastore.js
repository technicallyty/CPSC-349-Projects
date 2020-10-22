(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var firebaseConfig = {
    apiKey: "SEE PDF SUBMISSION FOR API_KEY PLEASE!!!!",
    authDomain: "coffeerun-b23e2.firebaseapp.com",
    databaseURL: "https://coffeerun-b23e2.firebaseio.com",
    projectId: "coffeerun-b23e2",
    storageBucket: "coffeerun-b23e2.appspot.com",
    messagingSenderId: "1079513163360",
    appId: "1:1079513163360:web:c4bce0d6887aba53228505"
  };
  // Initialize Firebase
  var defaultProject = firebase.initializeApp(firebaseConfig);
  var firestore = defaultProject.firestore();
  
  const docRef = firestore.doc('orders/coffeeorders');

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
   var ref = firestore.doc('orders/' + key);
   ref.set(val);
  };

  RemoteDataStore.prototype.getAll =  function (cb) {
    const snapshot =  firestore.collection('orders').get().then( snapshot => {
      var data = snapshot.docs.map(doc => doc.data());
      cb(data);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    var ref = firestore.doc('orders/' + key);

    ref.get().then(function(doc){
      console.log(doc);
      cb(doc);
    })
    .catch(err => {
      console.log(err)
    })
  };

  RemoteDataStore.prototype.remove = function (key) {

    var ref = firestore.doc('orders/'+key);
    ref.delete().then(function(doc){
      console.log(doc);
    }).catch(err=>{
      console.log(err)
    })
  };


  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
