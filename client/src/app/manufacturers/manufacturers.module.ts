import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturersComponent } from './all-manufacturers/manufacturers.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditManufacturerComponent } from './edit-manufacturer/edit-manufacturer.component';
import { ReactiveFormsModule } from '@angular/forms';

export const ROUTES: Routes = [
    {
        path: '',
        component: ManufacturersComponent,
    },
    {
        path: 'edit/:id',
        component: EditManufacturerComponent,
    },
    {
        path: 'new',
        component: EditManufacturerComponent,
    },
];

@NgModule({
    declarations: [ManufacturersComponent, EditManufacturerComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
})
export class ManufacturersModule {}
