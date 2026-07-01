import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import Applications from "./applications";

interface EducationAttributes {
    educationId: number;
    applicationId: number;
    level: string;         // 'IX', 'X', or 'Degree'
    schoolOrCollege: string;
    boardOrUniversity: string;
    passingYear: Date;
    gradeOrPercentage: string;
    medium: string;
    certificateUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EducationInput extends Optional<EducationAttributes, "educationId"> { }
export interface EducationOutput extends EducationAttributes { }

class EducationQualifications extends Model<EducationAttributes, EducationInput> implements EducationAttributes {
    public educationId!: number;
    public applicationId!: number;
    public level!: string;
    public schoolOrCollege!: string;
    public boardOrUniversity!: string;
    public passingYear!: Date;
    public gradeOrPercentage!: string;
    public medium!: string;
    public certificateUrl!: string;
}

EducationQualifications.init({
    educationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lead_applications',
            key: 'applicationId'
        },
        onDelete: 'CASCADE'
    },

    level: {
        type: DataTypes.STRING(50), // "IX", "X", "Degree"
        allowNull: false
    },

    schoolOrCollege: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    boardOrUniversity: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    passingYear: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    gradeOrPercentage: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    medium: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    certificateUrl: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "education_qualifications"
});

EducationQualifications.belongsTo(Applications, { foreignKey: "applicationId", as: "application", onUpdate: "CASCADE" });
Applications.hasMany(EducationQualifications, { foreignKey: "applicationId", as: "educationQualifications" });

export default EducationQualifications;