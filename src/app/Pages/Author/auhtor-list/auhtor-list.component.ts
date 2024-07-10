import { Component, OnInit } from '@angular/core';
import { IAuhtor } from 'src/app/core/interfaces/authorInterface';
import { AuthorService } from 'src/app/core/services/author.service';

@Component({
  selector: 'app-auhtor-list',
  templateUrl: './auhtor-list.component.html',
  styleUrls: ['./auhtor-list.component.scss']
})
export class AuhtorListComponent implements OnInit {
  auhtors: IAuhtor[] = [];

  constructor(private autherService: AuthorService) { }
  ngOnInit(): void {
    this.loadAuthors()
  }

  loadAuthors() {
    this.autherService.showAllAuhtors().subscribe(
      (response) => {
        this.auhtors = response
        console.log(response);
        console.log(this.auhtors);
      },
      (error) => {
        console.log(error);

      }
    )
  }

  onEditAuthor(author: any) {
    console.log(author);

  }
  onDeleteAuthor(author: any) {

    if (!author._id) {
      throw new Error('author not Found!')
    }
    this.autherService.deleteAuthpr(author._id).subscribe(
      (response) => {
        this.auhtors = this.auhtors.filter((a) => a._id !== author._id);
        console.log("Author Deleted.", response);
      },
      (error) => {
        console.log(error);

      }
    )

  }


}
