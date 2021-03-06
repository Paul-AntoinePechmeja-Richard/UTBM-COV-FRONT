import { Component, OnInit } from '@angular/core';
import {ArticlesProviderService} from '../_services/articles-provider.service';
import { Router } from "@angular/router";
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  articles: any[];
  cols: any[];
  loadingArticle: any;
  loadingLDA: any;

  constructor(
    @Inject(DOCUMENT) document,
    private articlesService: ArticlesProviderService,
    private router: Router,
    private toastCtrl: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
     this.articlesService.getArticles().subscribe(data => this.articles = data);
     this.cols = [
       {field: "pmid",header: "pmid", width: "5%"},
       {field: "title",header: "title", width:"85%" },
       {field: "type",header: "type", width:"5%" },
      ]
  }

  getArticleDet(pmid: any) {
   this.router.navigate([`article-det/${pmid}`]);
 }

 fetchArticle(){
   this.presentLoadingArticle()
   this.articlesService.generateArticle().subscribe(data => {
     this.articles = data;
     this.loadingArticle.dismiss();
     const toast = this.toastCtrl.create({
               message: 'Articles fetched',
               duration: 2000,
               color: 'success',
               position: 'top'
           });
           toast.then(toast => toast.present());
   });
 }

 generateLDA(){
   this.presentLoadingLDA()
   this.articlesService.generateLDA().subscribe(data => {
     console.log(data);
   this.loadingLDA.dismiss();
     const toast = this.toastCtrl.create({
               message: data.message,
               duration: 2000,
               color: 'success',
               position: 'top'
           });
           toast.then(toast => toast.present());
   });
 }

 async presentLoadingArticle() {
  this.loadingArticle = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Retrieving the data',
  });
  await this.loadingArticle.present();

  const { role, data } = await this.loadingArticle.onDidDismiss();
 }

 async presentLoadingLDA() {
  this.loadingLDA = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Generating the LDA model',
  });
  await this.loadingLDA.present();

  const { role, data } = await this.loadingLDA.onDidDismiss();
 }
}
