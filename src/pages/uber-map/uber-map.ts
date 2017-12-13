import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';

declare var google: any;
declare var require: any;
declare var MarkerClusterer: any;

const s = require('underscore.string');
const _ = require('lodash');

import {data} from '../../data/cache.data'
import {FilterModalComponent} from "../../components/filter-modal/filter-modal";
import {FilterTimeInterface} from "../../interface/filter-time.interface";
import {FilterDayOfWeekInterface} from "../../interface/filter-day-of-week.interface";
import {FilterTimeProvider} from "../../providers/filter-time/filter-time";


@IonicPage()
@Component({
  selector: 'page-uber-map',
  templateUrl: 'uber-map.html',
})
export class UberMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  trips: any[];
  filter: FilterTimeInterface;

  markerCluster: any;

  constructor(private modalCtrl: ModalController, private filterPrvdr: FilterTimeProvider) {
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

      item['marker'] = new google.maps.Marker({
        position: item.pickup,
        label: item.total
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UberMapPage');
    this.loadMap();
    const markers = _.map(_.filter(this.trips, (x) => x.marker), 'marker');
    this.markerCluster = new MarkerClusterer(this.map, markers, {
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
    }, {
      enableBackdropDismiss: false
    });
    modal.onDidDismiss(data => {
      this.filter = data.filter;
      this.filterByFilterObj();
    });
    modal.present();
  }

  filterByFilterObj() {
    this.markerCluster.clearMarkers();
    const results = this.filterPrvdr.filterbyTime(this.trips, this.filter);
    this.markerCluster = new MarkerClusterer(this.map, results, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  }
}
