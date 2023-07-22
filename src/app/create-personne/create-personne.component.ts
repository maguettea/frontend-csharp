import { Component, OnInit, NgZone } from '@angular/core';
import { PersonneService } from '../personne.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-personne',
  templateUrl: './create-personne.component.html',
  styleUrls: ['./create-personne.component.css']
})
export class CreatePersonneComponent implements OnInit {
  personneForm: FormGroup; // Formulaire réactif pour la création de personne
  personne: any = []; // Tableau pour stocker les informations sur la personne (pas utilisé dans ce composant)

  ngOnInit(): void {
    this.addPersonne(); // Appeler la fonction pour initialiser le formulaire à la création du composant
  }

  constructor(
    public fb: FormBuilder, // Service FormBuilder pour créer le formulaire réactif
    private ngZone: NgZone, // NgZone pour gérer les zones de détection de changement
    private router: Router, // Router pour la navigation
    public personneService: PersonneService // Service pour la gestion des personnes
  ) {}

  addPersonne() {
    // Fonction pour créer le formulaire réactif
    this.personneForm = this.fb.group({
      firstName: [''], // Champ pour le prénom de la personne
      lastName: [''], // Champ pour le nom de la personne
      address: [''], // Champ pour l'adresse de la personne
      birthDay: [''], // Champ pour la date de naissance de la personne
      phone: [''], // Champ pour le numéro de téléphone de la personne
    });
  }

  submitForm() {
    // Fonction pour soumettre le formulaire lorsqu'il est rempli
    this.personneService.createPersonne(this.personneForm.value).subscribe((res) => {
      console.log('Infos ajoutées');
      alert("Infos Ajoutées"); // Afficher une alerte pour indiquer que les informations ont été ajoutées avec succès
      this.resetForm(); // Réinitialiser le formulaire après l'ajout
      this.ngZone.run(() => this.router.navigateByUrl('/personnes')); // Naviguer vers la page d'accueil après l'ajout
    });
  }

  resetForm() {
    // Fonction pour réinitialiser le formulaire
    this.personneForm.reset(); // Réinitialiser les valeurs du formulaire à leur état initial
  }
}
