import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";

type Gender = "male" | "female" | "other";

interface ApplicationAttributes {
    applicationId: number;
    applicationFor: string;
    course: string;
    firstName: string;
    lastName: string;
    fathersName: string;
    mothersName: string;
    gender: Gender;
    dateOfBirth: Date;
    contactNo: string;
    emailId: string;
    nationality: string;
    aadhaarNumber?: string | null;
    category: string;
    postalAddress: string;
    state: string;
    city: string;
    pinCode: string;
    profileImage: string;
    admissionRegistrationFee: number;
    applicationNumber?: string | null;
    college?: string | null;

    is_deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ApplicationInput extends Optional<ApplicationAttributes, "applicationId" | "is_deleted"> { }
export interface ApplicationOutput extends Required<ApplicationAttributes> { }

class Applications extends Model<ApplicationAttributes, ApplicationInput> implements ApplicationAttributes {
    public applicationId!: number;
    public applicationFor!: string;
    public course!: string;
    public firstName!: string;
    public lastName!: string;
    public fathersName!: string;
    public mothersName!: string;
    public gender!: Gender;
    public dateOfBirth!: Date;
    public contactNo!: string;
    public emailId!: string;
    public nationality!: string;
    public aadhaarNumber?: string | null;
    public category!: string;
    public postalAddress!: string;
    public state!: string;
    public city!: string;
    public pinCode!: string;
    public profileImage!: string;
    public admissionRegistrationFee!: number;
    public applicationNumber?: string | null;
    public college?: string | null;

    public is_deleted!: boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

Applications.init({
    applicationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },

    applicationFor: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    course: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    fathersName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    mothersName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false
    },

    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    contactNo: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    emailId: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    nationality: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    aadhaarNumber: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    postalAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    state: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    pinCode: {
        type: DataTypes.STRING(15),
        allowNull: false
    },

    profileImage: {
        type: DataTypes.STRING,
        allowNull: false
    },

    admissionRegistrationFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 500
    },

    applicationNumber: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: true
    },

    college: {
        type: DataTypes.STRING(50),
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
    tableName: "lead_applications"
});

export default Applications;