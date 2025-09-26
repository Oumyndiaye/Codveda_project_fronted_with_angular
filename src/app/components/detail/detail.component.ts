import { Component } from '@angular/core';
import { Stuff, StuffService } from '../../services/stuff.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detail',
  imports: [CommonModule,RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
   item!: Stuff;
  loading = true;
  error = '';

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StuffService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getStuffById(id).subscribe({
        next: (res) => {
          this.item = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'Impossible de charger cet article.';
          this.loading = false;
        }
      });
    }
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }

  deleteItem(id: string | undefined) {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.service.deleteStuff(id).subscribe({
        next: () => {
          alert('Article supprimé avec succès.');
          this.router.navigate(['/']);
        },
        error: (err) => {          
          alert(err.error.message);
        }
      });
    }
  }

}
