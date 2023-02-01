import {observable} from 'mobx';

class AppState {
    @observable names = [""];
    @observable appartment = 1;
    @observable dotted = false;
    @observable showAppartment = false;
    
    @observable multilineLetterbox = false;

}

export default AppState;
