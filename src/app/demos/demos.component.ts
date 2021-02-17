import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from '../common-services';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit, OnDestroy {
  private nombre: string = 'mundo';
  listado = [
    {id: 1, nombre: 'Madrid'},
    {id: 2, nombre: 'BARCELONA'},
    {id: 3, nombre: 'bilbao'},
    {id: 4, nombre: 'A coruñA'},
  ];
  idProvincia = 2;

  resultado: string = null;
  visible = true;
  estetica = { importante: true, error: false, urgente: true };
  fontSize = 14;

  private suscriptor: Unsubscribable;

  constructor(public vm: NotificationService) { }

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

  calcula(a: any, b: any): number { return a + b; }

  add(provincia: string): void {
    const id = this.listado.length === 0 ? 1 : (this.listado[this.listado.length - 1].id + 1);
    this.listado.push({id, nombre: provincia});
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

}