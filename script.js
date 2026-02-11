let typeSelectionne = ""; // "ambassade" ou "consulat"
let listeActuelle = [];

function choisirType(type) {
    typeSelectionne = type;
    document.getElementById("etape1").classList.add("hidden");
    document.getElementById("etape2").classList.remove("hidden");
}

function choisirLieu(lieu) {
    if (typeSelectionne === "ambassade") {
        listeActuelle = (lieu === 'mali') ? ambassades.mali : ambassades.exterieur;
        document.getElementById("ambassades-container").classList.remove("hidden");
        document.getElementById("consulats-container").classList.add("hidden");
    } else {
        listeActuelle = (lieu === 'mali') ? consulats.mali : consulats.exterieur;
        document.getElementById("consulats-container").classList.remove("hidden");
        document.getElementById("ambassades-container").classList.add("hidden");
    }
    afficher(listeActuelle);
}

function afficher(liste) {
    const container = typeSelectionne === "ambassade" 
        ? document.getElementById("ambassades-container") 
        : document.getElementById("consulats-container");

    container.innerHTML = "<p></p>"; // Message de chargement

    if (liste.length === 0) {
        container.innerHTML = "<p>Aucune correspondance trouvée.</p>";
        return;
    }

    liste.forEach(item => {
        const card = document.createElement("div");
        card.className = typeSelectionne === "ambassade" ? "ambassade-card" : "consulat-card";

        let drapeaux = '';
        if (item.drapeau_mali && item.drapeau_pays) {
            drapeaux = `<img src="${item.drapeau_mali}" alt="Drapeau du Mali">
                        <img src="${item.drapeau_pays}" alt="Drapeau du pays">`;
        } else if (item.drapeau) {
            drapeaux = `<img src="${item.drapeau}" alt="Drapeau">`;
        }

        card.innerHTML = `
            <div class="drapeaux">${drapeaux}</div>
            <h3>${item.nom}</h3>
            <p>${item.adresse}</p>
            <p><strong>Contact :</strong> <a href="tel:${item.contact}">${item.contact}</a></p>
            <button aria-label="Voir sur Google Maps" onclick="window.open('${item.maps}', '_blank')">Se rendre</button>
            <button class="contact-btn" aria-label="Contacter l'institution" onclick="location.href='tel:${item.contact}'">Contact</button>
        `;

        container.appendChild(card);
    });
}

function filtrer() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    const resultats = listeActuelle.filter(item => 
        item.nom.toLowerCase().includes(searchText) ||
        item.adresse.toLowerCase().includes(searchText)
    );
    afficher(resultats);
}
// Afficher/Masquer la flèche selon la position de scroll
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// Scroll fluide vers le haut
scrollTopBtn.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
