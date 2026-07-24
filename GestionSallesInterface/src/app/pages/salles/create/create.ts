import { Component, inject, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SalleService } from '../../../services/salle';
import { Salle } from '../../../models/salle';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Faculte } from '../../../models/faculte';
import { Batiment } from '../../../models/batiment';
import { Specification } from '../../../models/Specification';
import { BatimentService } from '../../../services/batiment';
import { FaculteService } from '../../../services/faculte';
import {  IgxDialogComponent, IgxDialogModule } from 'igniteui-angular';

@Component({
  selector: 'app-salle-create',
  imports: [CommonModule,
    ReactiveFormsModule,
    IgxDialogModule
 
  ],
  templateUrl: './create.html',
  
})
export class SalleCreateComponent implements OnInit {
  private salleService = inject(SalleService);
  private fb = inject(FormBuilder);
  private faculteService = inject(FaculteService);
  private batimentService = inject(BatimentService);

  @ViewChild('specDialog',{static: true }) specDialog! : IgxDialogComponent;


etages = Array.from({ length: 8 }, (_, i) => i - 1);

facultes: Faculte[] = [];
batiments: Batiment[] = [];
specifications :Specification[] =[];
tempSpecifications :Specification[] =[];
specificationsSorted: Specification[] = [];
categories :string[] =[];
saving = false;



  @Output() saved = new EventEmitter<Salle>();
  @Output() cancelled = new EventEmitter<void>();

ngOnInit(): void {
  this.loadFacultes();
  this.loadBatiments();
  this.loadSpecifications();
  this.loadCategories();
}
loadFacultes() {
  this.faculteService.getFacultes().subscribe({
    next: (data) => {
      this.facultes = data;
    },
    error: (err) => console.error(err)
  });
}
loadSpecifications(){
  this.salleService.getSpecifications().subscribe({
    next: (data) =>{
      this.specifications = data ;
    },
    error: (err) => console.error(err)
  })
}
loadCategories(){
  this.salleService.getCategories().subscribe({
    next: (data) => {
      this.categories = data;
    },
    error: (err) => console.error(err)
  })
}

loadBatiments() {
  this.batimentService.getBatiments().subscribe({
    next: (data) => {
      this.batiments = data;
    },
    error: (err) => console.error(err)
  });
}

  form = this.fb.group({
    intitule: ['',Validators.required],
    capacite: [0,Validators.required],
    capacite_exam: [0],
    categorie: ['', Validators.required],
    specifications :[[] as Specification[]],
    surface: [0],
    etage: ['', Validators.required],
    faculteId: [0, Validators.required],
    batimentId: [0, Validators.required],
    
  })

createSalle(){
  if(this.form.invalid){
    this.form.markAllAsTouched();
    return;
  }
  this.saving = true;
  const salle = this.form.value as Salle;
  this.salleService.createSalle(salle).subscribe({
    next: (created) => { 
      this.saving = false;
        this.form.reset({
          intitule: '', capacite: 0, capacite_exam: 0,
          categorie: '',specifications: [] , surface: 0, etage: '', faculteId: 0, batimentId: 0,
        });
        this.saved.emit(created);
    },
    error: err => {
      this.saving = false;
      console.error(err)}
  });
}

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
  if(index > -1){
    this.tempSpecifications.splice(index,1);
  }
  else {
    this.tempSpecifications.push(spec);
  }
}
closeSpecDialog() : void{
  this.specDialog.close();
}
isSelected(spec: Specification): boolean {
  return this.tempSpecifications.some(s => s.id === spec.id);
}
confirmSpecs(): void{
this.form.controls.specifications.setValue([...this.tempSpecifications]);  this.specDialog.close();
}
get selectedSpecifications(): Specification[] {
    return this.form.controls.specifications.value ?? [];
}
onSpecificationChange(spec: Specification, checked: boolean) {
  const current = this.form.controls.specifications.value ?? [];

  if (checked) {
    if (!current.includes(spec)) {
      this.form.controls.specifications.setValue([...current, spec]);
    }
  } else {
    this.form.controls.specifications.setValue(
      current.filter(s => s !== spec)
    );
  }

  console.log(this.form.controls.specifications.value);
}
 onCancel() {
    console.log(this.form.value.specifications);
  console.log(this.tempSpecifications);


    this.cancelled.emit();
 this.form.reset({
    intitule: '',
    capacite: 0,
    capacite_exam: 0,
    categorie: '',
    specifications: [],
    surface: 0,
    etage: '',
    faculteId: 0,
    batimentId: 0,
  });

  this.tempSpecifications = [];
  this.specificationsSorted = [];
  }
}