import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ICliente } from '../interfaces/interfaces';

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
    box: string = "";
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
      // Dedundante
      // { val: 'Tonificar', isChecked: false },
      { val: 'Otro', isChecked: false },
    ]

    constructor(private iab: InAppBrowser, private router: Router, private activatedRoute: ActivatedRoute, public toastController: ToastController, private _authService: AuthService, public afAuth: AngularFireAuth) { }

    ngOnInit() {
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Hola!',
        duration: 2000,
      });
      toast.present()
    }

    async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: 'Usuario registrado correctamente',
        message: 'Espere a que activen sus credenciales',
        buttons: [
          {
            text: 'Contacto',
            side: 'start',
            handler: () => {
              this.router.navigate(['contacto']);
              console.log('Favorite clicked');
            }
          }, {
            text: 'Cerrar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }

    async register() {
      this.presentToastWithOptions();
      
      await this._authService.register(this.email, this.password);

      let key = await this._authService.returnKeyOfUserFirebase(this.email, this.password);

      let user : ICliente = {
        // Define Si o No está activada la cuenta
        "activada" : "No",
        "apellidos" : this.apellidos,
        "box" : this.box,
        "dni" : this.DNI,
        "email" : this.email,
        "fechaNacimiento" : this.fechaNacimiento.toDateString(),    
        "id" : key,
        "localidad" : this.localidad,    
        "nombre" : this.nombre,
        "sesionesRestantes" : 10,
        "telefono" : this.numTelf.toString(), 
      }
      
      this._authService.registrarInfoUsuario(user);
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
