// Liste des consulats (à l'intérieur et à l'extérieur)
const consulats = [
    {
        nom: "Consulat de France",
        adresse: "Rue de la Paix, Bamako",
        contact: "+223 20 22 33 44",
        drapeau: "https://flagcdn.com/w40/fr.png",
        maps: "https://maps.google.com?q=Rue+de+la+Paix,+Bamako",
        lieu: "mali"
    },
    {
        nom: "Consulat du Mali en France",
        adresse: "53 Rue Hoche, 93170 Bagnolet, France",
        contact: "+33 1 41 58 38 00",
        drapeau: "https://flagcdn.com/w40/mali.png",
        maps: "https://maps.google.com?q=53+Rue+Hoche,+Bagnolet",
        lieu: "exterieur"
    }
        {
        nom: "Consulat du Mali en Algérie",
        adresse: "Tamanrasset",
        contact: "(+213) 29 34 15 78",
        drapeau: "https://flagcdn.com/w40/mali.png",
        maps: "https://maps.google.com?q=53+Rue+Hoche,+Bagnolet",
        lieu: "exterieur"
    }
    // Ajoutez d'autres consulats ici
];

// Fonction pour afficher les consulats en fonction du lieu
function afficherConsulats(lieu) {
    const container = document.getElementById("consulats-container");

    if (!container) {
        console.error("L'élément #consulats-container est introuvable.");
        return;
    }

    container.innerHTML = ""; // Vide l'affichage

    const consulatsFiltres = consulats.filter(consulat => consulat.lieu === lieu);

    if (consulatsFiltres.length === 0) {
        container.innerHTML = "<p>Aucun consulat trouvé pour cet emplacement.</p>";
        return;
    }

    consulatsFiltres.forEach(consulat => {
        const card = document.createElement("div");
        card.classList.add("consulat-card");

        card.innerHTML = `
            <img src="${consulat.drapeau}" alt="${consulat.nom}">
            <h3>${consulat.nom}</h3>
            <p><strong>Adresse :</strong> ${consulat.adresse}</p>
            <p><strong>Contact :</strong> <a href="tel:${consulat.contact}">${consulat.contact}</a></p>
            <button onclick="window.open('${consulat.maps}', '_blank')">Voir sur la carte</button>
        `;

        container.appendChild(card);
    });
}

// Fonction pour gérer le choix du lieu
function choisirLieu(lieu) {
    afficherConsulats(lieu);
}
