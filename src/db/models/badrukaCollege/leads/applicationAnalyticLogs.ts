import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import Applications from "./applications";

interface ApplicationAnalyticsLogAttributes {
    logId: number;
    visitorId: string;
    eventType: string; // 'SITE_VISIT', 'FORM_OPEN', 'FORM_SUBMIT'
    formType?: string; // Optional, e.g., 'Inter_Form', 'Degree_BCCA'
    applicationId?: number; // Nullable, links to lead_applications when eventType is FORM_SUBMIT
    path: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: object;
    isActive?: boolean;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ApplicationAnalyticsLogInput extends Optional<ApplicationAnalyticsLogAttributes, "logId" | "isActive" | "is_deleted" | "formType" | "applicationId" | "ipAddress" | "userAgent" | "metadata"> { }
export interface ApplicationAnalyticsLogOutput extends ApplicationAnalyticsLogAttributes { }

class ApplicationAnalyticsLog extends Model<ApplicationAnalyticsLogAttributes, ApplicationAnalyticsLogInput> implements ApplicationAnalyticsLogAttributes {
    public logId!: number;
    public visitorId!: string;
    public eventType!: string;
    public formType?: string;
    public applicationId?: number;
    public path!: string;
    public ipAddress?: string;
    public userAgent?: string;
    public metadata?: object;
    public isActive?: boolean;
    public is_deleted?: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

ApplicationAnalyticsLog.init({
    logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    visitorId: {
        type: DataTypes.STRING(36), // UUID
        allowNull: false
    },

    eventType: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    formType: {
        type: DataTypes.STRING(50),
        allowNull: true
    },

    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "lead_applications",
            key: "applicationId"
        },
        onUpdate: "CASCADE",
    },

    path: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true
    },

    userAgent: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    metadata: {
        type: DataTypes.JSONB,
        allowNull: true
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "application_analytics_logs",
    indexes: [
        { name: "idx_analytics_visitor_event", fields: ["visitorId", "eventType"] },
        { name: "idx_analytics_event_date", fields: ["eventType", "createdAt"] },
        { name: "idx_analytics_application", fields: ["applicationId"] }
    ]
});

ApplicationAnalyticsLog.belongsTo(Applications, { foreignKey: "applicationId", as: "application", onUpdate: "CASCADE" });
Applications.hasMany(ApplicationAnalyticsLog, { foreignKey: "applicationId", as: "analyticsLogs" });

export default ApplicationAnalyticsLog;