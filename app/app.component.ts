import { Component, Input } from '@angular/core';

import { GoogleService } from './google.service';

import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'geo-tagging-app',
  styles: ['label { padding:0; font-size:12px; color:#999;}', 'h3 {text-align:center;}', 'div {padding-bottom:10px;}'],
  templateUrl: './app/address.template.html',
  providers: [ GoogleService ]
})

export class AppComponent{ 
	@Input() lng: string;
	@Input() ltd: string;

	title: 'Reverse Geo Tagging';
	
	address: string;

	constructor(private googleService: GoogleService) { 
		
	}
	
	submitLocation(lng, ltd){
		let addresses: [];

		this.googleService.load(lng,ltd)
			.subscribe(response =>{
				addresses = response.results;
				if(addresses.length !== 0){
					for(let key in addresses){
						if(addresses[key].types.length == 1 && addresses[key].types[0] === 'street_address'){
							this.address = addresses[key].formatted_address;
						}
					}
					} else {
						this.address = "No Address Found. Check the co-ordinates properly"
					}

			});
	}
}