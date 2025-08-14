import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { ITechnician } from 'src/app/core/models/techician.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { TechnicianService } from 'src/app/shared/services/technician.service';

@Component({
  selector: 'app-cadastro-tecnicos',
  templateUrl: './cadastro-tecnicos.component.html',
  styleUrl: './cadastro-tecnicos.component.scss'
})
export class CadastroTecnicosComponent {
  technicianForm: FormGroup;
  isEditMode = false;
  technicianId: string | null = null;
  selectedCostCenter: ICostCenter = null;

  constructor(
    private fb: FormBuilder,
    private technicianService: TechnicianService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.technicianForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      function: [''],
      document: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    const technicianId = this.route.snapshot.paramMap.get('id');
    if (technicianId) {
      this.isEditMode = true;
      this.technicianId = technicianId;
      this.technicianService.getById(technicianId).subscribe(defaultErrorHandler(technician => {
        this.technicianForm.patchValue({
            ...technician,
            email: technician.user?.email,
        });
        this.technicianForm.get('password').clearValidators();
        this.technicianForm.get('password').updateValueAndValidity();
        this.selectedCostCenter = technician.costCenter;
      }));
    }
  }

  onSubmit(): void {
    if (this.technicianForm.invalid) {
      return;
    }

    const technician: ITechnician = this.technicianForm.value;
    technician.costCenterId = this.selectedCostCenter.id;
    technician.costCenter = this.selectedCostCenter;

    if (this.isEditMode) {
      technician.id = this.technicianId!;
      this.technicianService.update(technician).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Técnico atualizado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/tecnicos']);
      }));
    } else {
      this.technicianService.create(technician).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Técnico criado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/tecnicos']);
      }));
    }
  }
}
