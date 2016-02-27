import CorbelConfig from "./CorbelConfig";
import CorbelSession from "./CorbelSession";

export default class BackofficeCorbel {

	constructor() {
		this.state = {};
    this.state.corbelConfig = new CorbelConfig();
    this.state.corbelSession = new CorbelSession();

	}

  serialize(): ? string {
    var serialized = {};
    var that = this;
    Object.keys(this.state).forEach(function (key) {
        serialized[key] = that.state[key].serialize();
    });
    return JSON.stringify(serialized);
  }

  deserialize(state : string): ? BackofficeCorbel {
    var deserialized = JSON.parse(state||{});
    var that = this;
    Object.keys(this.state).forEach(function (key) {
      that.state[key].deserialize(deserialized[key]||'{}');
    });
    return this;
  }

	getCorbelConfig(): ? CorbelConfig {
		return this.state.corbelConfig;
	}

  getCorbelSession(): ? CorbelSession {
		return this.state.corbelSession;
	}

	setDriver(driver) {
		this.corbelDriver = driver;
		return this;
	}

	getDriver() {
		return this.corbelDriver;
	}

}
