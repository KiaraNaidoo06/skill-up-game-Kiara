import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

interface Resolution{
  resolution: string;
  editable?: boolean;

}

@Component({
  selector: 'app-resolutions',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './resolutions.component.html',
  styleUrl: './resolutions.component.scss'
})
export class ResolutionsComponent {

  itemList: Resolution[] = [];
  
  newItem: string = '';

  ngOnInit(): void {
    const storedResolutions = localStorage.getItem('resolutions');
    if (storedResolutions) {
      this.itemList = JSON.parse(storedResolutions);
    }
  }

  addItem(): void {
    if (this.newItem.trim()) {
      var newResolution : Resolution= {
        resolution : this.newItem,
        editable : false
      }
      this.itemList.push(newResolution);
      this.updateLocalStorage();
      this.newItem = ''; 
    }
  }

  clearItems(): void {
    this.itemList = [];
    this.updateLocalStorage();
  }

  deleteItem(index: number): void {
    this.itemList.splice(index, 1);
    this.updateLocalStorage();
  }

  editResolution(index: number): void{
    this.itemList[index].editable=false;
    this.updateLocalStorage();
  }

  makeEditable(index: number): void{
    this.itemList[index].editable=true;
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('resolutions', JSON.stringify(this.itemList));
  }
}
