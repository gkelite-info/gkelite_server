import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import Applications from "./applications";

interface PaymentAttributes {
    paymentId: number;
    applicationId: number;
    amount: number;
    paymentStatus: string;
    transactionId?: string | null;
    paymentDate?: Date | null;
    paymentMethod?: string | null;
    receiptUrl?: string | null;
    is_deleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PaymentInput extends Optional<PaymentAttributes, "paymentId" | "is_deleted" | "paymentStatus"> { }
export interface PaymentOutput extends Required<PaymentAttributes> { }

class Payments extends Model<PaymentAttributes, PaymentInput> implements PaymentAttributes {
    public paymentId!: number;
    public applicationId!: number;
    public amount!: number;
    public paymentStatus!: string;
    public transactionId?: string | null;
    public paymentDate?: Date | null;
    public paymentMethod?: string | null;
    public receiptUrl?: string | null;
    public is_deleted!: boolean;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

Payments.init({
    paymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "lead_applications",
            key: "applicationId"
        },
        onUpdate: "CASCADE"
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pending'
    },
    transactionId: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    receiptUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "lead_payments"
});

Payments.belongsTo(Applications, { foreignKey: "applicationId", as: "application", onUpdate: "CASCADE" });
Applications.hasOne(Payments, { foreignKey: "applicationId", as: "payments" });

export default Payments;
