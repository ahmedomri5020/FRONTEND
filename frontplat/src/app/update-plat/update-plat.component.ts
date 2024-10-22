import { Pays } from './../model/pays.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from '../model/plat.model';
import { PlatService } from '../services/plat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-update-plat',
    standalone: true,
    imports: [FormsModule, CommonModule], // Import necessary modules
    templateUrl: './update-plat.component.html',
})
export class UpdatePlatComponent implements OnInit {

  currentPlat = new Plat();
  pays!: Pays[]; // List of pays
  updatedPaysId!: number; // Selected pays ID

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private platService: PlatService) { }

  ngOnInit(): void {
    // Fetch the list of pays
    this.platService.listePays().subscribe(pys => {
      this.pays = pys._embedded.pays;
      console.log('Fetched pays:', pys); // Log fetched pays
    });

    // Fetch the plat to be updated
    this.platService.consulterPlat(this.activatedRoute.snapshot.params['id']).subscribe(pl => {
      this.currentPlat = pl;
      this.updatedPaysId = this.currentPlat.pays.idPays; // Set the current pays ID
      console.log('Current Plat:', this.currentPlat); // Log current plat
    });
  }

  updatePlat() {
  // Update the pays reference in currentPlat
  this.currentPlat.pays = { idPays: this.updatedPaysId } as Pays; // Set pays in currentPlat

  console.log('Updating Plat:', this.currentPlat); // Log the currentPlat before the API call

  this.platService.updatePlat(this.currentPlat).pipe(
    catchError(error => {
      console.error('Update failed', error);
      alert('Failed to update the plat. Please try again.');
      return of(null);
    })
  ).subscribe(plt => {
    if (plt) {
      console.log('Update successful:', plt);
      this.router.navigate(['plats']); // Redirect to the plats list
    } else {
      console.warn('Update returned null or undefined');
    }
  });
    
    
  
  }
}
