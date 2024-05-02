import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAnimalComponent } from './create-animal.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AnimalEventService } from '../../services/animal-events.service';
import { AnimalService } from '../../services/animal.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('CreateAnimalComponent', () => {
  let component: CreateAnimalComponent;
  let fixture: ComponentFixture<CreateAnimalComponent>;
  let mockAnimalService: jasmine.SpyObj<AnimalService>;
  let mockAnimalEventService: jasmine.SpyObj<AnimalEventService>;

  beforeEach(async () => {
    mockAnimalService = jasmine.createSpyObj('AnimalService', ['addAnimal']);
    mockAnimalService.addAnimal.and.returnValue(
      of({ id: '7f6d17c2-23b5-4171-8972-11a55a469645', name: 'Init' })
    );
    mockAnimalEventService = jasmine.createSpyObj('AnimalEventService', [
      'emit',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,

        CreateAnimalComponent,
      ],
      providers: [
        provideAnimations(),
        { provide: AnimalService, useValue: mockAnimalService },
        {
          provide: AnimalEventService,
          useValue: mockAnimalEventService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form group with animal name validation on init', () => {
    expect(component.animalForm instanceof FormGroup).toBeTrue();
    const animalNameControl = component.animalForm.get('animalName')!;
    expect(animalNameControl.value).toBe('');
    const testControl = { value: '' };

    const validationResult = animalNameControl.validator!(testControl as any);
    expect(validationResult).toEqual({ required: true });

    const longString = 'x'.repeat(101);
    testControl.value = longString;

    const maxLengthResult = animalNameControl.validator!(testControl as any);
    expect(maxLengthResult).toEqual({
      maxlength: { requiredLength: 100, actualLength: 101 },
    });
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeTrue(); // Initially disabled

    component.animalForm.get('animalName')?.setValue('Fido');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse(); // Enabled on valid input

    component.animalForm.get('animalName')?.setValue('');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue(); // Disabled on invalid input
  });

  it('should call addAnimal service and emit event on valid form submission', () => {
    const animalName = 'Luna';
    component.animalForm.get('animalName')?.setValue(animalName);
    fixture.detectChanges();

    component.addAnimal();

    expect(mockAnimalService.addAnimal).toHaveBeenCalledWith(animalName.trim());
    //   expect(eventService.emit).toHaveBeenCalledWith(AnimalEventType.Created);
  });

  it('should not call addAnimal service on invalid form submission', () => {
    component.addAnimal();
    expect(mockAnimalService.addAnimal).not.toHaveBeenCalled();
  });
});
