import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor(private logger: LoggingService, private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    this.logger.debug('HTTP GET /animals');
    return this.http.get<Animal[]>(`${environment.hostApiUrl}animals`).pipe(
      catchError((err: HttpErrorResponse) => {
        this.logger.error(JSON.stringify(err));
        if (err.status === 0) {
          return throwError(() => 'Unrecognized error, please refresh.');
        }
        return throwError(() => err.message);
      })
    );
  }

  addAnimal(name: string): Observable<Animal> {
    this.logger.debug('HTTP POST /animals');

    const newAnimal = { name };
    return this.http
      .post<Animal>(`${environment.hostApiUrl}animals`, newAnimal)
      .pipe(
        catchError((error) => {
          if (error.status === 409) {
            return throwError(() => error.error || 'Conflict adding animal');
          } else if (error.status === 0) {
            return throwError(() => 'Unrecognized error, please refresh.');
          } else {
            return throwError(() => error);
          }
        })
      );
  }

  removeAnimal(id: string): Observable<Animal> {
    this.logger.debug(`HTTP DELETE /animals/${name}`);
    return this.http.delete<Animal>(`${environment.hostApiUrl}animals/${id}`);
  }
}
