import "./DemandeModal.css";

export default function DemandeModal({ demande, onClose }) {
  // Ici, tu affiches tous les détails de la demande + zone d’avis/validation selon le rôle
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Détail de la demande</h3>
        <p><b>Nom :</b> {demande.nom}</p>
        <p><b>Prénom :</b> {demande.prenom}</p>
        <p><b>Stage :</b> {demande.stage}</p>
        <p><b>Date :</b> {demande.dateDemande}</p>
        <p><b>Statut :</b> {demande.statut}</p>
        {/* Affiche ici les champs d’avis/validation si responsable/directeur */}
        <div className="modal-actions">
          <button onClick={onClose}>Fermer</button>
          {/* Ajoute ici un bouton "Donner un avis" ou "Valider" selon le rôle */}
        </div>
      </div>
    </div>
  );
}
