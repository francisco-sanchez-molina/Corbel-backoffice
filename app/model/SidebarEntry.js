export default class SidebarEntry {
	constructor(name: string, link: string, glyph: string) {
		this.name = name;
		this.link = link;
		this.glyph = glyph;
	}

	getName(): ? string {
		return this.name;
	}

	getLink(): ? string {
		return this.link;
	}

	getGlyph(): ? string {
		return this.glyph;
	}

}
