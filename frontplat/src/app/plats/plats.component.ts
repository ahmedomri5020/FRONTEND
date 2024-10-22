import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';  // Import NgFor from @angular/common
import { Plat } from '../model/plat.model';
import { PlatService } from '../services/plat.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-plats',
  standalone: true, 
  imports: [NgFor, FormsModule,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './plats.component.html'
})
export class PlatsComponent implements OnInit {

  plats? : Plat[]; 
  constructor(private platService: PlatService,public AuthService:AuthService)  {
    //this.plats=[];
  }

  ngOnInit(): void {
    this.chargerPlats();
  }
  chargerPlats(){
    this.platService.listePlats().subscribe(plats => {
      console.log(plats);
      this.plats = plats;
    });
  }


  supprimerPlat(p: Plat) {
  let conf = confirm("Etes-vous sûr ?");
   if (conf && p.idPlat !== undefined)
    this.platService.supprimerPlat(p.idPlat).subscribe(() => {
      console.log("Plat supprimé");
      this.chargerPlats();
    })
  }


}
