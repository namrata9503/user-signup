import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  text: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Quisque id ex sodales, varius turpis eleifend, bibendum turpis. Praesent sed mi risus. Quisque tempus, nibh velit aliquam tellus, vitae hendrerit ante quam ac augue.',
    'Vivamus convallis ultrices orci eu iaculis. Viverra ut turpis. Aenean eu lacus in magna porttitor porta sit amet vitae eros. ',
  ];
  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  goBack() {
    this.userService.goBack();
  }
}
