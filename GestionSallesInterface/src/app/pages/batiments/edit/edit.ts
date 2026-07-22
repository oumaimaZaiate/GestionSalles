import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BatimentService } from '../../../services/batiment';
import { Batiment } from '../../../models/batiment';
import * as L from 'leaflet';

@Component({
  selector: 'app-batiment-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class BatimentEditComponent implements AfterViewInit, OnChanges, OnDestroy {
  private fb = inject(FormBuilder);
  private batimentService = inject(BatimentService);

  // Fourni par le parent, plus de route
  @Input() id: number | null = null;

  @Output() saved = new EventEmitter<Batiment>();
  @Output() cancelled = new EventEmitter<void>();

  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  loading = false;
  submitting = false;
  error = '';

  private map!: L.Map;
  private marker?: L.Marker;
  private resizeObserver?: ResizeObserver;
  private mapReady = false;
  private pendingCoords: { lat: number; lng: number } | null = null;

  form = this.fb.group({
    intitule: ['', [Validators.required, Validators.maxLength(150)]],
    latitude: [null as number | null, [Validators.required, Validators.min(-90), Validators.max(90)]],
    longitude: [null as number | null, [Validators.required, Validators.min(-180), Validators.max(180)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],

  });

  get f() {
    return this.form.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      this.loadBatiment();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize();
    });
    this.resizeObserver.observe(this.mapContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }

  loadBatiment(): void {
    if (!this.id) return;
    this.loading = true;
    this.error = '';
    this.batimentService.getBatimentById(this.id).subscribe({
      next: (batiment) => {
        this.form.patchValue({
          intitule: batiment.intitule,
          latitude: batiment.latitude,
          longitude: batiment.longitude,
          description: batiment.description,

        });

        if (this.mapReady) {
          this.updateMap(batiment.latitude, batiment.longitude);
        } else {
          // La carte n'est pas encore initialisée (ngAfterViewInit pas encore passé),
          // on garde les coordonnées pour les appliquer dès qu'elle sera prête
          this.pendingCoords = { lat: batiment.latitude, lng: batiment.longitude };
        }

        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement du bâtiment.';
        this.loading = false;
      },
    });
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [30.406, -9.559],
      15
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '© OpenStreetMap' }
    ).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.form.patchValue({ latitude: lat, longitude: lng });
      this.updateMap(lat, lng);
    });

    this.mapReady = true;

    if (this.pendingCoords) {
      this.updateMap(this.pendingCoords.lat, this.pendingCoords.lng);
      this.pendingCoords = null;
    }
  }

  private updateMap(lat: number, lng: number): void {
    if (!this.map) return;

    this.map.setView([lat, lng], 18);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(this.form.value.intitule || 'Bâtiment')
      .openPopup();
  }

  onSubmit(): void {
    if (this.form.invalid || !this.id) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = '';

    const batiment: Batiment = {
      id: this.id,
      intitule: this.form.value.intitule!,
      latitude: this.form.value.latitude!,
      longitude: this.form.value.longitude!,
       description: this.form.value.description!,

    };

    this.batimentService.updateBatiment(this.id, batiment).subscribe({
      next: (updated) => {
        this.submitting = false;
        this.saved.emit(updated);
      },
      error: () => {
        this.error = 'Erreur lors de la mise à jour du bâtiment.';
        this.submitting = false;
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}