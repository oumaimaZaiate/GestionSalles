import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { SalleService } from '../../../services/salle';
import { Salle } from '../../../models/salle';
import {CommonModule} from '@angular/common'
import { IGX_GRID_DIRECTIVES, IgxGridComponent } from 'igniteui-angular/grids/grid';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IGX_TOOLTIP_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';
import { IGX_PAGINATOR_DIRECTIVES } from 'igniteui-angular/paginator';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxDialogComponent } from 'igniteui-angular';
import { FormsModule, FormsModule as NgFormsModule } from '@angular/forms';
import { IGX_DIALOG_DIRECTIVES,  } from 'igniteui-angular/dialog';
import { SalleCreateComponent } from '../create/create';
import { SalleEditComponent } from '../edit/edit';
import { Specification } from '../../../models/Specification';
@Component({
  selector: 'app-salle-list',
    imports: [
    CommonModule,
    FormsModule,
    IGX_GRID_DIRECTIVES,
    IGX_PAGINATOR_DIRECTIVES,
    IGX_TOOLTIP_DIRECTIVES,
     IGX_DIALOG_DIRECTIVES, 
    IGX_INPUT_GROUP_DIRECTIVES,
    SalleCreateComponent, 
    IgxIconComponent,
    IgxButtonDirective,
    IgxRippleDirective,
    IgxIconButtonDirective,
    SalleEditComponent,
  ],
  templateUrl: './list.html',
  standalone: true,
})
export class SalleListComponent implements OnInit{
    @ViewChild('grid', { static: false }) grid!: IgxGridComponent;
  @ViewChild('createDialog', { static: true }) createDialog!: IgxDialogComponent;
 @ViewChild('editDialog') editDialog!: IgxDialogComponent;

  selectedSalleId: number | null = null;

  private salleService = inject(SalleService);
private cdr = inject(ChangeDetectorRef);
  
  salles: Salle[] =[];
    searchText = '';

  loadSalles(){
    this.salleService.getSalles().subscribe({
      next: (data) => {
         this.salles = data;
         this.cdr.detectChanges();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  formatSpecifications(specs: Specification[] | null | undefined): string {
  if (!specs || specs.length === 0) {
    return '';
  }

  return specs.map(s => s.nom).join(', ');
}
onSearchChange() {
    this.grid?.findNext(this.searchText); 
    
  } clearSearch() {
    this.searchText = '';
    this.grid?.clearSearch();
  }
openCreateDialog() {
  
    this.createDialog.open();
  }

  onSalleSaved() {
    this.createDialog.close();
    this.loadSalles();
  }

  onCreateCancelled() {
    this.createDialog.close();
  }
 
  deleteSalle(id: number){
    if(confirm("Voulez-vous supprimer cette salle ?")){
    this.salleService.deleteSalle(id).subscribe({
     next: () => { this.loadSalles();},
     error: (err) => {
      console.error(err);
     }
    })
   }
  }
openEditDialog(id: number) {
    this.selectedSalleId = id;
    this.editDialog.open();
  }

  onSalleUpdated() {
    this.editDialog.close();
    this.selectedSalleId = null;
    this.loadSalles();
  }

  onEditCancelled() {
    this.editDialog.close();
    this.selectedSalleId = null;
  }

  ngOnInit() :void {
    this.loadSalles();
  }


}
