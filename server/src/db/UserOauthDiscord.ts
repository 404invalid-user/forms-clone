const { DataTypes } = require('sequelize');

export default function UserOauthDiscord(sequelize: any) {
	const UserOauthDiscord = sequelize.define('UserOauthDiscord', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		userId: {
			type: DataTypes.String,
			allowNull: false
		},
		discordId: {
			type: DataTypes.String,
			allowNull: false
		},
		username: {
			type: DataTypes.String,
			allowNull: false
		},
		avatar: {
			type: DataTypes.String,
			allowNull: false,
			defaultValue: 'qq'
		},
	});
	UserOauthDiscord.sync();
	return UserOauthDiscord;
};

