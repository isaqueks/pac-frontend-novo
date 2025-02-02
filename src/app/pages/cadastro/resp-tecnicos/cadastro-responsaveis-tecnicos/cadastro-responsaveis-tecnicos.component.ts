import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { ITechnicalManager } from 'src/app/core/models/technical-maneger.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { TechnicianManagerService } from 'src/app/shared/services/technician-manager.service';

@Component({
  selector: 'app-cadastro-responsaveis-tecnicos',
  templateUrl: './cadastro-responsaveis-tecnicos.component.html',
  styleUrl: './cadastro-responsaveis-tecnicos.component.scss'
})
export class CadastroResponsaveisTecnicosComponent {
  technicianForm: FormGroup;
  isEditMode = false;
  technicianId: string | null = null;
  selectedCostCenter: ICostCenter = null;

  constructor(
    private fb: FormBuilder,
    private technicianService: TechnicianManagerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.technicianForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
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
        this.technicianForm.get('password')?.disable();
        this.selectedCostCenter = technician.costCenter;
      }));
    }
  }

  onSubmit(): void {
    if (this.technicianForm.invalid) {
      return;
    }

    const technician: ITechnicalManager = this.technicianForm.value;
    technician.costCenterId = this.selectedCostCenter.id;
    technician.costCenter = this.selectedCostCenter;

    if (this.isEditMode) {
      technician.id = this.technicianId!;
      this.technicianService.update(technician).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Técnico atualizado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/responsaveis-tecnicos']);
      }));
    } else {
      this.technicianService.create(technician).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Técnico criado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/responsaveis-tecnicos']);
      }));
    }
  }
}
