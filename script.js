let chartInstance = null; // Variable pour stocker l'instance du graphique

function calculerAide() {
  const profil = document.getElementById("profil").value;
  const gainClasses = parseInt(document.getElementById("gainClasses").value);
  const coutHT = parseFloat(document.getElementById("coutHT").value);
  const sortiePasseoir = document.getElementById("sortiePasseoir").checked;

  if (isNaN(coutHT) || coutHT <= 0) {
    alert("Veuillez entrer un coût valide.");
    return;
  }

  let plafondDepenses;
  if (gainClasses === 2) {
    plafondDepenses = 40000;
  } else if (gainClasses === 3) {
    plafondDepenses = 55000;
  } else {
    plafondDepenses = 70000;
  }

  let tauxFinancement;
  switch (profil) {
    case "bleu":
      tauxFinancement = 0.8;
      break;
    case "jaune":
      tauxFinancement = 0.6;
      break;
    case "violet":
      tauxFinancement = gainClasses >= 3 ? 0.5 : 0.45;
      break;
    case "rose":
      tauxFinancement = gainClasses >= 3 ? 0.35 : 0.3;
      break;
  }

  if (sortiePasseoir) {
    tauxFinancement += 0.1;
  }

  const coutTTC = coutHT * 1.055;

  // Taux d'écrêtement 2024
  let tauxEcretement;
  switch (profil) {
    case "bleu":
      tauxEcretement = 1.0;
      break;
    case "jaune":
      tauxEcretement = 0.8;
      break;
    case "violet":
      tauxEcretement = 0.6;
      break;
    case "rose":
      tauxEcretement = 0.4;
      break;
  }

  // Taux d'écrêtement 2025
  let tauxEcretement2025;
  switch (profil) {
    case "bleu":
      tauxEcretement2025 = 1.0;
      break;
    case "jaune":
      tauxEcretement2025 = 0.8;
      break;
    case "violet":
      tauxEcretement2025 = 0.8; // Augmenté de 60% à 80%
      break;
    case "rose":
      tauxEcretement2025 = 0.5; // Augmenté de 40% à 50%
      break;
  }

  const primeMaPrimeRenov = tauxFinancement * coutHT;
  const plafondMaPrimeRenov = tauxFinancement * plafondDepenses;
  const ecretement = tauxEcretement * coutTTC;
  const ecretement2025 = tauxEcretement2025 * coutTTC;

  const montantAccorde = Math.min(
    primeMaPrimeRenov,
    plafondMaPrimeRenov,
    ecretement
  );

  const montantAccorde2025 = Math.min(
    primeMaPrimeRenov,
    plafondMaPrimeRenov,
    ecretement2025
  );

  document.getElementById("resultat").innerHTML = `
        <p>Prime MaPrimeRénov': ${primeMaPrimeRenov.toFixed(2)} €</p>
        <p>Plafond MaPrimeRénov': ${plafondMaPrimeRenov.toFixed(2)} €</p>
        <p>Écrêtement (2024): ${ecretement.toFixed(2)} €</p>
        <p class="highlight">Montant accordé (2024): ${montantAccorde.toFixed(
          2
        )} €</p>
        <hr>
        <p>Écrêtement (2025): ${ecretement2025.toFixed(2)} €</p>
        <p class="highlight">Montant accordé (2025): ${montantAccorde2025.toFixed(
          2
        )} €</p>
    `;

  // Si un graphique existe déjà, le détruire avant d'en créer un nouveau
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Création du nouveau graphique
  const ctx = document.getElementById("myChart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Aide accordée 2024", "Reste à charge"],
      datasets: [
        {
          data: [montantAccorde, coutTTC - montantAccorde],
          backgroundColor: ["#4CAF50", "#FF6384"],
        },
      ],
    },
  });
}
