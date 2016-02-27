import corbel from "corbel-js";

import BackofficeCorbel from "../model/BackofficeCorbel";
import CorbelStore from "../stores/CorbelStore";
import CorbelActions from "../actions/CorbelActions";

class CorbelService {
  constructor() {

  }

  login() {
    var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig();
    var driver = corbel.getDriver({
      urlBase: corbelConfig.getUrlBase(),
      clientId: corbelConfig.getClientId(),
      clientSecret: corbelConfig.getClientSecret(),
      scopes : ''
    });
    CorbelActions.storeCorbelDriver(driver);
    driver.iam.token().create().then(function(result){
      CorbelActions.newLogin({token: result.data.accessToken});
    });
  }


}

export default new CorbelService();
