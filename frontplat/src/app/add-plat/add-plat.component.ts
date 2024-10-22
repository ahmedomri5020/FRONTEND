import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlatService } from '../services/plat.service';
import { Plat } from '../model/plat.model';
import { FormsModule } from '@angular/forms';
import { Pays } from '../model/pays.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-plat.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class AddPlatComponent implements OnInit {
  newPlat = new Plat();
  pays!: Pays[];
  newIdPays!: number;

  constructor(private platService: PlatService, private router: Router) {}

  ngOnInit(): void {
    this.platService.listePays().subscribe((pays) => {
      this.pays = pays._embedded.pays;
      console.log(pays);
    });
  }

  addPlat() {
    this.newPlat.pays = this.pays.find((pays) => pays.idPays == this.newIdPays)!;
    this.platService.ajouterPlat(this.newPlat).subscribe((plat) => {
      console.log(plat);
      this.router.navigate(['plats']);
    });
  }
}
