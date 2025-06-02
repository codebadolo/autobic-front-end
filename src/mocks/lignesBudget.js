export const budgetList = [
  {
    idBudget: 1,
    departement: "Transports",
    mois: "Juin",
    totalHeuresMainOeuvre: 64,
    totalHeuresCours: 70,
    coutMainOeuvre: 400000,
    coutCours: 2600000,
    totalDepartement: 3000000,
    lignes: [
      {
        idLigne: 1,
        nomParticipant: "BEBA Jean",
        designationStage: "Conception SI",
        nbHeures: 32,
        coutCours: 800000,
        mois: "Juin"
      },
      {
        idLigne: 2,
        nomParticipant: "ILBOUDO Elvis",
        designationStage: "Conception SI",
        nbHeures: 32,
        coutCours: 800000,
        mois: "Juin"
      },
      // ...
    ]
  },
  // ... autres budgets
];
