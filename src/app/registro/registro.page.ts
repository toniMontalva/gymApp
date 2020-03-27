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

  constructor() { }

  ngOnInit() {
  }

}
