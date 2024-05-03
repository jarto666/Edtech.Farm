import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Animal } from './models/animal.model';
import { AnimalService } from './services/animal.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalEventService } from './services/animal-events.service';
import { CreateAnimalComponent } from './components/create-animal/create-animal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,

    AnimalListComponent,
    CreateAnimalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  animals: Animal[] = [];
  loading: boolean = true;
  error?: string;

  constructor(
    private animalService: AnimalService,
    private eventService: AnimalEventService
  ) {}

  ngOnInit(): void {
    this.eventService.listener().subscribe(() => {
      this.retrieveAnimals();
    });
  }

  retrieveAnimals() {
    this.loading = true;
    this.animalService.getAnimals().subscribe({
      next: (animals) => {
        this.animals = animals;
        this.loading = false;
      },
      error: (error: string) => {
        this.error = error;
        this.loading = false;
      },
    });
  }
}
