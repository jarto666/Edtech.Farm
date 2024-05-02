import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LogLevel } from '../enums/log-level.enum';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private logLevel = environment.logLevel;

  log(message: string, level: LogLevel) {
    if (level <= this.logLevel) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(message);
          break;
        case LogLevel.WARN:
          console.warn(message);
          break;
        case LogLevel.INFO:
          console.info(message);
          break;
        case LogLevel.DEBUG:
          console.debug(message);
          break;
      }
    }
  }

  error(message: string) {
    this.log(message, LogLevel.ERROR);
  }

  warn(message: string) {
    this.log(message, LogLevel.WARN);
  }

  info(message: string) {
    this.log(message, LogLevel.INFO);
  }

  debug(message: string) {
    this.log(message, LogLevel.DEBUG);
  }
}
