import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Hola Mundo';

  // constructor(private log: LoggerService) {

  // }

  ngOnInit(): void {
    // this.log.error('Esto es un error');
    // this.log.warn('Esto es un warn');
    // this.log.info('Esto es un info');
    // this.log.log('Esto es un log');
  }
}
