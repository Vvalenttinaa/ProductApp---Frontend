import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AttributeService } from '../../services/attribute.service';
import { UnitService } from '../../services/unit.service';
import { IAttributeName, ISaveUnitResponse, IUnit } from '../../models/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './attributes.component.html',
  styleUrl: './attributes.component.css'
})
export class AttributesComponent {
  name!: string;
  unit!: string;
  
  
  constructor(
    public dialogRef: MatDialogRef<AttributesComponent>,
     private attributeService: AttributeService,
      private unitService:UnitService) 
      {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
  onCancel(): void{
    this.onCloseClick();
  }

  onSave(): void {
    console.log("Saving: " + this.name + " " + this.unit); 
    this.unitService.exist(this.unit).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.findUnitIdByName(this.unit).subscribe({
            next: (unitId: number) => {
              const data: IAttributeName = {
                name: this.name,
                unitId: unitId
              };
              this.saveAttribute(data);
            },
            error: (error) => {
              console.error('Error finding unit id by name:', error);
            }
          });
        } else {
          this.addNewUnitAndSaveAttribute();
        }
      },
      error: (error) => {
        console.error('Error during unit existence check:', error, typeof error);
        this.addNewUnitAndSaveAttribute();

      }
    });
  }
  
  saveAttribute(data: IAttributeName): void {
    this.attributeService.onSave(data).subscribe({
      next: (response) => {
        console.log('Response:', response);
      },
      error: (error) => {
        console.error('Error during save:', error);
      }
    });
  }
  
  addNewUnitAndSaveAttribute(): void {
    const newUnitData: IUnit = {
      name: this.unit
    };
  
    if (typeof this.unit === 'string') {
      this.unitService.save(this.unit).subscribe({
        next: (response: ISaveUnitResponse) => {
          if (response.id !== null) {
            const data: IAttributeName = {
              name: this.name,
              unitId: response.id
            };
            this.saveAttribute(data);
          } else {
            console.error('Failed to add unit');
          }
        },
        error: (error) => {
          console.error('Error during unit addition:', error);
        }
      });
    } else {
      console.error('Unit name must be a string');
    }
  }
  
  
  findUnitIdByName(unitName: string): Observable<number> {
    return this.unitService.findIdByName(unitName);
  }
}
