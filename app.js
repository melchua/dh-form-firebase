
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuAxL7o5KEP8T4VFMWBjS6NfjlEqkpHQE",
    authDomain: "dancehive-753e1.firebaseapp.com",
    databaseURL: "https://dancehive-753e1.firebaseio.com",
    projectId: "dancehive-753e1",
    storageBucket: "dancehive-753e1.appspot.com",
    messagingSenderId: "367416913434"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true});

  const docRef = firestore.doc("test/relationData");

  const form = document.querySelector("#addSeriesForm")

  // render the data
  function renderData(doc) {
    let seriesName = document.createElement('span');
    let instructorName = document.createElement('span');
    let seriesPoster = document.createElement('span');

    seriesName.textContent = doc.data().seriesName;
    instructorName.textContent = doc.data().instructorName;
    seriesPoster.textContent = doc.data().seriesPoster;
  }

  // saving data
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    firestore.collection('series').add({
      seriesName: form.seriesName.value,
      instructorName: form.instructorName.value,
      seriesPoster: form.seriesPoster.value
    })
  });  

  // getting data
  firestore.collection('series').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
    });
  })