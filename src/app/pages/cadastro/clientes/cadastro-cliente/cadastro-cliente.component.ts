import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IClient } from 'src/app/core/models/client.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {

   breadCrumbItems = [
    { label: 'Cadastro' },
    { label: 'Clientes', active: true }
  ];

   clientForm: FormGroup;
   isEditMode: boolean = false;
   clientId: string | null = null;
 
   constructor(
     private fb: FormBuilder,
     private clientService: ClientService,
     private router: Router,
     private route: ActivatedRoute
   ) {
     this.clientForm = this.fb.group({
       companyName: ['', Validators.required],
       businessName: [''],
       cnpj: ['', Validators.required],
       addressZipCode: [''],
       addressStreet: [''],
       addressNumber: [''],
       addressComplement: [''],
       addressDistrict: [''],
       addressCity: [''],
       addressState: [''],
       email: ['', Validators.email],
       password: ['', Validators.minLength(6)]
     });
   }
 
   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clientId = id;
        this.clientService.getById(id).subscribe(defaultErrorHandler(client => {
          this.clientForm.patchValue({
              ...client,
              email: client.user?.email
          });
          this.clientForm.get('password')?.disable();
        }));
      }
    });
   }
 
   onSubmit() {
    if (this.clientForm.valid) {
      const client: IClient = this.clientForm.value;
      if (this.isEditMode) {
        client.id = this.clientId!;
        this.clientService.update(client).subscribe(defaultErrorHandler(() => {
          this.router.navigate(['/cadastro/clientes']);
        }));
      } else {
        this.clientService.create(client).subscribe(defaultErrorHandler(() => {
          this.router.navigate(['/cadastro/clientes']);
        }));
      }
    }
   }

}
