import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonneService } from '../personne.service';

@Component({
  selector: 'app-update-personne',
  templateUrl: './update-personne.component.html',
  styleUrls: ['./update-personne.component.css']
})
export class UpdatePersonneComponent implements OnInit {
  personne: any = []; // Tableau pour stocker les informations sur la personne (non utilisé dans ce composant)
  updatePersonneFrom: FormGroup; // Formulaire réactif pour mettre à jour les détails de la personne

  ngOnInit() {
    this.updateForm(); // Appeler la fonction pour initialiser le formulaire à la création du composant
  }

  constructor(
    private actRoute: ActivatedRoute, // ActivatedRoute pour obtenir les paramètres de l'URL
    public personneService: PersonneService, // Service pour la gestion des personnes
    public fb: FormBuilder, // Service FormBuilder pour créer le formulaire réactif
    private ngZone: NgZone, // NgZone pour gérer les zones de détection de changement
    private router: Router // Router pour la navigation
  ) {
    // Récupérer l'ID de la personne à partir des paramètres d'URL et utiliser le service pour obtenir les détails de cette personne
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.personneService.getPersonne(id).subscribe((data) => {
      // Créer le formulaire réactif avec les détails de la personne récupérés du service
      this.updatePersonneFrom = this.fb.group({
        id: [data.Id], // Champ caché pour stocker l'ID de la personne
        firstName: [data.firstName], // Champ pour afficher/mettre à jour le prénom de la personne
        lastName: [data.lastName], // Champ pour afficher/mettre à jour le nom de la personne
        address: [data.address], // Champ pour afficher/mettre à jour l'adresse de la personne
        birthDay: [data.birthDay], // Champ pour afficher/mettre à jour la date de naissance de la personne
        phone: [data.phone] // Champ pour afficher/mettre à jour le numéro de téléphone de la personne
      });
    });
  }

  updateForm() {
    // Fonction pour initialiser le formulaire réactif
    this.updatePersonneFrom = this.fb.group({
      Id: null, // Champ caché pour stocker l'ID de la personne (sera rempli lors de la récupération des détails de la personne)
      firstName: [''], // Champ pour le prénom de la personne
      lastName: [''], // Champ pour le nom de la personne
      address: [''], // Champ pour l'adresse de la personne
      birthDay: [''], // Champ pour la date de naissance de la personne
      phone: [''] // Champ pour le numéro de téléphone de la personne
    });
  }

  submitForm() {
    // Fonction pour soumettre le formulaire lorsqu'il est rempli pour mettre à jour les détails de la personne
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.personneService.updatePersonne(Number(id), this.updatePersonneFrom.value).subscribe((res) => {
      this.ngZone.run(() => this.router.navigateByUrl('/')); // Naviguer vers la page d'accueil après la mise à jour
    });
  }
}
