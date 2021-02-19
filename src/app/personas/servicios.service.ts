import { Injectable } from '@angular/core';
import { ModoCRUD } from '../base-code/tipos';
import { RESTDAOService } from '../base-code/dao';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/common-services';
import { LoggerService } from 'src/aubay-core';

@Injectable({
  providedIn: 'root'
})
export class PersonasDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'personas', { withCredentials: true });
  }
}

@Injectable()
export class PersonasViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected listURL = '/personas';

  constructor(protected notify: NotificationService, protected out: LoggerService,
              protected dao: PersonasDAOService, protected router: Router) { }

  public get Modo(): ModoCRUD { return this.modo; }
  public get Listado(): Array<any> { return this.listado; }
  public get Elemento(): any { return this.elemento; }

  public list(): void {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
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

@Injectable()
export class PersonasViewModelMockService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected pk = 'id';

  constructor(protected notify: NotificationService, protected out: LoggerService) { }

  public get Modo(): ModoCRUD { return this.modo; }
  public get Listado(): Array<any> { return this.listado; }
  public get Elemento(): any { return this.elemento; }

  public list(): void {
    if (this.listado.length === 0) {
      this.listado = [
        { id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 34 },
        { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 101 },
        { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 50 },
        { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 47 },
      ];
    }
    this.modo = 'list';
  }

  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
      this.modo = 'edit';
    } else {
      this.notify.add('Elemento no encontrado.');
    }
  }
  public view(key: any): void {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.modo = 'view';
    } else {
      this.notify.add('Elemento no encontrado.');
    }
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) { return; }

    // tslint:disable-next-line:triple-equals
    const index = this.listado.findIndex(item => item[this.pk] == key);
    if (index >= 0) {
      this.listado.splice(index, 1);
      this.list();
    } else {
      this.notify.add('Elemento no encontrado.');
    }
  }

  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }
  public send(): void {
    switch (this.modo) {
      case 'add':
        this.listado.push(this.elemento);
        this.cancel();
        break;
      case 'edit':
        // tslint:disable-next-line:triple-equals
        const index = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
        if (index >= 0) {
          this.listado[index] = this.elemento;
          this.cancel();
        } else {
          this.notify.add('Elemento no encontrado.');
        }
        break;
      case 'view':
        break;
    }
  }

}
