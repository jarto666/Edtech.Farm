import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'animal-list',
  standalone: true,
  imports: [CommonModule, AnimalCardComponent],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss',
})
export class AnimalListComponent {
  @Input({ required: true })
  animals: Animal[] = [];
}
