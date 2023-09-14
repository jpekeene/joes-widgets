import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetTypesComponent } from './all-widget-types/widget-types.component';
import { RouterModule, Routes } from '@angular/router';
import { EditWidgetTypeComponent } from './edit-widget-type/edit-widget-type.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

export const ROUTES: Routes = [
    {
        path: '',
        component: WidgetTypesComponent,
    },
    {
        path: 'edit/:id',
        component: EditWidgetTypeComponent,
    },
    {
        path: 'new',
        component: EditWidgetTypeComponent,
    },
];

@NgModule({
    declarations: [WidgetTypesComponent, EditWidgetTypeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
})
export class WidgetTypesModule {}
