import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { AttributesComponent } from '../../../components/attributes/attributes.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticlesComponent } from '../../../components/articles/articles.component';
import { AttributeService } from '../../../services/attribute.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, AttributesComponent, ArticlesComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private attributeService: AttributeService) {
  }

  attributes: any[] = [];

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AttributesComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
 
  ngOnInit(): void {
    this.attributeService.getAllAttributes().subscribe(attributes => {
      this.attributes = attributes.map(attr => {
        return { name: attr.name, unitName: attr.unit ? attr.unit.name : null };
      });
    });
  }
  
}