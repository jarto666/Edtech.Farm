import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimalEventType } from '../enums/animal-event-type.enum copy';

@Injectable({
  providedIn: 'root',
})
export class AnimalEventService {
  private animalsUpdatedEvent = new BehaviorSubject<
    AnimalEventType | undefined
  >(undefined);

  emit(ev: AnimalEventType) {
    this.animalsUpdatedEvent.next(ev);
  }

  listener(): Observable<AnimalEventType | undefined> {
    return this.animalsUpdatedEvent.asObservable();
  }
}
