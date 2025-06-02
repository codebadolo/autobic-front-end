export const facturesList = [
  {
    idFacture: 1522,
    dateEmission: "2024-06-30",
    organisme: "ILBOUDO SA",
    typeEnvoi: "PAR_SESSION",
    montantTotal: 2300000,
    details: "Facture pour sessions de juin",
    cours: [
      { reference: "K128", date: "15/06/2024", participants: 4, cout: 1600000 },
      { reference: "K327", date: "15/05/2024", participants: 2, cout: 700000 }
    ]
  },
  {
    idFacture: 1523,
    dateEmission: "2024-07-30",
    organisme: "ESTA SA",
    typeEnvoi: "PAR_MOIS",
    montantTotal: 1200000,
    details: "Facture pour sessions de juillet",
    cours: [
      { reference: "S327", date: "24/07/2024", participants: 2, cout: 1200000 }
    ]
  }
  // ... Ajoute d'autres factures
];
