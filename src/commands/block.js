
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('block')
    .setDescription('Block a user from playing songs')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to block')
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
          .setDescription('❌ I cannot block a user with a role higher than or equal to mine.')],
        ephemeral: true
      });
    }
    
    interaction.client.playerManager.blocklistManager.blockUser(targetUser.id);

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('User Blocked')
      .setDescription(`🚫 ${targetUser.tag} has been blocked from playing songs.`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
