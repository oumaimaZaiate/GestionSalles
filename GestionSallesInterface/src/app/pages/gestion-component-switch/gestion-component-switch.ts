import { Component } from '@angular/core';
import { SalleListComponent } from '../salles/list/list';
import { BatimentListComponent } from '../batiments/list/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gestion-component-switch',
  imports: [CommonModule,
BatimentListComponent,SalleListComponent ],
  templateUrl: './gestion-component-switch.html',
})
export class GestionComponentSwitch {
   afficherSalles = true;

  switchView(): void {
    this.afficherSalles = !this.afficherSalles;
  }
}
