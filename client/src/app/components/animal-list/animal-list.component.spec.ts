import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalListComponent } from './animal-list.component';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { Animal } from '../../models/animal.model';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AnimalListComponent, AnimalCardComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display animal cards for each animal in the list and maintain order', () => {
    const animals: Animal[] = [
      { id: '7f6d17c2-23b5-4171-8972-11a55a469645', name: 'Fido' },
      { id: '7f6d17c2-23b5-4171-8972-11a55a469641', name: 'Luna' },
    ];
    component.animals = animals;
    fixture.detectChanges();

    const cardElements = fixture.nativeElement.querySelectorAll(
      'animal-card .animal-name'
    );

    expect(cardElements.length).toBe(animals.length);

    for (let i = 0; i < cardElements.length; i++) {
      expect(cardElements[i].textContent).toBe(animals[i].name);
    }
  });
});
