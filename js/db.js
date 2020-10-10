var dbPromised = idb.open("footbal-saved", 3, function (upgradeDb) {
  var footbalObjectStore = upgradeDb.createObjectStore("footbals", {
    keyPath: "id"
  })
})

function storeData(data) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("footbals", "readwrite");
      var store = tx.objectStore("footbals");
      store.add(data);
      return tx.complete;
    })
    .then(function () {
      console.log("Footbal berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("footbals", "readonly");
        var store = tx.objectStore("footbals");
        return store.getAll();
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function getById(id) {
  let dataId = parseInt(id);
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("footbals", "readonly");
        var store = tx.objectStore("footbals");
        return store.get(dataId);
      })
      .then(function (data) {
        resolve(data);
      });
  });
}