import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public folder: string;

  email: string = "";
  password: string = "";

  username: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public toastController: ToastController, private _authService: AuthService, public afAuth: AngularFireAuth ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this._authService.signOut();
    console.log("Al abrir pestaña tengo" + this._authService.clienteKey);
  }

  async presentToastUserNotFound() {
    const toast = await this.toastController.create({
      message: 'Usuario no registrado',
      duration: 2000
    });
    toast.present()
  }

  async presentToastIncorrectPassword() {
    const toast = await this.toastController.create({
      message: 'Contraseña Incorrecta',
      duration: 2000
    });
    toast.present()
  }

  async presentToastPasswordEmpty() {
    const toast = await this.toastController.create({
      message: 'El campo contraseña es obligatorio',
      duration: 2000
    });
    toast.present()
  }

  async presentToastEmailFormattedIncorrectly() {
    const toast = await this.toastController.create({
      message: 'El email está mal escrito',
      duration: 2000
    });
    toast.present()
  }

  async presentToastEmailEmpty() {
    const toast = await this.toastController.create({
      message: 'El campo email es obligatorio',
      duration: 2000
    });
    toast.present()
  }

  async presentToastWelcomeUser() {
    const toast = await this.toastController.create({
      message: '¡Hola ' + this.email + "!",
      duration: 2000
    });
    toast.present()
  }

  async presentToastCredentialsNotAllowedYet() {
    const toast = await this.toastController.create({
      header: 'Hola ' + this.username,
      message: 'Espere a que un administrador active sus credenciales',
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

  saveLoggedUser() {
    //let res = this._productoService.getLoggedUser(this.username);    
    this._authService.getLoggedUserFirebase();
  }

  goToHomePage() {
    this.saveLoggedUser();
    this.presentToastWelcomeUser();
    this.router.navigateByUrl('/menu');
  }

  /*async iniciarSesion() {
    await this._authService.login(this.email, this.password);
    this._authService.getLoggedUserFirebase();
    this.email = this._authService.email;
    //this.getNombreUsuario(this.email);
  }*/

  async login() {
    const { email, password} = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this._authService.getLoggedUserFirebase();

      await this._authService.getUserNameOfLoggedUser();
      this.username = this._authService.username;

      let allowed = await this._authService.userIsAllowedToLogin(this._authService.clienteKey);

      if(!allowed) {
          this._authService.signOutNew();
          this.presentToastCredentialsNotAllowedYet();
      } else {
          this.goToHomePage();
      }      
    } catch(err) {
        console.dir(err)
        if(email == '') {
          this.presentToastEmailEmpty();
        } else if(password == '') {
          this.presentToastPasswordEmpty();
        }
        else {
          if(err.code === "auth/user-not-found") {
            this.presentToastUserNotFound();
          } else if(err.code === "auth/wrong-password") {
            this.presentToastIncorrectPassword();
          } else if(err.code === "auth/invalid-email"){
            this.presentToastEmailFormattedIncorrectly();
          }
        }        
    }
  }

  
}
