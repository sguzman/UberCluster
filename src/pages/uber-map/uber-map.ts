import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

declare var google: any;
declare var require: any;
declare var MarkerClusterer: any;
const s = require('underscore.string');

import {data} from '../../data/cache.data'
import {FilterModalComponent} from "../../components/filter-modal/filter-modal";


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
  isShown: boolean = true;
  markerCluster: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.trips = data.items;
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
    this.markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

  }

  loadMap(){

    let latLng = new google.maps.LatLng(37.352926, -121.972630);

    let mapOptions = {
      center: latLng,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  toggleModal() {
    const modal = this.modalCtrl.create(FilterModalComponent);
    modal.present();
  }

  toggleMarkers() {
    if (this.isShown) {
      this.markerCluster.clearMarkers();
    } else {
      this.markerCluster = new MarkerClusterer(this.map, this.markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
    }

    this.isShown = !this.isShown;
  }

}
