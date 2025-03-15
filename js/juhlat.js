document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const year = today.getFullYear();

  // 🔵 Функция для вычисления Юханнуса (суббота между 20-26 июня)
  function getJuhannus(year) {
    for (let day = 20; day <= 26; day++) {
      let juhannusDate = new Date(year, 5, day); // Июнь (5 = июнь, т.к. месяцы начинаются с 0)
      if (juhannusDate.getDay() === 6) {
        // Суббота
        return juhannusDate;
      }
    }
    return null;
  }
  // 🔵 Lasketaan pääsiäispäivä (Pääsiäispäivä) Gaussin algoritmilla
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
    return new Date(year, month - 1, day);
  }

  // 🔵 Lasketaan pääsiäisen päivät samalla tavalla kuin juhannus
  const easterSunday = getEasterDate(year); // Pääsiäispäivä
  const pitkaperjantai = new Date(easterSunday);
  pitkaperjantai.setDate(easterSunday.getDate() - 2); // Pitkäperjantai = pääsiäissunnuntai - 2 päivää
  const toinenPaasiaispaiva = new Date(easterSunday);
  toinenPaasiaispaiva.setDate(easterSunday.getDate() + 1); // Toinen pääsiäispäivä = pääsiäissunnuntai + 1 päivä

  // 🔵 Определяем даты
  const juhannus = getJuhannus(year); // Юханнус (суббота)
  const juhannusAatto = new Date(juhannus); // Канун Юханнуса (пятница)
  juhannusAatto.setDate(juhannus.getDate() - 1);

  // 🔵 Универсальный список праздников (без привязки к году)
  const holidays = {
    [`01.01.${year}`]: {
      name: "Uudenvuodenpäivä",
      description: `
            <b>Uusi vuosi Suomessa</b> on rauhallinen mutta tärkeä juhla. 
            Suomalaiset viettävät sen perheen kesken, vaikka juhla voi olla myös ystävien kanssa. 
            Monille se on lepopäivä. Toisin kuin monissa muissa maissa, Uusi vuosi Suomessa ei aina ole täynnä meluisia yleisiä juhlia. 
            Lisäksi Uusi vuosi on ainoa aika vuodesta, jolloin voi nähdä ilotulituksia ja laukaista niitä itse.<br><br>

            <b>Perinteet:</b><br>
            <b>Lyijykastelu (Päivänki):</b> Tämä on vanha perinne, jossa ihmiset sulattavat lyijyä ja heittävät sen kylmään veteen. 
            Muodostuneiden kuvioiden perusteella voi "ennustaa" tulevan vuoden tapahtumia.<br>
            <b>Presidentin puhe:</b> Perinteisesti joulukuun 31. päivänä Suomen presidentti pitää uuden vuoden puheen, joka lähetetään televisiossa.<br>
        `,
      image: "img/uudenvuosi.jpg",
      video: "video/uudenvuodenpuhe.mp4",
    },
    [`06.01.${year}`]: {
      name: "Loppiainen",
      description: `
          <b>Loppiainen</b> on päivä, jolloin Suomessa perinteisesti päättyy joulun juhla-aika. 
          Tämä juhla liittyy kolmen itämaan tietäjän saapumiseen, jotka toivat lahjat vastasyntyneelle Jeesukselle. 
          Loppiainen on tärkeä kristillinen juhla, joka symboloi joulukauden päättymistä ja ilmestysjuhlan (epifania) alkamista.<br><br>

          <b>Perinteet:</b><br>
          <b>Kirkon palvelukset:</b> Monille suomalaisille tämä päivä liittyy kirkossa käymiseen. 
          Kokoontumiset, joissa pidetään erityisiä jumalanpalveluksia ilmestysjuhlan kunniaksi, ovat yleisiä.<br>
          <b>Perinteinen pulla (Loppiaispulla):</b> Tänä päivänä syödään makeita pullia, joissa on marsipaanitäyte. 
          Tämä herkku muistuttaa niitä lahjoja, joita kolme tietäjää toivat Jeesus-lapselle: kultaa, suitsukkeita ja mirhaa.<br>
      `,
      image: "img/loppiainen.jpg",
    },
    [`05.02.${year}`]: {
      name: "Runebergin päivä",
      description: `
          <b>Runebergin päivä</b> on kansallinen juhla, joka on omistettu Suomen runoilijalle ja kansallissankari Johan Ludvig Runebergille. 
          Hän on yksi tunnetuimmista suomalaisista kirjailijoista ja Suomen kansallislaulun sanoittaja, ja hän edustaa suomalaista kansallista identiteettiä.<br><br>

          <b>Perinteet:</b><br>
          <b>Runebergin torttu:</b> Tämä on ehkä juhlan tunnetuin perinne. Runebergin torttu on pieni kakku, jonka päällä on vadelmahilloa ja valkoista kuorrutusta. 
          Tätä herkkua tarjoillaan usein teen kanssa, ja se on tullut symboliksi tälle päivälle.<br>
          <b>Kirkon palvelukset ja runojen lukeminen:</b> Runebergin päivänä suomalaiset käyvät usein kirkossa ja lukevat tai kuuntelevat hänen runojaan. 
          Monet koulut ja organisaatiot järjestävät myös tilaisuuksia, joissa keskustellaan hänen elämästään ja teoksistaan.<br>
          <b>Kulttuuritapahtumat:</b> Runebergin päivänä pidetään usein erilaisia kulttuuriin liittyviä tapahtumia, kuten konsertteja, teatteriesityksiä ja näyttelyitä.<br>
      `,
      image: "img/runeberg.jpg",
    },
    [`06.02.${year}`]: {
      name: "Saamelaisten kansallispäivä",
      description: `<b>Saamelaisten kansallispäivä</b> on juhla, joka on omistettu saamelaisen kulttuurin ja oikeuksien kunnioittamiselle. 
      Saamelaiset ovat alkuperäiskansa, joka asuu Pohjois-Suomessa, Ruotsissa, Norjassa ja Venäjällä. 
      Tämän juhlan tarkoituksena on korostaa saamelaisen kulttuurin säilyttämistä ja saamelaiskansan merkitystä Suomen yhteiskunnassa.<br><br>

      <b>Perinteet:</b><br>
      <b>Kulttuuritapahtumat ja kokoontumiset:</b> Saamelaisten kansallispäivänä eri puolilla Suomea järjestetään kulttuuriin liittyviä tilaisuuksia, 
      jotka lisäävät tietoisuutta saamelaiskulttuurista. Näihin voi kuulua näyttelyitä, konsertteja, luentoja ja teatteriesityksiä, joissa käsitellään saamelaiskansan historiaa ja nykyhetken kysymyksiä.<br>
      
      <b>Saamelaismusiikin ja tanssien esitys:</b> Saamelaiset tunnetaan musiikistaan, erityisesti perinteisestä joikista, joka on saamelainen laulutyyli. 
      Tänä päivänä usein järjestetään esityksiä, joissa kuullaan joikia ja saamelaisia tansseja, jotka ovat olennainen osa saamelaiskulttuuria.<br>

      <b>Poliitikkojen ja aktivistien puheet:</b> Saamelaisten kansallispäivänä pidetään usein puheita poliitikoilta, aktivisteilta ja saamelaiskansan johtajilta, 
      jotka tuovat esiin saamelaiskansan oikeudet, kielelliset ja kulttuuriset tarpeet sekä tarpeen kunnioittaa ja tunnustaa heidän perinteitään.<br>

      <b>Saamelaislippu:</b> Tänä päivänä nousee usein saamelaislippu, joka on jaettu neljään väriin: punaiseen, siniseen, vihreään ja keltaiseen, 
      symboloiden neljää kansaa (suomalainen, ruotsalainen, norjalainen ja venäläinen), joiden kanssa saamelaiset ovat yhteydessä.`,
      image: "img/saami_day.jpg",
    },
    [`14.02.${year}`]: {
      name: "Ystävänpäivä",
      description: `<b>Ystävänpäivä</b> on juhla, joka on omistettu ystäville ja ystävyyden arvostamiselle. 
        Vaikka Ystävänpäivä muistuttaa monilta osin muuta maailmaa rakastavaisten juhlaa, Suomessa se keskittyy erityisesti 
        ystävyyteen, ei pelkästään romanttisiin suhteisiin. Tämä päivä on täydellinen tilaisuus osoittaa kiitollisuutta läheisille 
        ystäville ja läheisille ihmisille.<br><br>

        <b>Perinteet:</b><br>
        <b>Tervehdykset ja kortit:</b> Suomessa ystävänpäivänä lähetetään usein kortteja ja tervehdyksiä ystäville. 
        Eroa romanttisista juhlista on se, että ystävänpäivä keskittyy enemmän ystävyyteen kuin rakkauteen. Ystävät voivat lähettää 
        toisilleen kortteja tai järjestää pieniä tapaamisia.<br>
        <b>Ystävien tapaaminen:</b> Tämä on täydellinen päivä viettää aikaa hyvien ystävien kanssa. Monet suomalaiset järjestävät 
        epämuodollisia juhlia tai yhteisiä illallisia, joissa voi jakaa ilot ja arjen kuulumiset.<br>
        <b>Suklaa ja herkut:</b> Kuten monissa muissa maissa, ystävänpäivänä on tapana antaa makeisia lahjaksi, erityisesti suklaata ja karkkeja. 
        Monet kaupat tarjoavat erityisiä lahjapakkauksia, jotka sopivat täydellisesti tähän päivään.<br>
        <b>"Ei rakastavaisten päivä":</b> Viime vuosina ystävänpäivä on tullut suosituksi myös nuorten keskuudessa, jotka eivät ole parisuhteessa 
        mutta haluavat juhlia ystävyyttä. Näin ollen ystävänpäivä ei ole vain rakastavaisten juhla, vaan myös ystävyyden ja yhteisymmärryksen juhla.`,
      image: "img/ystavanpaiva.jpg",
    },
    [`28.02.${year}`]: {
      name: "Kalevalan päivä",
      description: `<b>Kalevalan päivä</b> on suomalaisen kulttuurin juhla, joka muistuttaa kansallisen eepoksen, Kalevalan, ilmestymisestä. 
        Kalevala julkaistiin ensimmäisen kerran Elias Lönnrotin toimesta vuonna 1835, ja sen katsotaan olevan yksi Suomen tärkeimmistä kulttuuriteoksista. 
        Tämä päivä on omistettu suomalaiselle kansanperinteelle, kirjallisuudelle ja kulttuurille.<br><br>

        <b>Perinteet:</b><br>
        <b>Kalevalan lukeminen:</b> Kalevalan päivänä monet suomalaiset lukevat teoksen. Kouluissa ja yliopistoissa pidetään usein lukutapahtumia ja luentoja Kalevalasta ja sen merkityksestä Suomen kulttuurissa ja historiassa.<br>
        <b>Kulttuuritapahtumat:</b> Useilla paikkakunnilla järjestetään konsertteja, näyttelyitä, teatteriesityksiä ja luentoja, jotka liittyvät Kalevalaan. Monilla kulttuuri- ja taidealoilla järjestetään tilaisuuksia, joissa yleisölle kerrotaan Kalevalan symboliikasta ja sen vaikutuksesta Suomen kulttuuriin.<br>
        <b>Runousperinteet:</b> Kalevalan päivänä voi myös löytää runouden ystäviä, jotka kokoontuvat keskustelemaan ja jakamaan runoja ja ajatuksia Kalevalasta ja suomalaisesta kirjallisuudesta.<br>
        <b>Ruoanlaittoperinteet:</b> Joissain perheissä valmistetaan perinteisiä suomalaisia ruokia, kuten "kalakukkoa", joka on Kalevalan innoittama perinneherkku. Tämä ruokalaji symboloi Suomen keittiön ainutlaatuisuutta.`,
      image: "img/kalevalanpaiva.jpg",
    },
    [`09.04.${year}`]: {
      name: "Mikael Agricolan päivä",
      description: `<b>Mikael Agricolan päivä (suomen kielen päivä)</b> on suomalainen kirjallisuuden ja kielen juhla, joka on omistettu suomen kirjakielen kehittäjälle. 
        Mikael Agricola oli uskonpuhdistaja ja suomen kielen kirjallisen muodon kehittäjä, joka käänsi Raamatun osia suomeksi ja loi suomen kielen kielioppeja. 
        Hänen työnsä on ollut merkittävä kielen kehityksessä ja suomalaisen identiteetin vahvistamisessa.<br><br>
    
        <b>Perinteet:</b><br>
        <b>Suomalaisen kirjallisuuden lukeminen:</b> Tänä päivänä monet suomalaiset kunnioittavat Agricolan työtä lukemalla hänen teoksiaan tai keskustelemalla suomen kielen kehityksestä.<br>
        <b>Kirjalliset tapahtumat:</b> Kirjastot, koulut ja yliopistot järjestävät lukutilaisuuksia, näyttelyitä ja luentoja Agricolan perinnöstä.<br>
        <b>Agricolan kunnioittaminen:</b> Monissa kirkoissa ja oppilaitoksissa pidetään erityisiä tilaisuuksia, joissa Agricolan työn merkitystä suomalaisen kulttuurin kehitykselle korostetaan.<br>
      `,
      image: "img/agrikola.jpg",
    },
    [`01.05.${year}`]: {
      name: "Vappu",
      description: `<b>Vappu</b> on yksi Suomen suosituimmista ja odotetuimmista juhlista. Se on sekä työn juhla että kevään aloitusjuhla. 
        Suomessa vappua vietetään rennosti ja iloisesti, ja se on erityisesti opiskelijoiden suosikkijuhla.<br><br>
    
        <b>Perinteet:</b><br>
        <b>Opiskelijoiden juhla:</b> Vappu on Suomessa vahvasti opiskelijaperinteen juhla. Opiskelijat pukeutuvat perinteisiin valkoisiin ylioppilaslakkeihin, 
        jotka symbolisoivat lukion päättymistä. He järjestävät piknikkejä ja juhlallisuuksia, joissa nautitaan perinteisiä herkkuja, kuten tippaleipää (sokerimunkit) 
        ja simaa (makeaa limonadia).<br>
        <b>Kevätjuhla ulkona:</b> Vappuna suomalaiset kokoontuvat kaduille, erityisesti Helsingissä, juhlimaan kevään tuloa. Ihmisten yllä näkee värikkäitä asuja, 
        kaduilla on paraateja, ilmapalloja ja musiikkia. Puistoissa vietetään piknikkejä, joissa nautitaan kevätjuhlan tunnelmasta.<br>
        <b>Illan karnevaaliparaati:</b> Helsingissä ja muilla suurilla paikkakunnilla järjestetään illalla karnevaaliparaateja, joita säestävät musiikki, 
        katuesitykset ja ilta päättyy ilotulituksiin, jotka symbolisoivat kevään virallista aloitusta.<br>
      `,
      image: "img/vappu.jpg",
    },
    [`09.05.${year}`]: {
      name: "Eurooppa-päivä",
      description: `<b>Eurooppa-päivä</b> on juhla, joka pidetään Schumanin päivän kunniaksi ja Euroopan unionin perustajien muistoksi. 
        Suomessa tämä päivä symbolisoi eurooppalaisten maiden yhteyttä ja yhteistyön merkitystä EU:ssa. 
        Eurooppa-päivä on juhla koko mantereella, ja se muistuttaa rauhan, demokratian ja ihmisoikeuksien merkityksestä Euroopassa.<br><br>
    
        <b>Perinteet:</b><br>
        <b>Tapahtumat ja keskustelut:</b> Tänä päivänä Suomessa järjestetään erilaisia tapahtumia, kuten luentoja, keskusteluja ja näyttelyitä, 
        jotka liittyvät Euroopan unioniin, sen historiaan ja tulevaisuuteen. Monet niistä järjestetään yliopistojen, kulttuurikeskusten 
        ja paikallishallintojen toimesta. Tapahtumat keskittyvät myös ihmisoikeuksiin ja EU:n vahvistamisen tärkeyteen.<br>
    
        <b>Flashmobit ja katutapahtumat:</b> Suomen suurimmissa kaupungeissa, kuten Helsingissä, Turussa ja Tampereella, 
        pidetään katutapahtumia, joissa korostetaan eurooppalaista identiteettiä ja yhtenäisyyttä. 
        Nämä voivat olla konsertteja, flashmobeja ja tapahtumia, joissa esiintyy kansainvälisiä kulttuuriryhmiä.<br>
    
        <b>Kampanjat ja koulutushankkeet:</b> Eurooppa-päivänä järjestetään myös kampanjoita, joiden tarkoituksena on lisätä 
        tietoisuutta EU:n toiminnasta, kuten kouluissa pidettävät kilpailut ja esitykset, 
        jotka selittävät EU-jäsenyyden hyödyt ja haitat.<br>
      `,
      image: "img/eurooppa.jpg",
    },
    [`12.05.${year}`]: {
      name: "J.V. Snellmanin päivä",
      description: `
        <b>J.V. Snellmanin päivä</b> on juhla, joka pidetään Johan Wilhelm Snellmanin kunniaksi.
        Snellman oli merkittävä suomalainen filosofi, kulttuurivaikuttaja ja poliitikko, joka vaikutti
        Suomen kansalliseen identiteettiin ja suomen kielen vahvistamiseen. Tämä päivä muistuttaa
        kulttuurin, kielen ja identiteetin merkityksestä maalle.<br><br>
    
        <b>Perinteet:</b><br>
        <b>Kulttuurinen juhla:</b> Snellmanin päivänä Suomessa järjestetään erilaisia kulttuuritapahtumia,
        kuten luentoja, keskusteluja, konsertteja ja näyttelyitä, jotka keskittyvät Johan Snellmanin elämään,
        hänen filosofisiin ajatuksiinsa ja hänen vaikutukseensa suomalaiseen kulttuuriin. Yliopistot ja
        kulttuurilaitokset järjestävät tapahtumia, jotka korostavat suomen kielen ja kansallisen itsetunnon
        kehittämistä.<br>
        
        <b>Kieli ja kulttuuri:</b> Päivä on myös tilaisuus keskustella suomen kielen roolista nykypäivän elämässä.
        Kouluissa ja yliopistoissa pidetään tilaisuuksia, jotka lisäävät tietoisuutta kielen säilyttämisen ja
        kehittämisen tärkeydestä osana kansallista identiteettiä.<br>
        
        <b>Puheenvuorot ja historialliset kierrokset:</b> Snellmanin kunniaksi pidetään luentoja hänen elämästään,
        teoksistaan ja kulttuuriperintöönsä, ja järjestetään historiallisia kiertokäyntejä paikoissa, jotka liittyvät
        hänen elämäänsä, kuten hänen syntymäkaupunkiinsa.<br>
      `,
      image: "img/snellman.jpg",
    },
    [`19.03.${year}`]: {
      name: "Minna Canthin päivä",
      description: `<b>Minna Canthin päivä</b> on juhla, joka on omistettu suomalaisen kirjailijan ja yhteiskunnallisen vaikuttajan Minna Canthin elämäntyölle. 
        Canth oli merkittävä hahmo naisten oikeuksien puolestapuhujana ja sosiaalisten muutosten edistäjänä Suomessa. Tämä päivä juhlistaa hänen perintöään ja rooliaan suomalaisessa yhteiskunnassa.<br><br>

        <b>Perinteet:</b><br>
        <b>Keskustelut ja tapahtumat:</b> Minna Canthin päivänä järjestetään usein luentoja, keskusteluja ja kulttuuritapahtumia, jotka keskittyvät hänen elämäänsä ja tuotantoonsa. Canth oli yksi Suomen tunnetuimmista feministisen liikkeen edustajista, ja hänen ajatuksensa ovat edelleen ajankohtaisia.<br>
        <b>Kirjallisuuslukemiset:</b> Päivän kunniaksi pidetään usein kirjallisuuslukemisia, joissa kuullaan otteita Canthin teoksista, kuten "Työmiehen vaimo" tai "Köyhää kansaa". Nämä teokset käsittelevät köyhyyttä, yhteiskunnallista epäoikeudenmukaisuutta ja eriarvoisuutta.<br>
        <b>Kulttuurihankkeet:</b> Suomen eri kaupungeissa järjestetään teatteriesityksiä, jotka pohjautuvat hänen teoksiinsa, sekä näyttelyitä, jotka valaisevat hänen elämäänsä ja työtään.<br>
        <b>Naisten aloitteet:</b> Tämä päivä muistuttaa myös naisten oikeuksien tärkeydestä, ja monet yhteiskunnalliset järjestöt järjestävät kampanjoita, jotka keskittyvät naisten aseman parantamiseen.`,
      image: "img/minna_canthin_paiva.jpg",
    },
    [`31.10.${year}`]: {
      name: "Kekri",
      description: `<b>Kekri</b> on muinaissuomalainen sadonkorjuujuhla, joka juhlistaa kesän ja syksyn sadon päättymistä sekä siirtymistä talveen.
        Se on yksi Suomen vanhimmista juhlista ja liittyy hedelmällisyyteen, taikuuteen sekä esi-isien kunnioittamiseen. Viime vuosina Kekri on saanut
        uusia muotoja ja sitä juhlitaan myös Halloweenin tapaan naamiaisineen ja rituaaleineen.<br><br>

        <b>Perinteet:</b><br>
        <b>Sadonkorjuujuhla:</b> Kekri merkitsi vanhastaan kiitosta hyvästä sadosta ja valmistautumista talveen. Se oli myös aika kiittää maahisia
        ja haltijoita sadon suojelusta.<br>
        <b>Tanssit ja puvut:</b> Kekriin kuuluivat perinteisesti naamiaiset, joissa pukeuduttiin henkiolennoiksi ja myyttisiksi hahmoiksi.
        Tanssit ja kulkueet olivat osa juhlintaa.<br>
        <b>Rituaalit ja ennustukset:</b> Kekrinä tehtiin taikoja, joiden uskottiin takaavan hyvän seuraavan vuoden sadon ja perheen hyvinvoinnin.<br>
        <b>Kekri-ateriat:</b> Perinteisiin kuului runsas juhla-ateria, joka sisälsi ruisleipää, juureksia ja liharuokia, joita nautittiin koko perheen kanssa.<br>
        <b>Ilotulitukset ja kokot:</b> Tulta pidettiin puhdistavana voimana. Kekrinä sytytettiin kokkoja, joilla uskottiin olevan suojeleva vaikutus.<br>
        <b>Kynttilät ja valot:</b> Viime vuosina Kekriin on lisätty kynttilöitä ja lyhtyjä, jotka symboloivat valon tuomista pimeään vuodenaikaan.<br>`,
      image: "img/kekri.jpg",
    },
    [`06.12.${year}`]: {
      name: "Itsenäisyyspäivä",
      description: `<b>Itsenäisyyspäivä</b> on yksi Suomen tärkeimmistä ja juhlallisimmista juhlapäivistä. 
          Se pidetään 6. joulukuuta ja symboloi päivää, jolloin Suomi julisti itsenäisyytensä Venäjästä vuonna 1917.<br><br>
    
          <b>Perinteet:</b><br>
          <b>Seremonia eduskunnassa ja presidentin itsenäisyyspäivän juhla:</b> Yksi tunnetuimmista rituaaleista on virallinen seremonia eduskunnassa, 
          jossa Suomen presidentti pitää puheen itsenäisyyden kunniaksi. Illalla pidetään Presidentin juhla Helsingissä, joka välitetään televisiossa. 
          Tämä on tärkeä tilaisuus suomalaisille, ja monet katsovat sen suurella mielenkiinnolla.<br>
    
          <b>Kynttilöiden sytyttäminen:</b> Illalla 6. joulukuuta suomalaiset sytyttävät perinteisesti kaksi kynttilää ikkunalleen 
          kiitollisuuden ilmaisemiseksi itsenäisyydelle ja vapaudelle. Tämä on henkilökohtainen perinne, joka on saanut symbolisen merkityksen.<br>
    
          <b>Paraati:</b> Suurissa kaupungeissa, kuten Helsingissä, pidetään juhlallisia paraateja, joissa osallistujat esittelevät 
          kansallisia symboleja ja ilmaisevat ylpeytensä maastaan.<br>
    
          <b>Perhejuhla:</b> Monille suomalaisille tämä on päivä, jolloin he kokoontuvat perheen kanssa. Tämä voi olla myös päivä teatteriin, 
          konserttiin tai ravintolaan.<br>
      `,
      image: "img/itsenaisyyspaiva.jpg",
    },
    [`08.12.${year}`]: {
      name: "Sibeliuksen päivä",
      description: `<b>Sibeliuksen päivä</b> on virallinen liputuspäivä Suomessa, ja sitä vietetään 8. joulukuuta. 
          Päivä on omistettu Jean Sibeliukselle (1865–1957), Suomen kansallissäveltäjälle, jonka musiikki on merkittävä osa maan kulttuuriperintöä. 
          Hänen teoksensa, kuten "Finlandia", ovat inspiroineet suomalaisia ja vahvistaneet kansallista identiteettiä.<br><br>
    
          <b>Perinteet:</b><br>
          <b>Konsertit ja musiikkiesitykset:</b> Eri puolilla Suomea järjestetään Sibeliuksen musiikille omistettuja konsertteja. 
          Suosituimpia teoksia ovat <i>Finlandia</i>, <i>Karelia-sarja</i> ja <i>Viulukonsertto</i>.<br>
          <b>Kulttuuritapahtumat:</b> Erityisesti Helsingissä, Sibelius-Akatemiassa ja Kansallisoopperassa järjestetään Sibeliukseen liittyviä tapahtumia.<br>
          <b>Näyttelyt ja historia:</b> Monet museot ja kulttuurikeskukset järjestävät näyttelyitä Sibeliuksen elämästä ja työstä.<br>
          <b>Opastetut kierrokset:</b> Järvenpäässä, jossa Sibelius asui vuosikymmeniä, pidetään hänen kunniakseen opastettuja kierroksia.`,
      image: "img/sibelius.jpg",
    },
    [`24.12.${year}`]: {
      name: "Jouluaatto",
      description: `<b>Jouluaatto</b> on yksi rakastetuimmista juhlista Suomessa, jota vietetään 24. joulukuuta. 
          Tämä on ilta, jolloin suomalaiset valmistautuvat joulun juhlahetkiin ja kokoontuvat perheen ympärille. 
          Jouluaatto on Suomessa joulusesongin tärkein hetki, ja perinteet liittyvät perheen lämpöön, juhla-ateriaan ja erityisiin hetkiin.<br><br>
    
          <b>Perinteet:</b><br>
          <b>Juhla-ateria:</b> 24. joulukuuta perhe kokoontuu pöydän ääreen nauttimaan perinteisiä jouluruokia. Näitä ovat muun muassa kinkku, kalat, perunamuusi, joulupuuro ja monia muita.<br>
          <b>Kirkko ja joulupalvelus:</b> Monissa perheissä perinteisesti käydään kirkossa jouluaattona, jossa pidetään juhlapalvelus ja kuunnellaan joululauluja.<br>
          <b>Lahjat:</b> Yksi jouluaaton kohokohdista on hetki, jolloin lapset avaavat lahjansa, tavallisesti illallisen jälkeen tai kirkon palveluksen jälkeen.<br>
          <b>Joulutunnelma:</b> Kaduilla ja kodeissa näkyy runsaasti joulun valoja ja koristeita. Joulukuusi koristellaan valoketjuilla, koristeilla ja kynttilöillä.<br>
          <b>Joulupukin saapuminen:</b> Klo 18.00 jouluaattona Joulupukki vierailee kodeissa ja lapset saavat lahjansa tältä ystävälliseltä taikahahmolta.<br>
          <b>Joulumarkkinat Helsingissä:</b> Suurissa kaupungeissa, kuten Helsingissä, järjestetään joulumarkkinoita ja juhlallisia tapahtumia.`,
      image: "img/jouluaatto.jpg",
    },
    [`25.12.${year}`]: {
      name: "Joulupäivä",
      description: `<b>Joulupäivä</b> on Suomen joulusesongin pääjuhla, jota vietetään 25. joulukuuta. 
        Toisin kuin jouluaaton ilta, joka on täynnä valmistautumista ja perinteitä, itse joulu on päivä, joka omistetaan rauhalle, levolle ja juhlahetkille perheen ja ystävien kanssa. 
        Suomessa joulu on erityinen ajankohta, jolloin ihmiset voivat rentoutua arjen huolista ja nauttia yhdessäolosta perheen kanssa.<br><br>

        <b>Perinteet:</b><br>
        <b>Perinteinen joulupäivällinen:</b> Jouluna suomalaiset nauttivat runsasta jouluruokaa. Keskeisiä ruokia ovat joulukinkku, perunamuusi, kaalikääryleet, kala ja erilaiset laatikot kuten lanttulaatikko tai perunalaatikko. 
        Joulupöydässä on myös joulupuuro, joka tarjoillaan usein kirsikkahillon kanssa, ja joissakin perheissä puuron alla on manteli, jonka löytäjä on vuoden onnekas.<br>

        <b>Joulukirkko:</b> Monet suomalaiset käyvät kirkossa joulupäivän aamuna, jossa pidetään joulumessu. Tämä on erityinen hetki uskoville, ja jumalanpalveluksessa lauletaan joululauluja. 
        Joissain kirkoissa pidetään myös joulukonsertteja, jotka luovat tunnelmallisen ja juhlaisen ilmapiirin.<br>

        <b>Lahjat:</b> Lahjat avataan useimmiten joulupäivän aamuna sen jälkeen, kun ne on asetettu joulukuusen alle jouluaattona. 
        Vaikka lahjat eivät ole kaikille pakollinen perinne, monet perheet nauttivat lahjojen antamisesta ja saamisesta. Lahjat voivat olla sekä lapsille että aikuisille, ja tämä on tärkeä osa joulua, joka tuo iloa ja riemua koteihin.<br>

        <b>Lepo ja rauha:</b> Toisin kuin jouluaaton juhlaillallinen, itse joulupäivä Suomessa omistetaan usein levolle ja rauhalle. 
        Monet suomalaiset viettävät päivän kotona rentoutuen, lukien kirjoja, keskustellen perheen kanssa ja nauttien joulupäivän herkuista.<br>

        <b>Haudoilla käynti:</b> Joulun aikana monet suomalaiset käyvät haudoilla muistamassa poismenneitä läheisiään. 
        Tämä tapahtuu usein joulukuusen valojen alla, kun suomalaiset menevät hautausmaille kynttilöiden tai lyhtyjen kanssa.<br>

        <b>Joulukoristeet ja tunnelma:</b> Joulun aikana kodeissa on joulukuusia, kynttilöitä ja valoketjuja, jotka luovat erityisen tunnelman. 
        Jouluaattoillassa kodit täyttyvät kirkkaista valoista ja kynttilöistä, jotka luovat maagisen ilmapiirin.<br>
      `,
      image: "img/joulu.jpg",
    },
    [`26.12.${year}`]: {
      name: "Tapaninpäivä",
      description: `<b>Tapaninpäivä</b> on 26. joulukuuta ja se on Suomessa perinteisesti jatko joulun juhlimiselle, mutta se on myös itsenäinen juhla. 
        Tämän päivän aikana suomalaiset jatkavat joulun rauhallista tunnelmaa, mutta useimmiten tapaavat ystäviä ja laajentavat perhejuhlaa.<br><br>

        <b>Perinteet:</b><br>
        <b>Jouluruokien jatkaminen:</b> Joulupäivällisten jälkeen monet suomalaiset nauttivat Tapaninpäivän aterioista, jotka sisältävät usein samoja ruokia, jotka olivat joulupöydässä – 
        joulukinkkua, perunalaatikkoa ja joulupuuroa. Tämä päivä on myös tilaisuus herkutella jouluruoilla.<br>
        <b>Hiihtäminen ja pulkkailu:</b> Koska päivä on vapaata, monet suomalaiset nauttivat ulkoilusta. Hiihtäminen ja pulkkailu ovat suosittuja tapoja juhlia Tapaninpäivää, 
        varsinkin silloin, kun sää on talvinen ja luminen.<br>
        <b>Ystävien ja perheen vierailut:</b> Tapaninpäivä on päivä, jolloin monet suomalaiset vierailevat ystäviensä ja sukulaistensa luona. 
        Tämä on myös hyvä hetki jakaa uuden vuoden toivotuksia ja jatkaa joulun juhlia ystävällisessä ympäristössä.<br>
        <b>Elokuvat ja kulttuurielämykset:</b> Tapaninpäivän aikana monet perheet katsovat jouluelokuvia tai käyvät kulttuuritapahtumissa. 
        Tämä on vielä yksi tilaisuus nauttia yhteisistä hetkistä ja tehdä mukavia muistoja.<br>`,
      image: "img/tapaninpaiva.jpg",
    },
    [`${juhannusAatto.getDate().toString().padStart(2, "0")}.06.${year}`]: {
      name: "Juhannusaatto",
      description: `
          <b>Juhannusaatto (Kesäpäivänseisaus)</b> on yksi tärkeimmistä ja rakastetuimmista juhlista Suomessa. 
          Se on perinteinen juhla kesäpäivänseisaukselle. Tänä päivänä Suomessa koetaan vuoden pisin päivä, ja yö on lähes olematon. 
          Juhannus juhla on juuriltaan muinaisten pakanallisten perinteiden ja rituaalien myötä, jotka liittyvät luontoon, tulleen ja hedelmällisyyteen.<br><br>
          
          <b>Perinteet:</b><br>
          <b>Tulen kokot:</b> Yksi tunnetuimmista perinteistä on kokkojen polttaminen. Suomessa eri puolilla maata ja mökeillä ihmiset kokoontuvat kokkojen äärelle juhlimaan kesäpäivänseisausta. Joissakin paikoissa kokot voivat olla valtavan suuria, ja niiden liekit symboloivat puhdistautumista ja suojaa pahoilta hengiltä.<br>
          <b>Uinti järvissä:</b> Juhannusyönä monet suomalaiset menevät järville uimaan. Tämä perinne symboloi puhdistautumista ja virvoittumista sekä antaa mahdollisuuden nauttia Suomen luonnon kauneudesta.<br>
          <b>Tanssit ja juhla:</b> Tänä päivänä pidetään usein kansantansseja, juhlia ja muita tapahtumia sekä kaupungeissa että maaseudulla. Mökeillä järjestetään grillauksia ja illallisia, ja musiikki ja nauru täyttävät tilan.<br>
          <b>Kukat ja seppeleet:</b> Joillakin alueilla Suomessa perinteisesti punotaan seppeleitä, jotka laitetaan päähän. Seppeleet symboloivat elävää luontoa ja yhteyttä maahan.<br>
          <b>Juhannusmökki:</b> Monille suomalaisille Juhannus on aika, jolloin he menevät mökeilleen (Juhannusmökki) juhlimaan kesän juhlaa perheen ja ystävien kanssa kaupunkielämän hälinästä pois. Täällä ihmiset voivat nauttia rauhasta, luonnosta ja kesäauringosta.`,
      image: "img/juhannusaatto.jpg",
    },
    [`${juhannus.getDate().toString().padStart(2, "0")}.06.${year}`]: {
      name: "Juhannuspäivä",
      description: `
          <b>Juhannuspäivä</b> on yksi Suomen tärkeimmistä ja värikkäimmistä juhlista. 
          Se on perinteinen juhla, joka liittyy kesäpäivänseisauksen juhlimiseen. Tämä päivä on täynnä muinaisia pakanallisia rituaaleja.<br><br>

          <b>Perinteet:</b><br>
          <b>Kokkojen polttaminen:</b> Juhannuksen keskeinen perinne on kokkojen polttaminen.<br>
          <b>Uinti järvissä:</b> Tämä uinti symboloi kehon ja mielen puhdistautumista.<br>
          <b>Tanssit ja musiikki:</b> Kansantansseja ja ulkoilmajuhlia ympäri Suomea.<br>
          <b>Sauna:</b> Juhannus on myös perinteinen sauna-ilta.<br>
          <b>Kukkaseppeleet:</b> Seppeleet symboloivat yhteyttä luontoon ja kauneutta.<br>
          <b>Perinteiset ruoat:</b> Grillattua kalaa, lihaa ja perunoita mökeillä ja piknikeillä.<br>
      `,
      image: "img/juhannus.jpg",
    },
    [`${pitkaperjantai.getDate().toString().padStart(2, "0")}.${(
      pitkaperjantai.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${year}`]: {
      name: "Pitkäperjantai",
      description: `<b>Pitkäperjantai</b> on kristillisen kalenterin yksi tärkeimmistä päivistä, joka muistuttaa Jeesuksen ristinkuolemasta. 
          Se on osa pääsiäisviikkoa ja sen viettäminen on monille suomalaisille tärkeä hengellinen hetki.<br><br>

          <b>Perinteet:</b><br>
          <b>Kirkolliset jumalanpalvelukset:</b> Tänä päivänä suomalaiset käyvät kirkossa muistamassa Jeesuksen ristinkuolemaa. Se on tärkeä hetki rukoukselle ja pohdinnalle, ja monissa kirkoissa pidetään erityisiä jumalanpalveluksia. <br>
          <b>Juhla-ajan hiljaisuus:</b> Pitkäperjantai on Suomessa yhdistetty rauhalliseen ja mietiskelevään aikaan. Tänä päivänä ei ole suuria juhlia, ja monet liikkeet ja virastot ovat suljettuina. Se on levon ja mietiskelyn aikaa. <br>
          <b>Kalalla ruokailu:</b> Perinteisesti Pitkäperjantaina syödään kalaa, sillä se on paastopäivä kristityille. Suomessa voi nähdä perinteisiä kalasruokia, kuten paistettua kalaa ja perunaa, jotka noudattavat paaston perinteitä. <br>
          <b>Perhesanomat:</b> Tänä päivänä suomalaiset kokoontuvat usein perheen kesken, nauttimaan rauhallisesta ja hiljaisesta päivästä. Monet perinteet siirtyvät sukupolvelta toiselle, luoden erityistä tunnelmaa. <br>`,
      image: "img/pitkaperjantai.jpg",
    },

    [`${easterSunday.getDate().toString().padStart(2, "0")}.${(
      easterSunday.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${year}`]: {
      name: "Pääsiäispäivä",
      description: `<b>Pääsiäinen</b> on Suomessa tärkeä kristillinen juhla, joka juhlistaa Jeesuksen ylösnousemusta...`,
      image: "img/paasiaispaiva.jpg",
    },

    [`${toinenPaasiaispaiva.getDate().toString().padStart(2, "0")}.${(
      toinenPaasiaispaiva.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${year}`]: {
      name: "Toinen pääsiäispäivä",
      description: `<b>Toinen pääsiäispäivä</b> on Suomessa pääsiäisjuhlan toinen virallinen juhlapäivä...`,
      image: "img/toinen_paasiaispaiva.jpg",
    },
  };

  // 🔵 Функция для обновления информации при выборе даты
  function updateHolidayInfo(selectedDate) {
    const holiday = holidays[selectedDate];

    if (holiday) {
      document.getElementById("selected-holiday-title").innerText =
        holiday.name;
      document.getElementById("selected-holiday-description").innerHTML =
        holiday.description;
      document.getElementById("selected-holiday-image").src = holiday.image;
      document.getElementById("selected-holiday-image").style.display = "block";

      if (holiday.video) {
        document.getElementById("holiday-video").src = holiday.video;
        document.getElementById("holiday-video").classList.remove("d-none");
      } else {
        document.getElementById("holiday-video").classList.add("d-none");
      }
    } else {
      document.getElementById("selected-holiday-title").innerText = "Ei juhla.";
      document.getElementById("selected-holiday-description").innerText =
        "Tällä päivämäärällä ei ole juhlia.";
      document.getElementById("selected-holiday-image").src = "img/juhlaNO.jpg";
      document.getElementById("holiday-video").classList.add("d-none");
    }
  }

  // 🔵 Автоматически загружаем информацию для текущей даты
  const todayFormatted = today.toLocaleDateString("fi-FI");
  updateHolidayInfo(todayFormatted);

  // 🔵 Обработчик для выбора даты
  document
    .getElementById("date-picker")
    .addEventListener("change", function () {
      const selectedDate = this.value.split("-").reverse().join(".");
      updateHolidayInfo(selectedDate);
    });
});
