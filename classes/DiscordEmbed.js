const { EmbedBuilder } = require('discord.js');

class DiscordEmbed {
	constructor(
		title,
		description,
		color = 'Green',
		footer_text = `${process.env.SITE_BRAND}`
	) {
		this.title = title;
		this.description = description;
		this.color = color;
		this.footer_text = footer_text;
	}

	getEmbed() {
		return new EmbedBuilder()
			.setColor(this.color)
			.setTitle(this.title)
			.setAuthor({
				name: process.env.SITE_BRAND,
				url: process.env.SITE_URL,
				iconURL: process.env.SITE_ICON,
			})
			.setDescription(this.description)
			.setThumbnail(process.env.SITE_ICON)
			.setTimestamp()
			.setFooter({
				text: this.footer_text,
				iconURL: process.env.SITE_ICON,
			});
	}
}

module.exports = DiscordEmbed;
