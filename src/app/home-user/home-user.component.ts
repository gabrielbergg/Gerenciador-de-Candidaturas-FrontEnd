import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  isMenuOpen = true;
  userId!: number;
  userName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    const nomeCompleto = sessionStorage.getItem('username') || '';
    this.userName = nomeCompleto.split(' ')[0];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
