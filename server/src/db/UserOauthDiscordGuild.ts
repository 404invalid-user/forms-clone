const { DataTypes } = require('sequelize');

export default function UserOauthDiscordGuild(sequelize: any) {
  const OauthDiscordGuild = sequelize.define('OauthDiscordGuild', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    guildId: {
      type: DataTypes.String,
      allowNull: false
    },
    name: {
      type: DataTypes.String,
      allowNull: false
    },
    icon: {
      type: DataTypes.String,
      allowNull: false,
      defaultValue: 'qq'
    },
  });

  OauthDiscordGuild.sync();
  return OauthDiscordGuild;
};


