import { Injectable } from '@angular/core';
import { ModoCRUD } from '../base-code/tipos';
import { RESTDAOService } from '../base-code/dao';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggerService } from 'src/aubay-core';
import { NotificationService } from '../common-services';

@Injectable({
  providedIn: 'root'
})
export class BlogDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient, notify: NotificationService) {
    super(http, 'blog', { withCredentials: true }, notify);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BlogViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected listURL = '/blog';

  constructor(protected notify: NotificationService, protected out: LoggerService,
              protected dao: BlogDAOService, protected router: Router) { }

  public get Modo(): ModoCRUD { return this.modo; }
  public get Listado(): Array<any> { return this.listado; }
  public get Elemento(): any { return this.elemento; }

  public list(): void {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      }
      ,
      err => this.notify.add(err.message)
    );
  }

  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => this.notify.add(err.message)
    );
  }
  public view(key: any): void {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.modo = 'view';
      },
      err => this.notify.add(err.message)
    );
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe(
      data => this.list(),
      err => this.notify.add(err.message)
    );
  }

  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.listURL);
  }
  public send(): void {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
        break;
    }
  }

}
