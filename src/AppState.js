import { observable } from 'mobx';

class AppState {
  @observable names = "";
  @observable appartment = 1;
    @observable dotted = false;

}

export default AppState;
