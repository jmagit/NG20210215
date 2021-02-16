import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/aubay-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hola Mundo';

  constructor(private log: LoggerService) {

  }

  ngOnInit(): void {
    // this.log.error('Esto es un error');
    // this.log.warn('Esto es un warn');
    // this.log.info('Esto es un info');
    // this.log.log('Esto es un log');
  }
}
