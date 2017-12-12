import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;
declare var require: any;
declare var MarkerClusterer: any;
const s = require('underscore.string');

import {data} from '../../data/cache.data'


@IonicPage()
@Component({
  selector: 'page-uber-map',
  templateUrl: 'uber-map.html',
})
export class UberMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  trips: any[];
  tripClusterMarkers: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
      this.tripClusterMarkers.push(marker);
      console.log(item);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UberMapPage');
    this.loadMap();
    const markerCluster = new MarkerClusterer(this.map, this.tripClusterMarkers, {
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

}
