import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Manufacturer, Widget, WidgetType } from '../../shared/types/interfaces';

@Component({
    selector: 'app-edit-widget',
    templateUrl: './edit-widget.component.html',
    styleUrls: ['./edit-widget.component.scss'],
})
export class EditWidgetComponent implements OnInit {
    public widgetForm: FormGroup;
    public manufacturers: Manufacturer[];
    public widgetTypes: WidgetType[];
    public widgetId: string | null;
    public loadedWidget: Widget;
    public loading = true;

    constructor(
        private fb: FormBuilder,
        private graphqlService: GraphqlService,
        private snackBarService: SnackbarService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.graphqlService.getManufacturers().subscribe((data) => {
            this.manufacturers = data;
        });

        this.graphqlService.getWidgetTypes().subscribe((data) => {
            this.widgetTypes = data;
        });

        this.widgetId = this.route.snapshot.paramMap.get('id');
        if (this.widgetId) {
            this.graphqlService.getWidget(this.widgetId).subscribe((widget) => {
                this.loadedWidget = widget;
                this.buildForm();
                this.loading = false;
            });
        } else {
            this.loading = false;
            this.buildForm();
        }
    }

    public buildForm() {
        this.widgetForm = this.fb.group({
            name: [this.loadedWidget ? this.loadedWidget.name : '', Validators.required],
            stockLevel: [this.loadedWidget ? this.loadedWidget.stockLevel : '', Validators.required],
            manufacturerId: [this.loadedWidget ? this.loadedWidget.manufacturer.id : '', Validators.required],
            widgetTypeId: [this.loadedWidget ? this.loadedWidget.type.id : '', Validators.required],
        });
    }

    public saveWidget(): void {
        if (this.widgetForm.valid) {
            this.loading = true;
            const action = this.widgetId
                ? this.graphqlService.updateWidget(this.widgetId, this.widgetForm.value)
                : this.graphqlService.addWidget(this.widgetForm.value);

            action.subscribe(() => {
                const message = this.widgetId ? 'Widget updated successfully' : 'Widget added successfully';
                this.snackBarService.openSnackBar(message, this.widgetId ? 'Updated' : 'Added');
                this.loading = false;
                this.router.navigate(['/widgets']);
            });
        } else {
            this.snackBarService.openSnackBar('Please fill in all required fields', 'Error');
        }
    }

    public goBack() {
        this.router.navigate(['/widgets']);
    }
}
