import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from 'src/app/utils/app-constants';
import { MENU_ITEMS } from 'src/app/utils/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menu = MENU_ITEMS;
  public mainMenu: any = [];
  public userType: any;
  private decodedToken = JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT))["USER_TYPE"];
 isMenuOpened=false;
 
  constructor(private storageService: StorageService) {}
@Output() thisEvent=new EventEmitter()
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  displayMenu(){
    this.isMenuOpened = !this.isMenuOpened
    
  }
  
  reset(){
    if(this.isMenuOpened){
      this.isMenuOpened = false;
    }
    if(window.innerWidth<800){
    this.thisEvent.emit()
    }

  }

  closeSidebar(){
    if(window.innerWidth<800){
      this.thisEvent.emit()
      }
  }
  
  ngOnInit(): void {   
  
    this.userType = this.decodedToken;
     
    this.menu.forEach(element => {
      let index = element.userAccess.findIndex(i => i === this.userType);
      
      if(index > -1){
        element.hidden = false;
        this.mainMenu.push(element)
      }
    });
    
  }

} 

function parseJSON(arg0: string) {
  throw new Error('Function not implemented.');
}

