import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import Applications from "./applications";

interface EntranceExamAttributes {
    examId: number;
    applicationId: number;
    examName: string;      // e.g., 'ICET'
    htNumber: string;
    rank: number;
    year: Date;
    certificateUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EntranceExamInput extends Optional<EntranceExamAttributes, "examId"> { }
export interface EntranceExamOutput extends EntranceExamAttributes { }

class EntranceExams extends Model<EntranceExamAttributes, EntranceExamInput> implements EntranceExamAttributes {
    public examId!: number;
    public applicationId!: number;
    public examName!: string;
    public htNumber!: string;
    public rank!: number;
    public year!: Date;
    public certificateUrl!: string;
}

EntranceExams.init({
    examId: {
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

    examName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'ICET'
    },

    htNumber: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    year: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    certificateUrl: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: "entrance_exams"
});

EntranceExams.belongsTo(Applications, { foreignKey: "applicationId", as: "application", onUpdate: "CASCADE" });
Applications.hasMany(EntranceExams, { foreignKey: "applicationId", as: "entranceExams" });

export default EntranceExams;