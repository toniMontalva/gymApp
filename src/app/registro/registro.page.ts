import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

    email: string = "";
    nombre: string = "";
    apellidos: string = "";
    fechaNacimiento: Date;
    DNI: string = "";
    localidad: string = "";
    numTelf: number;
    objetivo: string = "";
    lesion: string = "";
    queLesion: string = "";
    comoNosConociste: string = "";
    password: string = "";
    confPassword: string = "";

    public form = [
      { val: 'Aumentar Volumen', isChecked: false },
      { val: 'Perder Grasa', isChecked: false },
      { val: 'Rehabilitación', isChecked: false },
      { val: 'Solo practicar deporte', isChecked: false },
      { val: 'Tonificar', isChecked: false },
      { val: 'Otro', isChecked: false },
    ]

    constructor(private router: Router, private activatedRoute: ActivatedRoute, public toastController: ToastController, private _authService: AuthService, public afAuth: AngularFireAuth) { }

    ngOnInit() {
    }

}
