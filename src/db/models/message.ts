import { DataTypes, Optional, Model } from "sequelize";
import sequelizeConnection from "../config";

interface MessageAttributes {
    messageId: number;
    userId: number | null;
    sessionId: number | null;
    message: string;
    senderType: string;
    isdeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface MessageInput extends Optional<MessageAttributes, "messageId"> { }
export interface MessageOutput extends Required<MessageAttributes> { }

class Message
    extends Model<MessageAttributes, MessageInput>
    implements MessageAttributes {
    public messageId!: number;
    public userId!: number | null;
    public sessionId!: number | null;
    public message!: string;
    public senderType!: string;

    public isdeleted!: boolean;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

Message.init({
    messageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    senderType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "user", // values: "user", "bot"
    },

    isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: sequelizeConnection,
        tableName: "messages",
    }
);

export default Message;
