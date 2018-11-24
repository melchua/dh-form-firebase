
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

  // linking to dom elements
  const seriesList = document.querySelector('#seriesList');
  const form = document.querySelector("#addSeriesForm")

  // render the data
  function renderSeries(doc) {
    let li = document.createElement('li');
    let seriesName = document.createElement('span');
    let instructorName = document.createElement('span');
    let seriesPoster = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    li.setAttribute('class', 'style: list-group-item')
    seriesName.textContent = doc.data().seriesName;
    instructorName.textContent = doc.data().instructorName;
    seriesPoster.textContent = doc.data().seriesPoster;
    cross.textContent = 'x';

    li.appendChild(seriesName);
    li.appendChild(instructorName);
    li.appendChild(seriesPoster);
    li.appendChild(cross);
    seriesList.appendChild(li);    

    console.log(li.getAttribute('data-id'));

    // deleting data
    cross.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      firestore.collection('series').doc(id).delete();
    });
  }

  // saving data
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    firestore.collection('series').add({
      seriesName: form.seriesName.value,
      instructorName: form.instructorName.value,
      seriesPoster: form.seriesPoster.value,
    });

    form.seriesName.value = "";
    form.instructorName.value = "";
    form.seriesPoster.value = "";
  });  

  // getting data
  // firestore.collection('series').orderBy('seriesName').get().then((snapshot) => {
  //   snapshot.docs.forEach(doc => {
  //     renderSeries(doc);
  //   });
  // })

  // realtime listener

  firestore.collection('series').orderBy('seriesName').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      // console.log(change.doc.data());
      if (change.type == "added") {
        renderSeries(change.doc);
      } else if (change.type == "removed") {
          let li = seriesList.querySelector('[data-id=' + change.doc.id + ']');
          seriesList.removeChild(li);
      }
    });
  })