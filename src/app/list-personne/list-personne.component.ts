import { Component, OnInit } from '@angular/core';
import { Personne } from '../personne';
import { PersonneService } from '../personne.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-personne',
  templateUrl: './list-personne.component.html',
  styleUrls: ['./list-personne.component.css']
})
export class ListPersonneComponent implements OnInit {
  personne: any = []; // Tableau pour stocker la liste de personnes
  page: number = 1; // Numéro de la page actuelle
  count: number = 0; // Nombre total de personnes
  tableSize: number = 3; // Nombre d'éléments à afficher dans le tableau
  tableSizes: any = [2, 4, 6, 8]; // Options pour le nombre d'éléments à afficher dans le tableau

  constructor(
    private personneService: PersonneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPersonnes(); // Appeler la fonction pour récupérer les personnes lors de l'initialisation du composant
  }

  private getPersonnes() {
    // Fonction pour récupérer la liste des personnes depuis le service
    this.personneService.getPersonnesList().subscribe(
      (response) => {
        this.personne = response; // Stocker la réponse (liste de personnes) dans le tableau 'personne'
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onTableDataChange(event: any) {
    // Fonction pour gérer le changement de page dans le tableau
    this.page = event;
    this.getPersonnes(); // Récupérer les personnes pour la nouvelle page
  }

  onTableSizeChange(event: any): void {
    // Fonction pour gérer le changement de taille du tableau (nombre d'éléments par page)
    this.tableSize = event.target.value;
    this.page = 1; // Réinitialiser le numéro de page à 1 lors du changement de taille du tableau
    this.getPersonnes(); // Récupérer les personnes avec la nouvelle taille du tableau
  }

  personneDetails(Id: number) {
    // Fonction pour naviguer vers la page de détails d'une personne avec l'identifiant donné (Id)
    this.router.navigate(['personne-details', Id]);
  }

  updatePersonne(Id: number) {
    // Fonction pour naviguer vers la page de mise à jour d'une personne avec l'identifiant donné (Id)
    this.router.navigate(['update-personne', Id]);
  }

  deletePersonne(data) {
    // Fonction pour supprimer une personne de la liste
    var index = this.personne.map((x) => {
      return x.firstName;
    }).indexOf(data.firstName); // Trouver l'index de la personne à supprimer dans le tableau 'personne'
    return this.personneService.deletePersonne(data.Id).subscribe((res) => {
      this.personne.splice(index, 1); // Supprimer la personne du tableau 'personne'
      console.log('Infos supprimées !');
      alert('Infos supprimées !');
    });
  }
}
