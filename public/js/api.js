// const BASE_URL = "https://api.football-data.org/v2/competitions/2021/standings";
const BASE_URL = "https://api.football-data.org/";

const statusResponse = (res) => {
  if (res.status !== 200) {
    console.log("Error : " + res.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(res.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(res);
  }
}
const jsonResponse = (res) => {
  return res.json();
}
const error = (err) => console.log("error", err);
const headerApi = {
  headers: {
    'X-Auth-Token': '61601a9ca3ea41c3812968fdffdeb4cb'
  }
}
const getFootballs = () => {

  if ('caches' in window) {
    caches.match(BASE_URL + "v2/competitions/2021/teams").then((response) => {
      if (response) {
        response.json().then((data) => {
          let footbalHtml = "";
          data.teams.forEach((data) => {
            footbalHtml += `
            <div class="col s12 m6">
              <div class="grid-example col m4 s4 offset-s4">
                <img class="responsive-img" src="${data.crestUrl}" alt="mu">
              </div>
              <div class="card blue-grey col m8 s12">
                <div class="card-content white-text">
                  <span class="card-title">${data.name}</span>
                  <span>Venue: ${data.venue},</span>
                  <span>Website: ${data.website},</span>
                  <span>Address: ${data.address}</span>
                </div>
                <div class="card-action">
                  <a href="./detail.html?id=${data.id}">Detail</a>
                </div>
              </div>
            </div>
            `
          });
          document.getElementById("footbal").innerHTML = footbalHtml;
        })
      }
    })
  }
  fetch(BASE_URL + "v2/competitions/2021/teams", headerApi)
    .then(statusResponse)
    .then(jsonResponse)
    .then(data => {
      let footbalHtml = "";
      data.teams.forEach((data) => {
        footbalHtml += `
        <div class="col s12 m6">
          <div class="grid-example col m4 s4 offset-s4">
            <img class="responsive-img" src="${data.crestUrl}" alt="mu">
          </div>
          <div class="card blue-grey col m8 s12">
            <div class="card-content white-text">
              <span class="card-title">${data.name}</span>
              <span>Venue: ${data.venue},</span>
              <span>Website: ${data.website},</span>
              <span>Address: ${data.address}</span>
            </div>
            <div class="card-action">
              <a href="./detail.html?id=${data.id}">Detail</a>
            </div>
          </div>
        </div>
        `
      });
      document.getElementById("footbal").innerHTML = footbalHtml;
    })
    .catch(error);
}
const getFootbalDetails = () => {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ('caches' in window) {
      caches.match(BASE_URL + "v2/teams/" + idParam).then((response) => {
        if (response) {
          response.json().then(data => {
            let footbalDetail = `
          <div class="row" style="margin-top: 10px;">
          <div class="grid-example col m4 s4 offset-s4">
            <img class="responsive-img" src="${data.crestUrl}" alt="photo">
          </div>
          <div class="grid-example col m8 s12">
            <p>
              ${data.name} adalah sebuah klub sepak bola profesional Inggris yang bermarkas di ${data.venue},
              dan bermain di kasta tertinggi Liga Inggris. Didirikan pada tahun ${data.founded}.    
              diantara nama-nama pemainya adalah : 
            </p>
            <br>
            <h6>${data.squad[0].name}</h6> Dan
            <h6>${data.squad[1].name}</h6>
          </div>
        </div>
          `;
            document.getElementById("body-content").innerHTML = footbalDetail;
            resolve(data)
          });
        }
      });
    }
    fetch(BASE_URL + "v2/teams/" + idParam, headerApi)
      .then(statusResponse)
      .then(jsonResponse)
      .then(data => {
        let footbalDetail = `
      <div class="row" style="margin-top: 10px;">
      <div class="grid-example col m4 s4 offset-s4">
        <img class="responsive-img" src="${data.crestUrl}" alt="photo">
      </div>
      <div class="grid-example col m8 s12">
        <p>
          ${data.name} adalah sebuah klub sepak bola profesional Inggris yang bermarkas di ${data.venue},
          dan bermain di kasta tertinggi Liga Inggris. Didirikan pada tahun ${data.founded}.    
          diantara nama-nama pemainya adalah : 
        </p>
        <br>
        <h6>${data.squad[0].name}</h6> Dan
        <h6>${data.squad[1].name}</h6>
      </div>
    </div>
      `;
        document.getElementById("body-content").innerHTML = footbalDetail;
        resolve(data);
      }).catch(error);
  })
}

const getSavedFootbals = () => {
  getAll().then(footbals => {
    var footbalsHTML = "";
    footbals.forEach(function (data) {
      footbalsHTML += `
                  <div class="card col m4" style="margin-top: 10px;margin-left:15px;">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" />
                      </div>
                    <div class="card-content">
                      <span class="card-title truncate">${data.name}</span>
                      <span>Venue: ${data.venue},</span>
                      <span>Website: ${data.website},</span>
                      <span>Address: ${data.address}</span>
                    </div>
                    <div class="card-action">
                      <a href="./detail.html?id=${data.id}&saved=true">Detail</a>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("footbales-saved").innerHTML = footbalsHTML;
  })
}

const getSavedFootbalById = () => {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    getById(idParam).then(data => {
      let footbalDetail = `
    <div class="row" style="margin-top: 10px;">
    <div class="grid-example col m4 s4 offset-s4">
      <img class="responsive-img" src="${data.crestUrl}" alt="photo">
    </div>
    <div class="grid-example col m8 s12">
      <p>
        ${data.name} adalah sebuah klub sepak bola profesional Inggris yang bermarkas di ${data.venue},
        dan bermain di kasta tertinggi Liga Inggris. Didirikan pada tahun ${data.founded}.    
        diantara nama-nama pemainya adalah : 
      </p>
      <br>
      <h6>${data.squad[0].name}</h6> Dan
      <h6>${data.squad[1].name}</h6>
    </div>
  </div>
    `;
      document.getElementById("body-content").innerHTML = footbalDetail;
      resolve(data);
    });
  });
}
const getStandings = () => {

  if ('caches' in window) {
    caches.match(BASE_URL + "v2/competitions/2021/standings").then((response) => {
      if (response) {
        response.json().then((data) => {
          let standingHtml = "";
          data.standings.forEach((data) => {
            if (data.type === "TOTAL") {
              data.table.forEach(standing => {
                standingHtml += `
                <tr>
                  <td>${standing.position}</td>
                  <td>${standing.team.name}</td>
                  <td>${standing.playedGames}</td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.points}</td>
                  <td>${standing.goalDifference}</td>
                </tr>
                `
              })
            }

          });
          document.getElementById("klasemen").innerHTML = standingHtml;
        })
      }
    })
  }
  fetch(BASE_URL + "v2/competitions/2021/standings", headerApi)
    .then(statusResponse)
    .then(jsonResponse)
    .then(data => {
      let standingHtml = "";
      data.standings.forEach((data) => {
        if (data.type === "TOTAL") {
          data.table.forEach(standing => {
            standingHtml += `
            <tr>
              <td>${standing.position}</td>
              <td>${standing.team.name}</td>
              <td>${standing.playedGames}</td>
              <td>${standing.won}</td>
              <td>${standing.draw}</td>
              <td>${standing.lost}</td>
              <td>${standing.points}</td>
              <td>${standing.goalDifference}</td>
            </tr>
            `
          })
        }

      });
      document.getElementById("klasemen").innerHTML = standingHtml;
    })
    .catch(error);
}