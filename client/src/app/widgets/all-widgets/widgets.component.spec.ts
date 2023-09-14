import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetsComponent } from './widgets.component';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { Widget } from '../../shared/types/interfaces';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WidgetsComponent', () => {
    let component: WidgetsComponent;
    let fixture: ComponentFixture<WidgetsComponent>;
    let mockGraphqlService: any;
    let mockSnackBarService: any;
    let mockRouter: any;
    let mockDialog: any;

    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockGraphqlService = jasmine.createSpyObj(['getManufacturers', 'getWidgetTypes', 'getWidgets', 'deleteWidget']);
        mockSnackBarService = jasmine.createSpyObj(['openSnackBar']);
        mockRouter = jasmine.createSpyObj(['navigate']);
        mockDialog = jasmine.createSpyObj(['open']);
        mockActivatedRoute = {
            queryParams: of({}),
        };

        mockGraphqlService.getManufacturers.and.returnValue(of([{}]));
        mockGraphqlService.getWidgetTypes.and.returnValue(of([{}]));
        mockGraphqlService.getWidgets.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [WidgetsComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
            providers: [
                { provide: GraphqlService, useValue: mockGraphqlService },
                { provide: SnackbarService, useValue: mockSnackBarService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(WidgetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('clearFilters', () => {
        it('should clear filters and navigate to /widgets without query params', () => {
            mockGraphqlService.getWidgets.and.returnValue(of([]));
            component.clearFilters();
            expect(mockGraphqlService.getWidgets).toHaveBeenCalled();
            expect(component.selectedManufacturerFilter).toBeUndefined();
            expect(component.selectedWidgetTypeFilter).toBeUndefined();
            expect(mockRouter.navigate).toHaveBeenCalledWith(['/widgets'], { queryParams: {} });
        });
    });

    describe('deleteWidget', () => {
        it('should delete the widget and show success snackbar if user confirms', () => {
            const mockWidget: Widget = {
                id: '1',
                name: 'TestWidget',
                stockLevel: 999,
                type: {
                    id: '2',
                    name: 'abc',
                },
                manufacturer: {
                    id: '2',
                    name: 'abc',
                },
            };

            const dialogRef = {
                afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of({ submit: true })),
            };

            mockDialog.open.and.returnValue(dialogRef);
            mockGraphqlService.deleteWidget.and.returnValue(of({}));

            component.deleteWidget(mockWidget);

            expect(mockDialog.open).toHaveBeenCalled();
            expect(mockGraphqlService.deleteWidget).toHaveBeenCalledWith(mockWidget.id);
            expect(mockSnackBarService.openSnackBar).toHaveBeenCalledWith('Deleted widget', 'Deleted');
        });

        it('should not delete the widget if user cancels', () => {
            const mockWidget: Widget = {
                id: '1',
                name: 'TestWidget',
                stockLevel: 999,
                type: {
                    id: '2',
                    name: 'abc',
                },
                manufacturer: {
                    id: '2',
                    name: 'abc',
                },
            };

            const dialogRef = {
                afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of({ submit: false })),
            };

            mockDialog.open.and.returnValue(dialogRef);

            component.deleteWidget(mockWidget);

            expect(mockDialog.open).toHaveBeenCalled();
            expect(mockGraphqlService.deleteWidget).not.toHaveBeenCalled();
        });

        it('should show error snackbar if deletion fails', () => {
            const mockWidget: Widget = {
                id: '1',
                name: 'TestWidget',
                stockLevel: 999,
                type: {
                    id: '2',
                    name: 'abc',
                },
                manufacturer: {
                    id: '2',
                    name: 'abc',
                },
            };

            const dialogRef = {
                afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of({ submit: true })),
            };

            mockDialog.open.and.returnValue(dialogRef);
            mockGraphqlService.deleteWidget.and.returnValue(throwError(() => new Error('test'))); // Use throwError to simulate an error

            component.deleteWidget(mockWidget);

            expect(mockDialog.open).toHaveBeenCalled();
            expect(mockGraphqlService.deleteWidget).toHaveBeenCalledWith(mockWidget.id);
            expect(mockSnackBarService.openSnackBar).toHaveBeenCalledWith('Failed to delete widget', 'Failed');
        });
    });
});
