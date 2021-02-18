import { Component, OnInit } from '@angular/core';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    {texto: 'Inicio', componete: HomeComponent},
    {texto: 'Demo', componete: DemosComponent},
  ];
  actual = this.menu[0].componete;

  constructor() { }

  ngOnInit(): void {
  }

  cambia(index: number): void {
    this.actual = this.menu[index].componete;
  }
}
