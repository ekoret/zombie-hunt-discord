const DiscordEmbed = require('./DiscordEmbed');

class DiscordUtility {
	static getUserChosenName(interaction) {
		return interaction.member.nickname ?? interaction.user.globalName;
	}

	static getUserNotRegisteredEmbed() {
		return new DiscordEmbed(
			'Zombie Meat Hunt',
			`:zombie: Welcome to the ${process.env.SITE_BRAND_INITIALS} Plantation, where the undead roam, and your luck and aim is put to the test! :zombie:

			Your mission is simple and clear: Shoot zombies :gun:, collect their meat :meat_on_bone:, and protect the ${process.env.SITE_BRAND_INITIALS} Plantation from zombies!  **But before you jump into the action, I\'ll need to ensure that you\'re registered on ${process.env.SITE_BRAND} before you join the ranks of our fearless zombie hunters.**:face_with_monocle:

			:shopping_cart: Trade in your zombie meat for items in the shop and for **points directly added to your ${process.env.SITE_BRAND} account!**
			
			:white_check_mark: Registration is quick and easy! Just follow these simple steps:

			:one: Type !joinhunt [your email]
			Example: !joinhunt example@gmail.com
			This must be the same email you used at ${process.env.SITE_BRAND} when signing up.

			:two: Wait while I check some things over and get your gear ready.

			:three: Get ready to blast those zombies and amass your gruesome loot!
			
			Once registered, you'll be armed and ready to dive into the world of zombie slaying :dagger:. Exchange your hard-earned zombie meat for gear or exchange them for points on ${process.env.SITE_BRAND}.

			**LET THE HUNT BEGIN!**
			`
		).getEmbed();
	}
}

module.exports = DiscordUtility;
