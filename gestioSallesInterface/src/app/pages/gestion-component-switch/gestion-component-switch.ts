import { Component } from '@angular/core';
import { SalleListComponent } from '../salles/list/list';
import { BatimentListComponent } from '../batiments/list/list';
import { CommonModule } from '@angular/common';
import { IgxIconComponent } from 'igniteui-angular';
@Component({
  selector: 'app-gestion-component-switch',
  imports: [CommonModule,IgxIconComponent,
BatimentListComponent,SalleListComponent ],
  templateUrl: './gestion-component-switch.html',
  styleUrl: './gestion-component-switch.css',
})
export class GestionComponentSwitch {
   afficherSalles = true;

  switchView(): void {
    this.afficherSalles = !this.afficherSalles;
  }
}
