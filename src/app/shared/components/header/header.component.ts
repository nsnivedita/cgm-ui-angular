import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
 @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  isLoggedIn = false;
  message: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  handleLogout() {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
