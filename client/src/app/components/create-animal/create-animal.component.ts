import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AnimalService } from '../../services/animal.service';
import { AnimalEventService } from '../../services/animal-events.service';
import { AnimalEventType } from '../../enums/animal-event-type.enum copy';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'create-animal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-animal.component.html',
  styleUrl: './create-animal.component.scss',
})
export class CreateAnimalComponent {
  animalForm!: FormGroup;
  errorMessage?: string;

  ngOnInit() {
    this.animalForm = this.fb.group({
      animalName: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private eventService: AnimalEventService
  ) {}

  showError(error: any) {
    this.errorMessage = error || 'An error occurred while creating the animal.';
  }

  resetErrorMessage() {
    this.errorMessage = undefined;
  }

  addAnimal(): void {
    if (this.animalForm.invalid) {
      return;
    }

    const animalName = this.animalForm.get('animalName')?.value.trim();

    this.animalService.addAnimal(animalName).subscribe(
      () => {
        this.eventService.emit(AnimalEventType.Created);
      },
      (error) => {
        this.showError(error); // Call a method to display the error on UI
      }
    );
  }
}
