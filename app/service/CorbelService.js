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

    var params = {}

    if (corbelConfig.getLogin() && corbelConfig.getLogin().length>0) {
        params.claims = {
            'basic_auth.username': corbelConfig.getLogin(),
            'basic_auth.password': corbelConfig.getPassword()
        };
    }
    if (corbelConfig.getDevice() && corbelConfig.getDevice().length>0) {
      params.claims['device_id'] = deviceId;
    }

    CorbelActions.storeCorbelDriver(driver);
    driver.iam.token().create(params).then(function(result){
      CorbelActions.newLogin({token: result.data.accessToken, refreshToken: result.data.refreshToken});
    });
  }


}

export default new CorbelService();
