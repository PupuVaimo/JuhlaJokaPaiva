// Odotetaan, että koko sivu latautuu ennen koodin suorittamista
document.addEventListener("DOMContentLoaded", function () {
  // Haetaan nykyinen päivämäärä
  const today = new Date();
  const year = today.getFullYear();

  // 🔵 Funktio Pääsiäispäivän laskemiseen (Gaussin algoritmi)
  function getEasterDate(year) {
    let a = year % 19;
    let b = Math.floor(year / 100);
    let c = year % 100;
    let d = Math.floor(b / 4);
    let e = b % 4;
    let f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3);
    let h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4);
    let k = c % 4;
    let l = (32 + 2 * e + 2 * i - h - k) % 7;
    let m = Math.floor((a + 11 * h + 22 * l) / 451);
    let month = Math.floor((h + l - 7 * m + 114) / 31);
    let day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day); // Pääsiäinen
  }

  // 🔵 Funktio Juhannuksen laskemiseen (lauantai 20.–26.6.)
  function getJuhannus(year) {
    for (let day = 20; day <= 26; day++) {
      let juhannusDate = new Date(year, 5, day); // Kesäkuu (5 = kesäkuu)
      if (juhannusDate.getDay() === 6) {
        return juhannusDate;
      }
    }
    return null;
  }

  // 🔵 Määritellään tärkeät juhlapäivät
  const holidays = [
    {
      date: getEasterDate(year),
      name: "Pääsiäinen",
      image: "img/paasiaispaiva.jpg",
    },
    {
      date: getJuhannus(year),
      name: "Juhannuspäivä",
      image: "img/juhannus.jpg",
    },
    {
      date: new Date(year, 11, 24),
      name: "Jouluaatto",
      image: "img/jouluaatto.jpg",
    },
    {
      date: new Date(year, 0, 1),
      name: "Uudenvuodenpäivä",
      image: "img/uudenvuosi.jpg",
    },
  ];

  // 🔵 Etsitään seuraava juhlapäivä
  let nextHoliday = null;
  let minDiff = Infinity;
  holidays.forEach((holiday) => {
    let diff = holiday.date - today;
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      nextHoliday = holiday;
    }
  });

  // 🔵 Päivitetään laskuri ja kuva
  if (nextHoliday) {
    let daysLeft = Math.ceil(minDiff / (1000 * 60 * 60 * 24));
    document.getElementById(
      "countdown"
    ).textContent = `${nextHoliday.name} alkaa ${daysLeft} päivän päästä!`;
    document.getElementById("countdown-image").src = nextHoliday.image;
  } else {
    document.getElementById("countdown").textContent =
      "Ei tulevia juhlia kalenterissa.";
    document.getElementById("countdown-image").src = "img/default.jpg";
  }

  // 🔵 Päivän juhlapäivät Suomessa ja maailmalla
  const month = today.getMonth() + 1; // JavaScriptin kuukaudet alkavat 0:sta
  const day = today.getDate();

  const todayHolidays = {
    "3-14": {
      finland: "Pi päivä (Matematiikan juhlapäivä)",
      world: "Kansainvälinen π-päivä",
    },
    "6-21": { finland: "Juhannuspäivä", world: "Kesäpäivänseisaus" },
  };

  const dateKey = `${month}-${day}`;

  if (todayHolidays[dateKey]) {
    document.getElementById("finland-holiday").textContent =
      todayHolidays[dateKey].finland;
    document.getElementById("world-holiday").textContent =
      todayHolidays[dateKey].world;
  } else {
    document.getElementById("finland-holiday").textContent =
      "Ei virallisia juhlia tänään.";
    document.getElementById("world-holiday").textContent =
      "Ei erityisiä juhlia tänään.";
  }
});
