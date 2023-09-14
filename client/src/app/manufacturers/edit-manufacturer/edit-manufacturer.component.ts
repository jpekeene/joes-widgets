import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manufacturer } from '../../shared/types/interfaces';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-manufacturer',
    templateUrl: './edit-manufacturer.component.html',
    styleUrls: ['./edit-manufacturer.component.scss'],
})
export class EditManufacturerComponent implements OnInit {
    public manufacturerForm: FormGroup;
    public manufacturerId: string | null;
    public loadedManufacturer: Manufacturer;
    public loading = true;

    constructor(
        private fb: FormBuilder,
        private graphqlService: GraphqlService,
        private snackBarService: SnackbarService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.manufacturerId = this.route.snapshot.paramMap.get('id');
        if (this.manufacturerId) {
            this.graphqlService.getManufacturer(this.manufacturerId).subscribe((manufacturer) => {
                this.loadedManufacturer = manufacturer;
                this.buildForm();
                this.loading = false;
            });
        } else {
            this.loading = false;
            this.buildForm();
        }
    }

    public buildForm() {
        this.manufacturerForm = this.fb.group({
            name: [this.loadedManufacturer ? this.loadedManufacturer.name : '', Validators.required],
        });
    }

    public saveManufacturer(): void {
        if (this.manufacturerForm.valid) {
            this.loading = true;
            const action = this.manufacturerId
                ? this.graphqlService.updateManufacturer(this.manufacturerId, this.manufacturerForm.value.name)
                : this.graphqlService.addManufacturer(this.manufacturerForm.value.name);

            action.subscribe(() => {
                const message = this.manufacturerId ? 'Manufacturer updated successfully' : 'Manufacturer added successfully';
                this.snackBarService.openSnackBar(message, this.manufacturerId ? 'Updated' : 'Added');
                this.loading = false;
                this.router.navigate(['/manufacturers']);
            });
        } else {
            this.snackBarService.openSnackBar('Please fill in all required fields', 'Error');
        }
    }

    public goBack() {
        this.router.navigate(['/manufacturers']);
    }
}
