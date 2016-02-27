export default class SidebarEntry {
	constructor(name: string, link: string) {
		this.name = name;
		this.link = link;
	}

	getName(): ? string {
		return this.name;
	}

	getLink(): ? string {
		return this.link;
	}
}
