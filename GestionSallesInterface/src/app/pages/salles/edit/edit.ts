import { Component, EventEmitter, Input, OnChanges, SimpleChanges, inject, Output, ViewChild } from '@angular/core';
import { SalleService } from '../../../services/salle';
import { Salle } from '../../../models/salle';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Faculte } from '../../../models/faculte';
import { Batiment } from '../../../models/batiment';
import { BatimentService } from '../../../services/batiment';
import { FaculteService } from '../../../services/faculte';
import { IgxComboComponent, IgxComboModule, IgxDialogComponent, IgxDialogModule, IgxSwitchComponent } from 'igniteui-angular';
import { Specification } from '../../../models/Specification';
@Component({
  selector: 'app-salle-edit',
  imports: [CommonModule,
     ReactiveFormsModule, 
     FormsModule,
     IgxComboModule, 
     IgxDialogModule,
     IgxSwitchComponent,
],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class SalleEditComponent implements OnChanges {
  private salleService = inject(SalleService);
  private fb = inject(FormBuilder);
  private faculteService = inject(FaculteService);
  private batimentService = inject(BatimentService);

  @Input() id: number | null = null;
  @Output() saved = new EventEmitter<Salle>();
  @Output() cancelled = new EventEmitter<void>();

  @ViewChild('specCombo') specCombo?: IgxComboComponent;
  @ViewChild('specDialog', { static: true }) specDialog!: IgxDialogComponent;

  tempSpecifications: Specification[] = [];

OpenSpecDialog(): void {

  const selected = this.selectedSpecifications;

  const selectedIds = selected.map(s => s.id);

  this.specificationsSorted = [...this.specifications].sort((a, b) => {

    const aSelected = selectedIds.includes(a.id);
    const bSelected = selectedIds.includes(b.id);

    if (aSelected !== bSelected) {
      return aSelected ? -1 : 1;
    }

    return a.nom.localeCompare(b.nom);
  });

  this.tempSpecifications = [...selected];

  this.specDialog.open();
}
toggleTempSpec(spec: Specification): void {
const index = this.tempSpecifications.findIndex(s=>s.id===spec.id);
  if (index > -1) {
    this.tempSpecifications.splice(index, 1);
  } else {
    this.tempSpecifications.push(spec);
  }
}
closeSpecDialog(): void {
  this.specDialog.close();
}

confirmSpecs(): void {
this.form.controls.specifications.setValue([...this.tempSpecifications]);  this.specDialog.close();
}
  etages = Array.from({ length: 8 }, (_, i) => i - 1);

  saving = false;
  loading = false;
  editingSpecs = false;

  facultes: Faculte[] = [];
  batiments: Batiment[] = [];
  specifications: Specification[] = [];
  specificationsSorted: Specification[] = [];
  categories: string[] = [];

  form = this.fb.group({
    intitule: ['', Validators.required],
    capacite: [0, Validators.required],
    capacite_exam: [0],
    categorie: ['', Validators.required],
    specifications: [[] as Specification[]],
    surface: [0],
    etage: ['', Validators.required],
    faculteId: [0, Validators.required],
    batimentId: [0, Validators.required],
    etat:[true]
  });

  

  loadCategories() {
    this.salleService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err),
    });
  }

  loadSalle() {
    if (!this.id) return;
    this.loading = true;
    this.salleService.getSalleById(this.id).subscribe({
      next: (salle: any) => {
        this.form.patchValue({
          intitule: salle.intitule,
          capacite: salle.capacite,
          capacite_exam: salle.capacite_exam,
          categorie: salle.categorie,
          specifications: salle.specifications,
          surface: salle.surface,
          etage: salle.etage,
          faculteId: salle.faculteId ?? salle.faculte?.id ?? 0,
          batimentId: salle.batimentId ?? salle.batiment?.id ?? 0,
          etat:salle.etat,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  loadFacultes() {
    this.faculteService.getFacultes().subscribe({
      next: (data) => (this.facultes = data),
      error: (err) => console.error(err),
    });
  }

  loadBatiments() {
    this.batimentService.getBatiments().subscribe({
      next: (data) => (this.batiments = data),
      error: (err) => console.error(err),
    });
  }

  loadSpecifications() {
    this.salleService.getSpecifications().subscribe({
      next: (data) =>
        { this.specifications = data;
          this.specificationsSorted = [...data];
         },
    });
  }

  updateSalle() {
    if (this.form.invalid || !this.id) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const salle = this.form.value as Salle;
    salle.id = this.id!;
    
    this.salleService.updateSalle(this.id, salle).subscribe({
      next: (updated) => {
        this.saving = false;
        this.saved.emit(updated);
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
      },
    });
  }

  onCancel() {
    this.cancelled.emit();
  }

  isSelected(spec: Specification): boolean {
  return this.tempSpecifications.some(s => s.id === spec.id);
}

 get selectedSpecifications(): Specification[] {
    return this.form.controls.specifications.value ?? [];
}

  private specOpenTimeoutId: any;

comboClosing = false;



onSpecComboClosed(): void {
  this.editingSpecs = false;
}
removeSpec(spec: Specification): void {
const updated = this.selectedSpecifications.filter(s => s.id !== spec.id);
this.form.controls.specifications.setValue(updated);
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['id'] && this.id) {
    clearTimeout(this.specOpenTimeoutId); // annule un open() en attente d'une session précédente
    this.editingSpecs = false;
    this.loadFacultes();
    this.loadBatiments();
    this.loadSpecifications();
    this.loadSalle();
    this.loadCategories();
  }
}
changerEtat(salle: Salle) {
  this.salleService.changeEtat(salle.id!).subscribe({
    next: () => {},
    error: err => console.error(err)
  });
  
}
}