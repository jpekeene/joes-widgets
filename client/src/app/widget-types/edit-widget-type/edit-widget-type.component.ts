import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manufacturer } from '../../shared/types/interfaces';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-widget-type',
    templateUrl: './edit-widget-type.component.html',
    styleUrls: ['./edit-widget-type.component.scss'],
})
export class EditWidgetTypeComponent implements OnInit {
    public widgetTypeForm: FormGroup;
    public widgetTypeId: string | null;
    public loadedWidgetType: Manufacturer;
    public loading = true;

    constructor(
        private fb: FormBuilder,
        private graphqlService: GraphqlService,
        private snackBarService: SnackbarService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.widgetTypeId = this.route.snapshot.paramMap.get('id');
        if (this.widgetTypeId) {
            this.graphqlService.getWidgetType(this.widgetTypeId).subscribe((widgetType) => {
                this.loadedWidgetType = widgetType;
                this.buildForm();
                this.loading = false;
            });
        } else {
            this.loading = false;
            this.buildForm();
        }
    }

    public buildForm() {
        this.widgetTypeForm = this.fb.group({
            name: [this.loadedWidgetType ? this.loadedWidgetType.name : '', Validators.required],
        });
    }

    public saveWidgetType(): void {
        if (this.widgetTypeForm.valid) {
            this.loading = true;
            const action = this.widgetTypeId
                ? this.graphqlService.updateWidgetType(this.widgetTypeId, this.widgetTypeForm.value.name)
                : this.graphqlService.addWidgetType(this.widgetTypeForm.value.name);

            action.subscribe(() => {
                const message = this.widgetTypeId ? 'Widget type updated successfully' : 'Widget type added successfully';
                this.snackBarService.openSnackBar(message, this.widgetTypeId ? 'Updated' : 'Added');
                this.loading = false;
                this.router.navigate(['/widget-types']);
            });
        } else {
            this.snackBarService.openSnackBar('Please fill in all required fields', 'Error');
        }
    }

    public goBack() {
        this.router.navigate(['/widget-types']);
    }
}
