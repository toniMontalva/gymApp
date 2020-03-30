import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  public folder: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');    
  }


}
