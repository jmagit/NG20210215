import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { LoggerService } from 'src/aubay-core';
import { NotificationService, NotificationType } from '../common-services';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit, OnDestroy {
  private nombre: string = 'mundo';
  listado = [
      {id: 1, nombre: 'Madrid', pais: '', superficie: 0},
      {id: 2, nombre: 'BARCELONA', pais: '', superficie: 0},
      {id: 3, nombre: 'bilbao', pais: '', superficie: 0},
      {id: 4, nombre: 'A coruñA', pais: '', superficie: 0},
    ];
  elemento = {id: null, nombre: '', pais: '', superficie: 0};
  idProvincia = 2;

  resultado: string = null;
  visible = true;
  estetica = { importante: true, error: false, urgente: true };
  fontSize = 24;
  modo = 'add';
  recibido: any[] = [];

  private suscriptor: Unsubscribable;

  constructor(public vm: NotificationService, private http: HttpClient, private out: LoggerService) { }

  public get Nombre(): string { return this.nombre; }
  public set Nombre(valor: string)  {
    if (this.nombre === valor) { return; }
    this.nombre = valor;
  }

  public saluda(): void {
    this.resultado = `Hola ${this.nombre}.`;
  }
  public despide(): void {
    this.resultado = `Adios ${this.nombre}.`;
  }
  public di(algo: string): void {
    this.resultado = `Dice ${algo}.`;
  }

  public cambia(): void {
    this.visible = !this.visible;
    this.estetica.importante = !this.estetica.importante;
    this.estetica.error = !this.estetica.error;
  }
  public cargar(): void {
    this.listado = JSON.parse('[ { "id": 1, "nombre": "Madrid" }, { "id": 2, "nombre": "BARCELONAaaa" }, { "id": 3, "nombre": "bilbaosss" }, { "id": 4, "nombre": "A coruñAsss" } ]');
  }
  public selecciona(indice: number): void {
    this.elemento =  this.listado[indice];
    this.modo = 'edit';
  }

  calcula(a: any, b: any): number { return a + b; }

  add(provincia: string): void {
    const id = this.listado.length === 0 ? 1 : (this.listado[this.listado.length - 1].id + 1);
    this.listado.push({id, nombre: provincia, pais: '', superficie: 0});
    this.idProvincia = id;
  }

  ngOnInit(): void {
    this.suscriptor = this.vm.Notificacion.subscribe(n => {
      // if (n.Type !== NotificationType.error) { return; }
      // window.alert(`Suscripcion: ${n.Message}`);
      // this.vm.remove(this.vm.Listado.length - 1);
    });
  }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }

  enviar(): void {
    alert(JSON.stringify(this.elemento));
  }

  remoto() {
    this.http.get<any[]>('http://localhost:4321/api/libros')
      .subscribe(
        datos => this.recibido = datos,
        error => this.vm.add(error.message)
      );
  }
}
