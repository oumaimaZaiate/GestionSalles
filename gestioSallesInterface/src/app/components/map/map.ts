import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png'
});
@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrl: './map.css' 
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() titre: string = '';

  // référence au div, plus fiable qu'un id="map" en dur
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map?: L.Map;
  private viewInitialized = false;
  private cdr = inject(ChangeDetectorRef)
  ngAfterViewInit(): void {
    this.viewInitialized = true;
      this.cdr.detectChanges(); 
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.viewInitialized) {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {

  console.log('>>> initMap() appelé');
  console.log('>>> latitude:', this.latitude, 'longitude:', this.longitude);
  console.log('>>> mapContainer:', this.mapContainer);

  if (this.latitude == null || this.longitude == null) {
    console.warn('>>> lat/lng null, sortie anticipée');
    return;
  }

  this.map?.remove();

  this.map = L.map(this.mapContainer.nativeElement).setView(
    [this.latitude, this.longitude],
    18
  );

  console.log('>>> Carte Leaflet créée avec succès:', this.map);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '© OpenStreetMap'
    }
  ).addTo(this.map);

  L.marker([this.latitude, this.longitude])
    .addTo(this.map)
    .bindPopup(this.titre)
    .openPopup();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      console.log('>>> invalidateSize() appelé');
      this.map?.invalidateSize();
    });
  });
}
}