import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Stuff, StuffService } from '../../services/stuff.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create',
  imports: [RouterModule,FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  itemForm!:FormGroup
  isEdit = false; 
  itemId!: string;
  
  constructor(private fb: FormBuilder,private serviceStuff:StuffService,private router: Router,private route: ActivatedRoute,private authService:AuthService
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }
   ngOnInit(): void {

    // Récupérer l'id depuis l'URL
    this.itemId = this.route.snapshot.paramMap.get('id') || '';
    if (this.itemId) {
      this.isEdit = true;
      this.loadItemDetails(this.itemId);
    }
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }
   loadItemDetails(id: string) {
    this.serviceStuff.getStuffById(id).subscribe({
      next: (data) => {
        console.log('Détails récupérés:', data);
        this.itemForm.patchValue(data); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération', err);
      }
    });
  }

onSubmit() {
  if (this.itemForm.invalid) {
    alert('Veuillez remplir tous les champs correctement.');
    return;
  }

  if (this.isEdit) {
    // Mode édition → on met à jour l'élément
    this.serviceStuff.updateStuff(this.itemId, this.itemForm.value).subscribe({
      next: (res) => {
        console.log('Article modifié avec succès', res);
        alert('Votre article a été mis à jour !');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la mise à jour de l’article');
      }
    });

  } else {
    // Mode création → on ajoute un userId et on crée l'article
    const newItem = {
      ...this.itemForm.value,
      userId: 'user-' + Date.now()
    };

    this.serviceStuff.createStuff(newItem).subscribe({
      next: (res) => {
        alert('Votre article a été créé !');
        this.itemForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Erreur lors de la création de l’article');
        console.log(err);
        
      }
    });
  }
}



}
