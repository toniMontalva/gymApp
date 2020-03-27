import { Component, OnInit } from '@angular/core';

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
  lesion: boolean;
  queLesion: string = "";
  comoNosConociste: string = "";
  password: string = "";
  confPassword: string = "";

  constructor() { }

  ngOnInit() {
  }

}
