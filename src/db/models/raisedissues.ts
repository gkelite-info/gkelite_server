import { DataTypes, Optional, Model } from "sequelize";
import sequelizeConnection from "../config";

interface RaisedIssueAttributes {
    issueId: number;
    userId: number | null;
    sessionId: number | null;
    description: string;
    status: string;
    isdeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface RaisedIssueInput extends Optional<RaisedIssueAttributes, "issueId"> {}
export interface RaisedIssueOutput extends Required<RaisedIssueAttributes> {}

class RaisedIssue extends Model<RaisedIssueAttributes, RaisedIssueInput> implements RaisedIssueAttributes {
    public issueId!: number;
    public userId!: number | null;
    public sessionId!: number | null;
    public description!: string;
    public status!: string;

    public isdeleted!: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

RaisedIssue.init(
    {
        issueId: {
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

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "pending",
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
        tableName: "raisedissues",
    }
);

export default RaisedIssue;
