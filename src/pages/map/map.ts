import {Component} from '@angular/core';
import {IonicPage, Platform} from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;

  constructor() {
  }

  ionViewDidLoad(){
    this.initializeMap();
  }

  initializeMap() {
    let locationOptions = {timeout: 20000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(

      (position) => {
        console.log(position.coords);
        let options = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
      },

      (error) => {
        console.log(error);
      }, locationOptions
    );
  }
}
