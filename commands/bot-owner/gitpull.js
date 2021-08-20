const shell = require('shelljs');

module.exports = {
	name: 'pull',
	aliases: ['pull'],
	description: 'Pulls the latest code from the Aeo GitHub repository',
	usage: '',
	example: '',
	category: 'Owner Only',
	async execute({ config: { owners: owner }, message, client }) {
		const owners = Object.values(owner);
		if (!owners.includes(message.author.id)) {
			return;
		}

		const { stderr, stdout, code } = shell.exec('git pull git@github.com:Konrad570/TH2-Community.git');

		await message.channel.send([
			`${stdout}`,
			`${stderr}`,
			`Process exited with code ${code}`
		], { code: true, split: true });

		const masterLogger = client.channels.cache.get('827266473554346085');
		if (masterLogger) {
			return masterLogger.send({
				embed: {
					title: 'Git Pulled',
					description: [
						'**Actioned by:**',
						`\`${message.author.tag}\``
					].join('\n'),
					color: global.config.color
				}
			});
		}
	}
};
