import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Animal } from './models/animal.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { CreateAnimalComponent } from './components/create-animal/create-animal.component';
import { AnimalEventType } from './enums/animal-event-type.enum copy';
import { AnimalEventService } from './services/animal-events.service';
import { AnimalService } from './services/animal.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAnimalService: jasmine.SpyObj<AnimalService>;
  let mockAnimalEventService: jasmine.SpyObj<AnimalEventService>;

  beforeEach(async () => {
    mockAnimalService = jasmine.createSpyObj('AnimalService', ['getAnimals']);
    mockAnimalService.getAnimals.and.returnValue(of([]));
    mockAnimalEventService = jasmine.createSpyObj('AnimalEventService', [
      'listener',
      'emit',
    ]);
    mockAnimalEventService.listener.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
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
        AppComponent,
        AnimalListComponent,
        CreateAnimalComponent,
      ],
      providers: [
        provideAnimations(),
        {
          provide: AnimalService,
          useValue: mockAnimalService,
        },
        {
          provide: AnimalEventService,
          useValue: mockAnimalEventService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should retrieve animals on init', () => {
    // expect(component.loading).toBeTrue();
    // expect(fixture.nativeElement.querySelector('mat-spinner')).toBeTruthy();

    const animals: Animal[] = [
      { id: '7f6d17c2-23b5-4171-8972-11a55a469645', name: 'Fido' },
      { id: '7f6d17c2-23b5-4171-8972-11a55a469645', name: 'Luna' },
    ];
    mockAnimalService.getAnimals.and.returnValue(of(animals));

    mockAnimalEventService.listener().subscribe(() => {
      fixture.detectChanges();
    });

    mockAnimalEventService.emit(AnimalEventType.Created); // Simulate animal creation event

    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeFalsy();
    expect(component.animals).toEqual(animals);
  });

  it('should update animal list on successful retrieval', () => {
    const animals: Animal[] = [
      { id: '7f6d17c2-23b5-4171-8972-11a55a469645', name: 'Charlie' },
      { id: '7f6d17c2-23b5-4171-8972-11a55a469645', name: 'Bella' },
    ];
    mockAnimalService.getAnimals.and.returnValue(of(animals)); // Mock successful retrieval

    component.retrieveAnimals();

    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeFalsy();
    expect(component.animals).toEqual(animals);
  });
});
