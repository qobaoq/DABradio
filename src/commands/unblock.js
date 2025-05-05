
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unblock')
    .setDescription('Unblock a user from playing songs')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to unblock')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const targetMember = await interaction.guild.members.fetch(targetUser.id);
    const botMember = interaction.guild.members.me;
    
    if (targetMember.roles.highest.position >= botMember.roles.highest.position) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor('#FF0000')
          .setDescription('❌ I cannot unblock a user with a role higher than or equal to mine.')],
        ephemeral: true
      });
    }
    
    interaction.client.playerManager.blocklistManager.unblockUser(targetUser.id);

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('User Unblocked')
      .setDescription(`✅ ${targetUser.tag} has been unblocked and can now play songs.`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
