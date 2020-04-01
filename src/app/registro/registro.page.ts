import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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

    constructor(private iab: InAppBrowser, private router: Router, private activatedRoute: ActivatedRoute, public toastController: ToastController, private _authService: AuthService, public afAuth: AngularFireAuth) { }

    ngOnInit() {
    }

    abrirPoliticaPrivacidadSystem() {
      this.iab.create('https://www.femesport.es/politica-de-privacidad/', '_system');
    }

    abrirPoliticaPrivacidadBlank() {
      this.iab.create('https://www.femesport.es/politica-de-privacidad/', '_blank');
    }

    abrirNormasCentroSystem(){
      this.iab.create('https://femesport.es/wp-content/uploads/2018/10/NORMAS-DE-USO-DEL-CENTRO-FEM-ESPORT-ALZIRA.pdf', '_system');
    }

    abrirNormasCentroBlank() {
      this.iab.create('https://femesport.es/wp-content/uploads/2018/10/NORMAS-DE-USO-DEL-CENTRO-FEM-ESPORT-ALZIRA.pdf', '_blank');
    }

    abrirAvisoLegalSystem() {
      this.iab.create('https://www.femesport.es/aviso-legal/', '_system');
    }

    abrirAvisoLegalBlank() {
      this.iab.create('https://www.femesport.es/aviso-legal/', '_blank');
    }

}
