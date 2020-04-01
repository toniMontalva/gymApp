import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }

  llamarEmpresa() {
    // Reemplazar con número de empresa
    this.callNumber.callNumber("666666666", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
  }

}
