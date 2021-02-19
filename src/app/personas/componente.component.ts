import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasViewModelService } from './servicios.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.css']
})
export class PersonasComponent implements OnInit {
  constructor(protected vm: PersonasViewModelService) { }
  public get VM(): PersonasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.list();
  }
}
@Component({
  selector: 'app-personas-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./componente.component.css']
})
export class PersonasListComponent implements OnInit {
  constructor(protected vm: PersonasViewModelService) { }
  public get VM(): PersonasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.list();
  }
}
@Component({
  selector: 'app-personas-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class PersonasAddComponent implements OnInit {
  constructor(protected vm: PersonasViewModelService) { }
  public get VM(): PersonasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.add();
  }
}
@Component({
  selector: 'app-personas-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css']
})
export class PersonasEditComponent implements OnInit, OnDestroy {
  private obs$: any;
  constructor(protected vm: PersonasViewModelService,
    protected route: ActivatedRoute, protected router: Router) { }
  public get VM(): PersonasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = parseInt(params?.get('id') ?? '');
        if (id) {
          this.vm.edit(id);
        } else {
          this.router.navigate(['/404.html']);
        }
      });
  }
  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
@Component({
  selector: 'app-personas-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.css']
})
export class PersonasViewComponent implements OnInit, OnDestroy {
  private obs$: any;
  constructor(protected vm: PersonasViewModelService,
    protected route: ActivatedRoute, protected router: Router) { }
  public get VM(): PersonasViewModelService { return this.vm; }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = parseInt(params?.get('id') ?? '');
        if (id) {
          this.vm.view(id);
        } else {
          this.router.navigate(['/404.html']);
        }
      });
  }
  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
export const PERSONAS_COMPONENTES = [
  PersonasComponent, PersonasListComponent, PersonasAddComponent, PersonasEditComponent,
  PersonasViewComponent,
];
