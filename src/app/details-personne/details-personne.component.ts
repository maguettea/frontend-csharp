import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonneService } from '../personne.service';

@Component({
  selector: 'app-details-personne',
  templateUrl: './details-personne.component.html',
  styleUrls: ['./details-personne.component.css']
})
export class DetailsPersonneComponent {
  personne: any = []; // Tableau pour stocker les informations sur la personne (non utilisé dans ce composant)
  detailsForm: FormGroup; // Formulaire réactif pour afficher les détails de la personne

  constructor(
    private actRoute: ActivatedRoute, // ActivatedRoute pour obtenir les paramètres de l'URL
    public personneService: PersonneService, // Service pour la gestion des personnes
    public fb: FormBuilder // Service FormBuilder pour créer le formulaire réactif
  ) {
    // Récupérer l'ID de la personne à partir des paramètres d'URL et utiliser le service pour obtenir les détails de cette personne
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.personneService.getPersonne(id).subscribe((data) => {
      // Créer le formulaire réactif avec les détails de la personne récupérés du service
      this.detailsForm = this.fb.group({
        firstName: [data.firstName], // Champ pour afficher le prénom de la personne
        lastName: [data.lastName], // Champ pour afficher le nom de la personne
        address: [data.address], // Champ pour afficher l'adresse de la personne
        birthDay: [data.birthDay], // Champ pour afficher la date de naissance de la personne
        phone: [data.phone] // Champ pour afficher le numéro de téléphone de la personne
      });
    });
  }
}
