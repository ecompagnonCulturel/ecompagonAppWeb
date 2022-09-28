import { Component, OnInit } from '@angular/core';
import {AuthenticService} from '../../../authentification/authentic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  currentUser: any;
  constructor(private authenticService: AuthenticService) { }

  ngOnInit() {
    this.authenticService.loadToken();
    this.getCurrentUser();
  }


  getCurrentUser()
  {
    const User = (this.authenticService.currentUser).asObservable();
    User.subscribe(user => {
      this.currentUser = user;
      // console.log(this.currentUser);
    });
  }


}
