import { Component, OnInit } from '@angular/core';
import { Article, Article1, Attribute, IArticleAdd, IAttributeName1, ISaveTypeResponse, ISaveUnitResponse } from '../../models/auth.model';
import { AttributeService } from '../../services/attribute.service';
import { ArticleService } from '../../services/article.service';
import { UnitService } from '../../services/unit.service';
import { TypeService } from '../../services/type.service';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  selectedAttributeName: string = '';
  newAttributeValue: string = '';
  filteredArticles: Article1[] = [];
  allArticles: Article1[] = [];
  searchName: string = '';
  searchCode: string = '';
  searchType: string = '';
  searchUnit: string = '';
  searchAttributes: string = '';

  constructor(private attributeService: AttributeService, 
              private articleService: ArticleService, 
              private unitService: UnitService,
              private typeService: TypeService) {}

  ngOnInit() {
    this.attributeService.getAllAttributes().subscribe(
      attributes => {
        this.attributeNames = attributes.map(attr => {
          return { id: attr.id, name: attr.name, unit: attr.unit };
        });
        console.log(this.attributeNames);
      },
      error => {
        console.error('Error loading attributes:', error);
      }
    );

    this.loadArticles();
    this.filterArticles();
  }

  loadArticles() {
    this.articleService.get().subscribe(
      (articles: Article1[]) => {
        this.articles = articles;
        this.allArticles = articles;
        this.articles.forEach(article => {
          const typeName = article.type.name; 
          const unitName = article.unit.name; 
          console.log(typeName, unitName);
        });
      },
      (error) => {
        console.error('Error loading articles:', error);
      }
    );
  }

  filterArticles() {
    this.filteredArticles = this.allArticles.filter(article => {
      return (
        article.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
        article.code.toLowerCase().includes(this.searchCode.toLowerCase()) &&
        article.type.name.toLowerCase().includes(this.searchType.toLowerCase()) &&
        article.unit.name.toLowerCase().includes(this.searchUnit.toLowerCase()) &&
        this.filterAttributes(article.attributes)
        );
    });
    this.articles = this.filteredArticles;
  }

  filterAttributes(attributes: Attribute[]): boolean {
    if (!this.searchAttributes) {
      return true;
    }
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i] && attributes[i].name && attributes[i].value) {
        if (attributes[i].name.toLowerCase().includes(this.searchAttributes.toLowerCase()) ||
            attributes[i].value.toString().toLowerCase().includes(this.searchAttributes.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }
  

  resetAllFilters(){
    this.searchName='';
    this.searchCode='';
    this.searchType='';
    this.searchUnit='';
    this.searchAttributes='';
    this.articles=this.allArticles;
  }
  
  articles: Article1[] = [];
  newArticle: Article = {
    code: '',
    name: '',
    type: '',
    unit: '',
    attributes: []
  };

  attributeNames: IAttributeName1[] = [];
  showAttributes: boolean = false;

  setUnitId(): Observable<number> {
    return this.unitService.exist(this.newArticle.unit).pipe(
      switchMap((unitExists: boolean) => {
        if (unitExists) {
          return this.unitService.findIdByName(this.newArticle.unit);
        } else {
          return this.unitService.save(this.newArticle.unit).pipe(
            map((response: ISaveUnitResponse) => response.id),
            catchError(error => {
              console.error('Error adding new unit:', error);
              return of(0);
            })
          );
        }
      }),
      catchError(error => {
        console.error('Error checking unit existence:', error);
        return of(0);
      })
    );
  }

  setTypeId(): Observable<number> {
    return this.typeService.exist(this.newArticle.type).pipe(
      switchMap((typeExists: boolean) => {
        if (typeExists) {
          return this.typeService.findIdByName(this.newArticle.type);
        } else {
          return this.typeService.save(this.newArticle.type).pipe(
            map((response: ISaveTypeResponse) => response.id),
            catchError(error => {
              console.error('Error adding new type:', error);
              return of(0);
            })
          );
        }
      }),
      catchError(error => {
        console.error('Error checking type existence:', error);
        return of(0);
      })
    );
  }

  addArticle() {
    forkJoin({
      unitId: this.setUnitId(),
      typeId: this.setTypeId()
    }).subscribe(
      ({ unitId, typeId }) => {
        const articleToAdd: IArticleAdd = {
          name: this.newArticle.name,
          code: this.newArticle.code,
          unitId: unitId,
          typeId: typeId,
          attributes: this.newArticle.attributes.map(attribute => {
            return {
              attributeNameId: this.attributeNames.find(attr => attr.name === attribute.name)?.id || 0,
              value: attribute.value,
              productId: 0
            };
          })
        };
      
        this.articleService.save(articleToAdd).subscribe(
          response => {
            console.log('Article added successfully:', response);
        //    this.articles.push(this.newArticle);
            this.loadArticles();
            this.clearForm();
          },
          error => {
            console.error('Error adding article:', error);
          }
        );
      },
      error => {
        console.error('Error getting unit and type IDs:', error);
      }
    );
  }

  addAttribute() {
    if (this.selectedAttributeName && this.newAttributeValue) {
      this.newArticle.attributes.push({
        name: this.selectedAttributeName,
        value: this.newAttributeValue
      });
      this.selectedAttributeName = '';
      this.newAttributeValue = '';
      this.showAttributes = true;
    }
  }

  removeAttribute(index: number) {
    this.newArticle.attributes.splice(index, 1);
  }

  clearForm() {
    this.newArticle = {
      code: '',
      name: '',
      type: '',
      unit: '',
      attributes: []
    };
  }
}
