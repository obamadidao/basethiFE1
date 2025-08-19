import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Service } from '../service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class List {
  
}
