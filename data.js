let ambassadesActuelles = [];
let consulatsActuels = [];

function choisirLieu(lieu, type) {
    if (type === "ambassade") {
        ambassadesActuelles = (lieu === 'mali') ? ambassades.mali : ambassades.exterieur;
        afficherAmbassades(ambassadesActuelles, "ambassades-container");
    } else {
        consulatsActuels = (lieu === 'mali') ? consulats.mali : consulats.exterieur;
        afficherConsulats(consulatsActuels, "consulats-container");
    }
}

function afficherAmbassades(liste, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (liste.length === 0) {
        container.innerHTML = "<p>Aucune ambassade trouvée.</p>";
        return;
    }

    liste.forEach(ambassade => {
        const card = document.createElement("div");
        card.className = "ambassade-card";

        let drapeaux = (ambassade.drapeau_mali && ambassade.drapeau_pays) ? 
            `<img src="${ambassade.drapeau_mali}" alt="Drapeau du Mali">
             <img src="${ambassade.drapeau_pays}" alt="Drapeau du pays d'accueil">` : 
            `<img src="${ambassade.drapeau}" alt="Drapeau">`;

        card.innerHTML = `
            <div class="drapeaux">${drapeaux}</div>
            <h3>${ambassade.nom}</h3>
            <p>${ambassade.adresse}</p>
            <p><strong>Contact :</strong> <a href="tel:${ambassade.contact}">${ambassade.contact}</a></p>
            <button onclick="window.open('${ambassade.maps}', '_blank')">Se rendre</button>
            <button class="contact-btn" onclick="location.href='tel:${ambassade.contact}'">Contact</button>
        `;

        container.appendChild(card);
    });
}

function afficherConsulats(liste, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (liste.length === 0) {
        container.innerHTML = "<p>Aucun consulat trouvé.</p>";
        return;
    }

    liste.forEach(consulat => {
        const card = document.createElement("div");
        card.className = "consulat-card";

        let drapeaux = (consulat.drapeau_mali && consulat.drapeau_pays) ? 
            `<img src="${consulat.drapeau_mali}" alt="Drapeau du Mali">
             <img src="${consulat.drapeau_pays}" alt="Drapeau du pays d'accueil">` : 
            `<img src="${consulat.drapeau}" alt="Drapeau">`;

        card.innerHTML = `
            <div class="drapeaux">${drapeaux}</div>
            <h3>${consulat.nom}</h3>
            <p>${consulat.adresse}</p>
            <p><strong>Contact :</strong> <a href="tel:${consulat.contact}">${consulat.contact}</a></p>
            <button onclick="window.open('${consulat.maps}', '_blank')">Se rendre</button>
            <button class="contact-btn" onclick="location.href='tel:${consulat.contact}'">Contact</button>
        `;

        container.appendChild(card);
    });
}

function filtrerAmbassades() {
    const searchText = document.getElementById("searchBarAmbassades").value.toLowerCase();
    const resultats = ambassadesActuelles.filter(ambassade => 
        ambassade.nom.toLowerCase().includes(searchText) ||
        ambassade.adresse.toLowerCase().includes(searchText)
    );
    afficherAmbassades(resultats, "ambassades-container");
}

function filtrerConsulats() {
    const searchText = document.getElementById("searchBarConsulats").value.toLowerCase();
    const resultats = consulatsActuels.filter(consulat => 
        consulat.nom.toLowerCase().includes(searchText) ||
        consulat.adresse.toLowerCase().includes(searchText)
    );
    afficherConsulats(resultats, "consulats-container");
}
