import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  date = new Date().toISOString();
  hours = moment().format('h:mm');

  hora = moment.utc().startOf('day').format('h:mm');

  //minDate = moment().format('YYYY');
  minDate = moment.utc().startOf('day').format('YYYY-MM-DD');
  maxDate = moment.utc().add(1, 'y').format('YYYY-MM-DD');

  hoursReserva = moment.utc().add(3,'h').startOf('h').format('HH:mm');

  // Controlador de reservas por cliente
  // TODO
  // reservasRestantes: Number = llamar a BBDD para comprobar

  reservasRestantes: number = 2;

  constructor(public toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {    
  }

  async presentToastReservaError() {
    const toast = await this.toastController.create({
      message: 'No te quedan reservas',
      duration: 2000
    });
    toast.present();
  }

  reservar() {
    // TODO 
    let year = this.date.substr(0,4);
    let month = this.date.substr(5,2);
    let day = this.date.substr(8,2);
    let hour = this.hoursReserva.substr(0,2);
    let minutes = this.hoursReserva.substr(3,2);

    this.reservasRestantes = this.authService.reservasRestantesUsuario;

    if(this.reservasRestantes == 0){
      this.presentToastReservaError();
    } else {
      this.authService.insertarReserva(year, month, day, hour, minutes);
      this.reservasRestantes--;
    }  
  }

}
