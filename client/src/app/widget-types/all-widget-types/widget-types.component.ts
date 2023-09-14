import { Component, OnInit } from '@angular/core';
import { WidgetType } from '../../shared/types/interfaces';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent, InfoDialogData } from '../../shared/components/info-dialog/info-dialog.component';

@Component({
    selector: 'app-widget-types',
    templateUrl: './widget-types.component.html',
    styleUrls: ['./widget-types.component.scss'],
})
export class WidgetTypesComponent implements OnInit {
    public widgetTypes: WidgetType[];
    public columns = ['id', 'name', 'totalWidgets', 'edit', 'delete'];
    public loading = true;

    constructor(
        private graphqlService: GraphqlService,
        private snackBarService: SnackbarService,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    public ngOnInit() {
        this.getWidgetTypes();
    }

    public getWidgetTypes() {
        this.graphqlService.getWidgetTypes().subscribe({
            next: (widgetTypes) => {
                this.widgetTypes = widgetTypes;
                this.snackBarService.openSnackBar('Widget types loaded', 'Loaded');
                this.loading = false;
            },
            error: () => {
                this.snackBarService.openSnackBar('Failed to load widget types', 'Failed');
                this.loading = false;
            },
        });
    }

    public navigateToEdit(widgetTypeId: string) {
        this.router.navigate(['widget-types/edit', widgetTypeId]);
    }

    public navigateToAdd() {
        this.router.navigate(['widget-types/new']);
    }

    public deleteWidget(widgetType: WidgetType) {
        const canDelete = widgetType.widgetsAggregate?.count === 0;
        const canDeleteData: InfoDialogData = {
            header: `Delete ${widgetType.name}`,
            bodyText: `Are you sure you want to delete ${widgetType.name}?`,
            buttons: {
                confirmText: 'Delete',
                denyText: 'Cancel',
            },
        };

        const cannotDeleteData: InfoDialogData = {
            header: `Cannot delete ${widgetType.name}`,
            bodyText: `You cannot delete ${widgetType.name}, as it has widgets attached.`,
            buttons: {
                denyText: 'Close',
            },
        };

        const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '750px',
            data: canDelete ? canDeleteData : cannotDeleteData,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result?.submit) {
                this.loading = true;
                this.graphqlService.deleteWidgetType(widgetType.id).subscribe({
                    next: () => {
                        this.snackBarService.openSnackBar('Deleted widget type', 'Deleted');
                        this.getWidgetTypes();
                    },
                    error: () => {
                        this.snackBarService.openSnackBar('Failed to delete widget type', 'Failed');
                        this.loading = false;
                    },
                });
            }
        });
    }
}
