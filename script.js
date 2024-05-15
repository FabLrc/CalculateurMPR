function calculerAide() {
  const profil = document.getElementById('profil').value;
  const gainClasses = parseInt(document.getElementById('gainClasses').value);
  const coutHT = parseFloat(document.getElementById('coutHT').value);
  const sortiePasseoir = document.getElementById('sortiePasseoir').checked;

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
      case 'bleu':
          tauxFinancement = 0.80;
          break;
      case 'jaune':
          tauxFinancement = 0.60;
          break;
      case 'violet':
          tauxFinancement = gainClasses >= 3 ? 0.50 : 0.45;
          break;
      case 'rose':
          tauxFinancement = gainClasses >= 3 ? 0.35 : 0.30;
          break;
  }

  if (sortiePasseoir) {
      tauxFinancement += 0.10;
  }

  const coutTTC = coutHT * 1.055;

  let tauxEcretement;
  switch (profil) {
      case 'bleu':
          tauxEcretement = 1.00;
          break;
      case 'jaune':
          tauxEcretement = 0.80;
          break;
      case 'violet':
          tauxEcretement = 0.60;
          break;
      case 'rose':
          tauxEcretement = 0.40;
          break;
  }

  const primeMaPrimeRenov = tauxFinancement * coutHT;
  const plafondMaPrimeRenov = tauxFinancement * plafondDepenses;
  const ecretement = tauxEcretement * coutTTC;

  const montantAccorde = Math.min(primeMaPrimeRenov, plafondMaPrimeRenov, ecretement);

  document.getElementById('resultat').innerHTML = `
      <p>Prime MaPrimeRénov': ${primeMaPrimeRenov.toFixed(2)} €</p>
      <p>Plafond MaPrimeRénov': ${plafondMaPrimeRenov.toFixed(2)} €</p>
      <p>Écrêtement: ${ecretement.toFixed(2)} €</p>
      <p class="highlight">Montant accordé (le plus bas): ${montantAccorde.toFixed(2)} €</p>
  `;
}
