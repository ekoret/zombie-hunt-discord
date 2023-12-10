class DiscordUtility {
	static getUserChosenName(interaction) {
		return interaction.member.nickname ?? interaction.user.globalName;
	}
}

module.exports = {
	DiscordUtility,
};
