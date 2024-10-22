import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterModule } from './search-filter.module';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, NgFor, FormsModule, HttpClientModule,SearchFilterModule], // Add AppRoutingModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
})
export class AppComponent {
  title = 'frontplat';


  constructor (public authService: AuthService) {}

}
