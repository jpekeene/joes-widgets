import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../../shared/types/interfaces';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent, InfoDialogData } from '../../shared/components/info-dialog/info-dialog.component';

@Component({
    selector: 'app-manufacturers',
    templateUrl: './manufacturers.component.html',
    styleUrls: ['./manufacturers.component.scss'],
})
export class ManufacturersComponent implements OnInit {
    public manufacturers: Manufacturer[];
    public columns = ['id', 'name', 'totalWidgets', 'edit', 'delete'];
    public loading = true;

    constructor(
        private graphqlService: GraphqlService,
        private snackBarService: SnackbarService,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    public ngOnInit() {
        this.getManufacturers();
    }

    public getManufacturers() {
        this.graphqlService.getManufacturers().subscribe({
            next: (manufacturers) => {
                this.manufacturers = manufacturers;
                this.snackBarService.openSnackBar('Manufacturers loaded', 'Loaded');
                this.loading = false;
            },
            error: () => {
                this.snackBarService.openSnackBar('Failed to load manufacturers', 'Failed');
                this.loading = false;
            },
        });
    }

    public navigateToEdit(manufacturerId: string) {
        this.router.navigate(['manufacturers/edit', manufacturerId]);
    }

    public navigateToAdd() {
        this.router.navigate(['manufacturers/new']);
    }

    public deleteWidget(manufacturer: Manufacturer) {
        const canDelete = manufacturer.widgetsAggregate?.count === 0;
        const canDeleteData: InfoDialogData = {
            header: `Delete ${manufacturer.name}`,
            bodyText: `Are you sure you want to delete ${manufacturer.name}?`,
            buttons: {
                confirmText: 'Delete',
                denyText: 'Cancel',
            },
        };

        const cannotDeleteData: InfoDialogData = {
            header: `Cannot delete ${manufacturer.name}`,
            bodyText: `You cannot delete ${manufacturer.name}, as it has widgets attached.`,
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
                this.graphqlService.deleteManufacturer(manufacturer.id).subscribe({
                    next: () => {
                        this.snackBarService.openSnackBar('Deleted manufacturer', 'Deleted');
                        this.getManufacturers();
                    },
                    error: () => {
                        this.snackBarService.openSnackBar('Failed to delete manufacturer', 'Failed');
                        this.loading = false;
                    },
                });
            }
        });
    }
}
