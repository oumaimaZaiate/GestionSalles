import { ChangeDetectorRef, Component, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Batiment } from '../../../models/batiment';
import { BatimentService } from '../../../services/batiment';
import { IGX_DIALOG_DIRECTIVES, IgxDialogComponent } from 'igniteui-angular/dialog';
import { IGX_TOOLTIP_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxRippleDirective } from 'igniteui-angular/directives';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { BatimentCreateComponent } from '../create/create';
import { BatimentEditComponent } from '../edit/edit';
import { MapComponent } from '../../../components/map/map';
import { IGX_GRID_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_PAGINATOR_DIRECTIVES, IgxGridComponent, IgxGridModule } from 'igniteui-angular';

type SortKey = 'intitule' | 'latitude' | 'longitude';

@Component({
  selector: 'app-batiment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IGX_GRID_DIRECTIVES ,
    IGX_PAGINATOR_DIRECTIVES ,
    IGX_TOOLTIP_DIRECTIVES ,
     IGX_DIALOG_DIRECTIVES , 
    IGX_INPUT_GROUP_DIRECTIVES ,
    IgxIconComponent,
    IgxButtonDirective,
    IgxRippleDirective,
    IgxIconButtonDirective ,
    BatimentCreateComponent,
    BatimentEditComponent,
    MapComponent,
    
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class BatimentListComponent implements OnInit {
  private batimentService = inject(BatimentService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  @ViewChild('createDialog') createDialog!: IgxDialogComponent;
  @ViewChild('editDialog') editDialog!: IgxDialogComponent;
  @ViewChild('confirmDeleteDialog') confirmDeleteDialog!: IgxDialogComponent;
  @ViewChild('mapDialog') mapDialog!: IgxDialogComponent;   
  @ViewChild('grid', { static: false }) grid!: IgxGridComponent;

  selectedBatimentForMap: Batiment | null = null;
  batiments: Batiment[] = [];
  loading = false;
  error = '';
  deleting = false;

  searchText = '';
  sortKey: SortKey = 'intitule';
  sortAsc = true;

  selectedBatimentId: number | null = null;
  batimentToDelete: Batiment | null = null;

  ngOnInit(): void {
    this.loadBatiments();
  }

  loadBatiments(): void {
    this.loading = true;
    this.error = '';
    this.batimentService.getBatiments().subscribe({
      next: (data) => {
        this.batiments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erreur lors du chargement des bâtiments.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
clearSearch(){
  this.searchText = '';
  this.grid?.clearSearch();
}
onSearchChange(){
    this.grid?.findNext(this.searchText); 
}
  get filteredBatiments(): Batiment[] {
    let result = this.batiments;

    if (this.searchText.trim()) {
      const term = this.searchText.trim().toLowerCase();
      result = result.filter((b) => b.intitule.toLowerCase().includes(term));
    }

    result = [...result].sort((a, b) => {
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];
      const cmp =
        typeof valA === 'string'
          ? valA.localeCompare(valB as string)
          : (valA as number) - (valB as number);
      return this.sortAsc ? cmp : -cmp;
    });

    return result;
  }

  sortBy(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
  }

 voirLocalisation(b: Batiment): void {
    this.selectedBatimentForMap = b;
    this.mapDialog.open();
  }

  onCloseMapDialog(): void {
    this.mapDialog.close();
  }

  openCreateDialog(): void {
    this.createDialog.open();
  }

  onBatimentCreated(): void {
    this.createDialog.close();
    this.loadBatiments();
  }

  onCreateCancelled(): void {
    this.createDialog.close();
  }

  // --- Modification ---
  openEditDialog(id: number): void {
    this.selectedBatimentId = id;
    this.editDialog.open();
  }
  onBatimentUpdated(): void {
    this.editDialog.close();
    this.selectedBatimentId = null;
    this.loadBatiments();
  }

  onEditCancelled(): void {
    this.editDialog.close();
    this.selectedBatimentId = null;
  }

  // --- Suppression ---
  askDelete(batiment: Batiment): void {
    this.batimentToDelete = batiment;
    this.confirmDeleteDialog.open();
  }

  confirmDelete(): void {
    if (!this.batimentToDelete?.id) return;
    this.deleting = true;
    this.batimentService.deleteBatiment(this.batimentToDelete.id).subscribe({
      next: () => {
        this.batiments = this.batiments.filter((b) => b.id !== this.batimentToDelete!.id);
        this.deleting = false;
        this.batimentToDelete = null;
        this.confirmDeleteDialog.close();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erreur lors de la suppression du bâtiment.';
        this.deleting = false;
        this.confirmDeleteDialog.close();
        this.cdr.detectChanges();
      },
    });
  }

  cancelDelete(): void {
    this.batimentToDelete = null;
    this.confirmDeleteDialog.close();
  }
}