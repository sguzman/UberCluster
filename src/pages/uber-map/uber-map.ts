import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';

declare var google: any;
declare var require: any;
declare var MarkerClusterer: any;
const s = require('underscore.string');

import {data} from '../../data/cache.data'
import {FilterModalComponent} from "../../components/filter-modal/filter-modal";
import {FilterTimeInterface} from "../../interface/filter-time.interface";
import {FilterDayOfWeekInterface} from "../../interface/filter-day-of-week.interface";


@IonicPage()
@Component({
  selector: 'page-uber-map',
  templateUrl: 'uber-map.html',
})
export class UberMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  trips: any[];
  markers: any[] = [];
  filter: FilterTimeInterface;

  constructor(public modalCtrl: ModalController) {
    this.trips = data.items;
    const filterDayOfWeek: FilterDayOfWeekInterface = {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true
    };

    this.filter = {
      dayOfWeek: filterDayOfWeek,
      hour: new Array(24).fill(true)
    };

    for (let idx = 0; idx < this.trips.length; ++idx) {
      const item = this.trips[idx];

      if (!item || !item['customRouteMap']) {
        continue;
      }

      {// get lat and lng for pickup
        const routeMapStr = item['customRouteMap'];
        const latLngStrs = s(routeMapStr).strRight('pickup.png%7Cscale%3A2%7C').strLeft('&').split('%2C');
        if (latLngStrs.length !== 2) {
          continue;
        }

        item['pickup'] = {};
        item['pickup']['lat'] = parseFloat(latLngStrs[0]);
        item['pickup']['lng'] = parseFloat(latLngStrs[1]);
      }

      {// get lat and lng for dropoff
        const routeMapStr = item['customRouteMap'];
        const latLngStrs = s(routeMapStr).strRight('dropoff.png%7Cscale%3A2%7C').strLeft('&').split('%2C');
        if (latLngStrs.length !== 2) {
          continue;
        }

        item['dropoff'] = {};
        item['dropoff']['lat'] = parseFloat(latLngStrs[0]);
        item['dropoff']['lng'] = parseFloat(latLngStrs[1]);
      }

      const marker = new google.maps.Marker({
        position: item.pickup
      });
      this.markers.push(marker);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UberMapPage');
    this.loadMap();
    const markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

  }

  private loadMap(){

    let latLng = new google.maps.LatLng(37.352926, -121.972630);

    let mapOptions = {
      center: latLng,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  toggleModal() {
    const modal = this.modalCtrl.create(FilterModalComponent, {
      filter: this.filter
    });
    modal.onDidDismiss(data => {
      this.filter = data.filter;
      console.log(`Map: received ${JSON.stringify(data)}`);
    });
    modal.present();
  }
}
