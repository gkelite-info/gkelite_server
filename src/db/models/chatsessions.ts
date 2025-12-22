import { DataTypes, Optional, Model } from "sequelize";
import sequelizeConnection from "../config";

interface ChatSessionAttributes {
    sessionId: number;
    userId: number | null;
    status: string;
    startedAt: Date;
    completedAt: Date | null;
    isdeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ChatSessionInput extends Optional<ChatSessionAttributes, "sessionId"> {}
export interface ChatSessionOutput extends Required<ChatSessionAttributes> {}

class ChatSession extends Model<ChatSessionAttributes, ChatSessionInput> implements ChatSessionAttributes {
    public sessionId!: number;
    public userId!: number | null;
    public status!: string;
    public startedAt!: Date;
    public completedAt!: Date | null;

    public isdeleted!: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

ChatSession.init(
    {
        sessionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "active",
        },

        startedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
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
        tableName: "chatsessions",
    }
);

export default ChatSession;
