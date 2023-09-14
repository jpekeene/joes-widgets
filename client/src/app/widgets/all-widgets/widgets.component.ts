import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../shared/services/graphql.service';
import { Manufacturer, Widget, WidgetType } from '../../shared/types/interfaces';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoDialogComponent, InfoDialogData } from '../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
    public widgets: Widget[];
    public manufacturers: Manufacturer[];
    public widgetTypes: WidgetType[];
    public columns = ['id', 'name', 'stockLevel', 'type', 'manufacturer', 'edit', 'delete'];
    public loading = true;
    public selectedManufacturerFilter: string | undefined;
    public selectedWidgetTypeFilter: string | undefined;
    constructor(
        private graphqlService: GraphqlService,
        private snackBarService: SnackbarService,
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit() {
        this.route.queryParams.subscribe((queryParams) => {
            const typeFilter = queryParams['type'];
            const manufacturerFilter = queryParams['manufacturer'];

            if (typeFilter) {
                this.selectedWidgetTypeFilter = typeFilter;
            }

            if (manufacturerFilter) {
                this.selectedManufacturerFilter = manufacturerFilter;
            }

            this.getWidgets(typeFilter, manufacturerFilter);
        });

        this.graphqlService.getManufacturers().subscribe((data) => {
            this.manufacturers = data;
        });

        this.graphqlService.getWidgetTypes().subscribe((data) => {
            this.widgetTypes = data;
        });
    }

    public navigateToEdit(widgetId: string) {
        this.router.navigate(['widgets/edit', widgetId]);
    }

    public navigateToAdd() {
        this.router.navigate(['widgets/new']);
    }

    public clearFilters() {
        this.getWidgets();
        this.selectedManufacturerFilter = undefined;
        this.selectedWidgetTypeFilter = undefined;

        this.router.navigate(['/widgets'], { queryParams: {} });
    }

    public deleteWidget(widget: Widget) {
        const data: InfoDialogData = {
            header: `Delete ${widget.name}`,
            bodyText: `Are you sure you want to delete ${widget.name} ?`,
            buttons: {
                confirmText: 'Delete',
                denyText: 'Cancel',
            },
        };
        const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '750px',
            data,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result?.submit) {
                this.loading = true;
                this.graphqlService.deleteWidget(widget.id).subscribe({
                    next: () => {
                        this.snackBarService.openSnackBar('Deleted widget', 'Deleted');
                        this.getWidgets();
                    },
                    error: () => {
                        this.snackBarService.openSnackBar('Failed to delete widget', 'Failed');
                        this.loading = false;
                    },
                });
            }
        });
    }

    public getWidgets(typeFilterId?: string, manufacturerFilterId?: string) {
        this.graphqlService.getWidgets(typeFilterId, manufacturerFilterId).subscribe({
            next: (widgets) => {
                this.widgets = widgets;
                this.snackBarService.openSnackBar('Widgets loaded', 'Loaded');
                this.loading = false;
            },
            error: () => {
                this.snackBarService.openSnackBar('Failed to load widgets', 'Failed');
            },
        });
    }
}
