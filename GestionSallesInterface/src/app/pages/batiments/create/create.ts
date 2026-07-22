import { EventEmitter, Component, inject, AfterViewInit, ViewChild, ElementRef, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BatimentService } from '../../../services/batiment';
import { Batiment } from '../../../models/batiment';
import * as L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-batiment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class BatimentCreateComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private batimentService = inject(BatimentService);

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
saving = false;
 @Output() saved = new EventEmitter<Batiment>();
  @Output() cancelled = new EventEmitter<void>();

  private map!: L.Map;
  private marker?: L.Marker;

  submitting = false;
  error = '';

  form = this.fb.group({
    intitule: ['', [Validators.required, Validators.maxLength(150)]],
    latitude: [null as number | null, [Validators.required, Validators.min(-90), Validators.max(90)]],
    longitude: [null as number | null, [Validators.required, Validators.min(-180), Validators.max(180)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    
  });

  get f() {
    return this.form.controls;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

 private initMap(): void {

  this.map = L.map(this.mapContainer.nativeElement).setView(
  [30.40366, -9.52956],
  17
);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap' }
  ).addTo(this.map);

  this.map.on('click', (e: L.LeafletMouseEvent) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    this.form.patchValue({ latitude: lat, longitude: lng });

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('Emplacement choisi')
      .openPopup();
  });

  // Ne rien recalculer ici — c'est le dialogue parent qui déclenchera invalidateSize()
}

// Méthode publique appelée par le parent quand le dialogue a fini de s'ouvrir
public refreshMapSize(): void {
  this.map?.invalidateSize();
}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';

    const batiment: Batiment = {
      intitule: this.form.value.intitule!,
      latitude: this.form.value.latitude!,
      longitude: this.form.value.longitude!,
      description: this.form.value.description!,
      
    };

    this.batimentService.createBatiment(batiment).subscribe({
      next: (created) => {
this.saving = false;
        this.form.reset({
          intitule: '',
          latitude: 0, 
          longitude: 0,
          description: ''
        });
        this.saved.emit(created);      },
      error: () => {
        this.error = 'Erreur lors de la création du bâtiment.';
        this.submitting = false;
      },
    });
  }

  onCancel() {
    this.cancelled.emit();
  }
}