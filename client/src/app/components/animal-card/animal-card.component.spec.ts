import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalCardComponent } from './animal-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AnimalEventService } from '../../services/animal-events.service';
import { AnimalService } from '../../services/animal.service';
import { AnimalEventType } from '../../enums/animal-event-type.enum copy';
import { of } from 'rxjs';

describe('AnimalCardComponent', () => {
  let component: AnimalCardComponent;
  let fixture: ComponentFixture<AnimalCardComponent>;
  let animalService: AnimalService;
  let eventService: AnimalEventService;

  beforeEach(async () => {
    const animalServiceSpy = jasmine.createSpyObj('AnimalService', [
      'removeAnimal',
    ]);
    animalServiceSpy.removeAnimal.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        AnimalCardComponent,
      ],
      providers: [
        {
          provide: AnimalService,
          useValue: animalServiceSpy,
        },
        {
          provide: AnimalEventService,
          useValue: jasmine.createSpyObj('AnimalEventService', ['emit']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCardComponent);
    component = fixture.componentInstance;
    component.animal = {
      id: '7f6d17c2-23b5-4171-8972-11a55a469645',
      name: 'Init',
    };
    animalService = TestBed.inject(AnimalService);
    eventService = TestBed.inject(AnimalEventService);
    fixture.detectChanges();
  });

  it('should display animal name', () => {
    const nameElement = fixture.nativeElement.querySelector('.animal-name');
    component.animal = {
      id: '7f6d17c2-23b5-4171-8972-11a55a469645',
      name: 'Fido',
    };
    fixture.detectChanges();
    expect(nameElement.textContent).toBe('Fido');
  });

  it('should call removeAnimal on service and emit removed event', () => {
    const animalId = '7f6d17c2-23b5-4171-8972-11a55a469645';
    component.animal = {
      id: '7f6d17c2-23b5-4171-8972-11a55a469645',
      name: 'Luna',
    };
    component.remove();

    expect(animalService.removeAnimal).toHaveBeenCalledWith(animalId);
    expect(eventService.emit).toHaveBeenCalledWith(AnimalEventType.Removed);
  });
});
