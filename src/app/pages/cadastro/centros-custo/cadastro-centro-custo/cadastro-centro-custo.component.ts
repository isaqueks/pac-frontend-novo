import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from 'src/app/core/models/client.entity';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { CostCenterService } from 'src/app/shared/services/cost-center.service';

@Component({
  selector: 'app-cadastro-centro-custo',
  templateUrl: './cadastro-centro-custo.component.html',
  styleUrl: './cadastro-centro-custo.component.scss'
})
export class CadastroCentroCustoComponent {
  costCenterForm: FormGroup;
  isEditMode = false;

  selectedClient: IClient;

  private editId: string;

  constructor(
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.costCenterForm = this.fb.group({
      companyName: ['', Validators.required],
      businessName: [''],
      cnpj: ['', Validators.required],
      addressZipCode: [''],
      addressStreet: [''],
      addressNumber: [null],
      addressComplement: [''],
      addressDistrict: [''],
      addressCity: [''],
      addressState: [''],
      email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const costCenterId = this.route.snapshot.paramMap.get('id');
    if (costCenterId) {
      this.isEditMode = true;
        this.editId = costCenterId;
      this.costCenterService.getById(costCenterId).subscribe(defaultErrorHandler(costCenter => {
        this.costCenterForm.patchValue({
            ...costCenter,
            email: costCenter.user?.email
        });
        this.selectedClient = costCenter.client;
        this.costCenterForm.get('password').clearValidators();
        this.costCenterForm.get('password').updateValueAndValidity();
      }));
    }
    else {
        this.editId = null;
    }
  }

  onSubmit(): void {
    if (this.costCenterForm.invalid) {
      return;
    }

    const costCenter: ICostCenter = this.costCenterForm.value;
    costCenter.clientId = this.selectedClient.id;
    costCenter.client = this.selectedClient;
    costCenter.id = this.editId;

    if (this.isEditMode) {
      this.costCenterService.update(costCenter).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Setor atualizado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/setores']);
      }));
    } else {
      this.costCenterService.create(costCenter).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Setor criado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/setores']);
      }));
    }
  }
}
