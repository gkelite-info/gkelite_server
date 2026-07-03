import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";

interface DraftApplicationAttributes {
    draftId: string; // UUID
    emailId: string;
    contactNo: string;
    formType: string;
    formData: any; // JSONB
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DraftApplicationInput extends Optional<DraftApplicationAttributes, "draftId"> { }
export interface DraftApplicationOutput extends Required<DraftApplicationAttributes> { }

class DraftApplications extends Model<DraftApplicationAttributes, DraftApplicationInput> implements DraftApplicationAttributes {
    public draftId!: string;
    public emailId!: string;
    public contactNo!: string;
    public formType!: string;
    public formData!: any;
    
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

DraftApplications.init({
    draftId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    emailId: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    contactNo: {
        type: DataTypes.STRING(20),
        allowNull: true // Might not be present immediately
    },
    formType: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    formData: {
        type: DataTypes.JSONB,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "draft_applications"
});

export default DraftApplications;
