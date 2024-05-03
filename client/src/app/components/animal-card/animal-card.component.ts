import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnimalEventService } from '../../services/animal-events.service';
import { AnimalEventType } from '../../enums/animal-event-type.enum copy';

@Component({
  selector: 'animal-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss',
})
export class AnimalCardComponent {
  @Input({ required: true }) animal!: Animal;

  constructor(
    private animalService: AnimalService,
    private eventService: AnimalEventService
  ) {}

  remove() {
    this.animalService.removeAnimal(this.animal.id).subscribe(() => {
      this.eventService.emit(AnimalEventType.Removed);
    });
  }
}
