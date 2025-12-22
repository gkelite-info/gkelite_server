import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";


interface reviewAttributes {
    reviewId: number;
    fullname: string;
    organizationName?: string;
    designation: string;
    starRating: number;
    note: string;
    is_deleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface reviewInput extends Optional<reviewAttributes, "reviewId" | "is_deleted"> { }
export interface reviewOutput extends Required<reviewAttributes> { }

class Reviews extends Model<reviewAttributes, reviewInput> implements reviewAttributes {
    public reviewId!: number;
    public fullname!: string;
    public organizationName?: string;
    public designation!: string;
    public starRating!: number;
    public note!: string;
    public is_deleted!: boolean;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}


Reviews.init({
    reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    organizationName: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    designation: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    starRating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "reviews"
});

export default Reviews;