import { DataTypes, Optional, Model } from "sequelize";
import sequelizeConnection from "../config";

interface FaqQuestionAttributes {
    faqId: number;
    question: string;
    answer: string;
    category: string;
    keywords: string | null; 
    isdeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface FaqQuestionInput extends Optional<FaqQuestionAttributes, "faqId"> {}
export interface FaqQuestionOutput extends Required<FaqQuestionAttributes> {}

class FaqQuestion extends Model<FaqQuestionAttributes, FaqQuestionInput> implements FaqQuestionAttributes {
    public faqId!: number;
    public question!: string;
    public answer!: string;
    public category!: string;
    public keywords!: string | null;

    public isdeleted!: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

FaqQuestion.init(
    {
        faqId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        category: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        keywords: {
            type: DataTypes.TEXT,
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
        tableName: "faqquestions",
    }
);

export default FaqQuestion;
