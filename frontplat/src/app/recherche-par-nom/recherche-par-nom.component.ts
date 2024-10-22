import { Component, OnInit } from '@angular/core';
import { Plat } from '../model/plat.model';
import { PlatService } from '../services/plat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  templateUrl: './recherche-par-nom.component.html',
  imports: [FormsModule, CommonModule],
  styles: []
})
export class RechercheParNomComponent implements OnInit {
  
  searchTerm: string = '';
  plats!: Plat[];
  allPlats!: Plat[]; // Store the original list for filtering

  constructor(private platService: PlatService) {}

  ngOnInit(): void {
    this.platService.listePlats().subscribe(p => {
      console.log(p);
      this.plats = p;
      this.allPlats = p; // Store the full list for filtering
    });
  }

  onKeyUp(filterText: string) {
    if (!filterText) {
      // If no text, reset to original list
      this.plats = [...this.allPlats];
      return;
    }
    
    // Filter plats based on the search term
    this.plats = this.allPlats.filter(item =>
      item.nomPlat?.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
