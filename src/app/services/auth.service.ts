import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ICliente, IEmpresa } from '../interfaces/interfaces';
import { Router } from '@angular/router';

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

    constructor(private _db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router){

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

        this.getReservasRestantes();

        this.idReserva = "";
        this.idReserva.concat(day).concat("-").concat(month).concat("-").concat(year);

        ref.push(this.idReserva);
        this.reservasRestantesUsuario--;
    }

    getReservasRestantes() : number {
        // TODO
        let ref = this.getClientesRefencia();
        
        return 1;
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

    register(email: string, password: string) {
        this.afAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                console.log(data);
            })
            .catch((error: any) => 
                console.error(error)
            );
    }

    signOut() {
        return this.afAuth
            .auth
            .signOut()
            .then(() => {
                this.router.navigate(['auth']);
            })
    }

    forgotPass(email: string) {
        this.afAuth
            .auth
            .sendPasswordResetEmail(email)
            .then(function() {
                window.alert('El email de recuperación de contraseña ha sido enviado, revise su inbox.');
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