import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ICliente, IEmpresa } from '../interfaces/interfaces';

@Injectable()

export class AuthService {
    clienteKey: string;
    clientes: ICliente[] = [];
    cliente: ICliente;
    email: string;

    // variable para guardar el id de las reservas(fecha)
    idReserva: string = "";

    // variable para guardar las reservas de un usuario logueado
    reservasRestantesUsuario: number = 0;

    constructor(private _db: AngularFireDatabase, public afAuth: AngularFireAuth){

    }

    getClientesRefencia() : firebase.database.Reference {
        let ref = this._db.database.ref("clientes");
        return ref;
    }

    getReservasReferencia() : firebase.database.Reference {
        let ref = this._db.database.ref("reservas");
        return ref;
    }

    insertarReserva(year: string, month: string, day: string, hour: string, minutes: string) {
        let ref = this.getReservasReferencia();        
        let time = new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minutes));

        this.idReserva = "";
        this.idReserva.concat(day).concat("-").concat(month).concat("-").concat(year);

        ref.push(this.idReserva);
        this.reservasRestantesUsuario--;
    }

    saveClientes() {
        this.clientes = [];
        let ref = this.getClientesRefencia();

        ref.once("value", snapshot => {
            snapshot.forEach(child => {
                let value = child.val();
                this.clientes.push(value);
            })
        })
    }

    login(email: string, password: string) {
        this.afAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(data => {
                
            });
    }

    forgotPass(email: string) {
        this.afAuth
            .auth
            .sendPasswordResetEmail(email)
            .then(function() {

            })
            .catch(function(error){
                // error
            })
    }

    getLoggedUserFirebase() {
        this.afAuth.auth.onAuthStateChanged((user) => {
            if(user) {
                this.clienteKey = user.uid;
            } else {
                // nada
            }
        })
    }
}