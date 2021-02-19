import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from '../common-services';

export abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiURL;
  constructor(protected http: HttpClient, entidad: string,
              protected option = {},
              protected notify?: NotificationService) {
    this.baseUrl += entidad;
  }
  query(): Observable<T> {
    const rslt = this.http.get<T>(this.baseUrl, this.option);
    if (this.notify) {
      rslt.pipe(
        retry(3),
        catchError((err, caught) => {
          this.notify?.add(err.message);
          return caught;
          // return throwError(err.message);
        })
      );
    }
    return rslt;
  }
  get(id: K): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id, this.option);
  }
  add(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, this.option);
  }
  change(id: K, item: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + id, item, this.option);
  }
  remove(id: K): Observable<T> {
    return this.http.delete<T>(this.baseUrl + '/' + id, this.option);
  }
}

