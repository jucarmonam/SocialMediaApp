import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  newPost = {
    title: '',
    message: '',
  };
  lastPost: any;

  sharePost() {
    this.lastPost = { ...this.newPost };
    this.newPost.title = '';
    this.newPost.message = '';
  }
}
